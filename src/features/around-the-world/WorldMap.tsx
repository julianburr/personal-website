'use client';

import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Tooltip } from '@/components/tooltip';
import { usePersistedState } from '@/utils/usePersistedState';

import {
  addCategoryLayers,
  destinationCategories,
  emptyFeatureCollection,
  getLayerIds,
} from './WorldMapLayers';

import type { TalkFrontmatter } from '@/features/my-work/TalkListItem';
import type { getPagesFromPath } from '@/utils/getPagesFromPath';

import '@/styles/world-map.css';

type Destination = {
  pathname?: string;
  meta: {
    country: string;
    region?: string;
    city: string;
    title?: string;
    subtitle?: string;
    type: string;
    latlng: string;
    date: string;
  };
};

type Categories = keyof typeof destinationCategories;
type VisibleCategories = Record<Categories, boolean>;

type WorldMapProps = {
  destinations: Destination[];
  talks: Awaited<ReturnType<typeof getPagesFromPath<TalkFrontmatter>>>;
};

export function WorldMap({ destinations, talks }: WorldMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const [lastZoom, setLastZoom] = usePersistedState('worldmap/lastZoom', 0.9);
  const [lastCenter, setLastCenter] = usePersistedState<[number, number]>(
    'worldmap/setLastCenter',
    [26.3824618, 26.8447825],
  );
  const [visibleCategories, setVisibleCategories] =
    usePersistedState<VisibleCategories>('worldmap/visibleCategories', {
      travel: true,
      talk: true,
    });

  const grouped = useMemo(() => {
    const grouped: Record<Categories, { [latlng: string]: Destination[] }> = {
      travel: {},
      talk: {},
    };

    destinations.forEach((dest) => {
      if (dest?.meta?.latlng) {
        const fixedLatLng = dest.meta.latlng?.replace(/\s/g, '');
        if (!grouped.travel[fixedLatLng]) {
          grouped.travel[fixedLatLng] = [];
        }
        grouped.travel[fixedLatLng].push(dest);
      }
    });

    talks?.forEach?.((talk) => {
      Object.values(talk?.meta?.events || {})
        ?.filter((event) => !!event?.place?.latlng)
        ?.forEach((event) => {
          const fixedLatLng = event.place.latlng?.replace(/\s/g, '') || '';
          if (!grouped.talk[fixedLatLng]) {
            grouped.talk[fixedLatLng] = [];
          }
          grouped.talk[fixedLatLng].push({
            pathname: talk?.pathname,
            meta: {
              country: event.place?.country || '',
              region: event.place?.region,
              city: event.place?.city || '',
              latlng: event.place?.latlng || '',
              title: `${event.name} ${dayjs(event.date).format('YYYY')}`,
              subtitle: talk?.meta.title,
              type: 'talk',
              date: event.date.toString(),
            },
          });
        });
    });

    return grouped;
  }, [destinations, talks]);

  const sourceData = useMemo(() => {
    return Object.keys(destinationCategories).reduce(
      (all, key) => {
        if (!visibleCategories[key as keyof typeof destinationCategories]) {
          all[key] = emptyFeatureCollection;
          return all;
        }

        all[key] = {
          type: 'FeatureCollection',
          features: Object.keys(
            grouped[key as keyof typeof destinationCategories],
          ).map((latlng) => {
            return {
              type: 'Feature',
              properties: {
                latlng,
                category: key,
                entries:
                  grouped[key as keyof typeof destinationCategories][latlng],
              },
              geometry: {
                type: 'Point',
                coordinates: latlng
                  .split(',')
                  .map((str) => parseFloat(str))
                  .reverse(),
              },
            };
          }),
        };

        return all;
      },
      {} as Record<string, any>,
    );
  }, [grouped, visibleCategories]);

  useEffect(() => {
    let shouldCancel = false;

    Promise.all([
      // eslint-disable-next-line
      // @ts-ignore
      import('mapbox-gl/dist/mapbox-gl.css'),
      import('mapbox-gl/dist/mapbox-gl.js'),
    ]).then(([, { default: mapboxgl }]) => {
      if (shouldCancel || !mapContainerRef.current) {
        return;
      }

      mapboxgl.accessToken =
        'pk.eyJ1IjoiamJ1cnI5MCIsImEiOiJja3hoNGR6NHIxcmVyMnBva3Vjb3l6NDAzIn0.np-882fi1HIpZWtaQOOMig';
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/jburr90/ckxh4iodd27z116pa15wjpadp',
        zoom: lastZoom,
        center: lastCenter,
      });
      mapRef.current = map;

      map.on('load', () => {
        Object.keys(destinationCategories).forEach((category) => {
          addCategoryLayers(
            map,
            mapboxgl,
            category as keyof typeof destinationCategories,
          );
        });

        map.on('zoomend', () => {
          setLastZoom(map.getZoom());
        });

        map.on('moveend', () => {
          setLastCenter(map.getCenter().toArray());
        });

        setIsMapReady(true);
      });
    });

    return () => {
      shouldCancel = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || !mapRef.current) {
      return;
    }

    Object.keys(destinationCategories).forEach((category) => {
      const source = mapRef.current.getSource(
        getLayerIds(category as Categories).source,
      );
      source?.setData(sourceData[category]);
    });
  }, [isMapReady, sourceData]);

  return (
    <>
      <div ref={mapContainerRef} id="map" className="absolute inset-0" />
      <div className="fixed bottom-[1.6rem] right-[1.6rem] sm:bottom-[4.8rem] sm:right-[4.8rem] z-10 flex flex-row gap-1">
        {Object.keys(destinationCategories).map((key) => {
          const category = destinationCategories[key as Categories];
          const isActive = visibleCategories[key as Categories];
          return (
            <Tooltip key={key} content={category.label}>
              <button
                aria-checked={isActive}
                style={{
                  background: isActive
                    ? category.color
                    : 'var(--color-grey-medium)',
                }}
                className="cursor-pointer w-[2.8rem] h-[2.8rem] flex items-center justify-center transition-all duration-120"
                onClick={() =>
                  setVisibleCategories((state) => ({
                    ...state,
                    [key]: !state[key as Categories],
                  }))
                }
              >
                {category.icon}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
}
