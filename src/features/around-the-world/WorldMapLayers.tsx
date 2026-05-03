import * as Icons from '@phosphor-icons/react';
import { createRoot } from 'react-dom/client';

import { LocationPopout } from './LocationPopout';

export const destinationCategories = {
  travel: {
    icon: <Icons.PersonSimpleHikeIcon />,
    label: 'Travel',
    color: '#e5a0b5',
    clusterColors: ['#e5a0b5', '#d693a8', '#cf8ca1'],
    translate: [-6, 0],
  },
  talk: {
    icon: <Icons.MicrophoneStageIcon />,
    label: 'Public speaking',
    color: '#88c5da',
    clusterColors: ['#88c5da', '#79b7cc', '#6dadc2'],
    translate: [6, 0],
  },
} as const;

export const emptyFeatureCollection = {
  type: 'FeatureCollection' as const,
  features: [],
};

export function getLayerIds(category: keyof typeof destinationCategories) {
  return {
    source: `${category}-places`,
    clusters: `${category}-clusters`,
    clusterCount: `${category}-cluster-count`,
    unclusteredPoint: `${category}-unclustered-point`,
  };
}

export function addCategoryLayers(
  map: any,
  mapboxgl: any,
  category: keyof typeof destinationCategories,
) {
  const styles = destinationCategories[category];
  const layerIds = getLayerIds(category);

  map.addSource(layerIds.source, {
    type: 'geojson',
    data: emptyFeatureCollection,
    cluster: true,
    clusterRadius: 35,
  });

  map.addLayer({
    id: layerIds.clusters,
    type: 'circle',
    source: layerIds.source,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        styles.clusterColors[0],
        5,
        styles.clusterColors[1],
        10,
        styles.clusterColors[2],
      ],
      'circle-radius': ['step', ['get', 'point_count'], 15, 5, 20, 10, 25],
      'circle-stroke-color': '#FAF9F6',
      'circle-stroke-width': 1,
      'circle-translate': styles.translate,
    },
  });

  map.addLayer({
    id: layerIds.clusterCount,
    type: 'symbol',
    source: layerIds.source,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    paint: {
      'text-color': '#222',
      'text-translate': styles.translate,
    },
  });

  map.addLayer({
    id: layerIds.unclusteredPoint,
    type: 'circle',
    source: layerIds.source,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': styles.color,
      'circle-radius': 8,
      'circle-stroke-color': '#FAF9F6',
      'circle-stroke-width': 1.5,
      'circle-translate': styles.translate,
    },
  });

  map
    .on('mouseenter', layerIds.clusters, () => {
      map.getCanvas().style.cursor = 'pointer';
    })
    .on('mouseenter', layerIds.unclusteredPoint, () => {
      map.getCanvas().style.cursor = 'pointer';
    })
    .on('mouseleave', layerIds.clusters, () => {
      map.getCanvas().style.cursor = '';
    })
    .on('mouseleave', layerIds.unclusteredPoint, () => {
      map.getCanvas().style.cursor = '';
    });

  map.on('click', layerIds.clusters, (event: any) => {
    const features = map.queryRenderedFeatures(event.point, {
      layers: [layerIds.clusters],
    });
    const clusterId = features?.[0]?.properties?.cluster_id;

    if (clusterId !== undefined) {
      const source = map.getSource(layerIds.source) as any;
      source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err) return;

        map.easeTo({
          center: (features[0].geometry as any).coordinates,
          zoom,
        });
      });
    }
  });

  map.on('click', layerIds.unclusteredPoint, (event: any) => {
    const node = event.features[0];

    const latlng = node.geometry.coordinates.slice();
    while (Math.abs(event.lngLat.lng - latlng[0]) > 180) {
      latlng[0] += event.lngLat.lng > latlng[0] ? 360 : -360;
    }

    const popupNode = document.createElement('div');
    const root = createRoot(popupNode);
    const entries = JSON.parse(node.properties.entries);
    root.render(<LocationPopout entries={entries} />);

    new mapboxgl.Popup().setLngLat(latlng).setDOMContent(popupNode).addTo(map);
  });
}
