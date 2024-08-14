"use client";

import "./styles.css";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import { LocationPopout } from "./LocationPopout";

type Destination = null | {
  pathname: string;
  meta: {
    country: string;
    place: string;
    type: string;
    latlng: string;
  };
  content: any;
};

let lastZoom = 0.9;
let lastCenter: [number, number] = [26.3824618, 26.8447825];

type WorldMapProps = {
  destinations: Destination[];
};

export function WorldMap({ destinations }: WorldMapProps) {
  const popupRef = useRef<any>();

  useEffect(() => {
    Promise.all([
      // @ts-ignore
      import("mapbox-gl/dist/mapbox-gl.css"),
      import("mapbox-gl/dist/mapbox-gl.js"),
    ]).then(([, { default: mapboxgl }]) => {
      popupRef.current = new mapboxgl.Popup({ offset: 10 });

      mapboxgl.accessToken =
        "pk.eyJ1IjoiamJ1cnI5MCIsImEiOiJja3hoNGR6NHIxcmVyMnBva3Vjb3l6NDAzIn0.np-882fi1HIpZWtaQOOMig";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/jburr90/ckxh4iodd27z116pa15wjpadp",
        zoom: lastZoom,
        center: lastCenter,
      });

      map.on("load", () => {
        map.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: destinations.reduce<any[]>((all, dest) => {
              if (!dest?.meta.latlng) {
                return all;
              }
              all.push({
                type: "Feature",
                properties: dest.meta,
                geometry: {
                  type: "Point",
                  coordinates: dest.meta.latlng
                    ? dest.meta.latlng
                        .split(",")
                        .map((str) => parseFloat(str))
                        .reverse()
                    : undefined,
                },
              });
              return all;
            }, []),
          },
          cluster: true,
          clusterRadius: 35,
        });

        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "places",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#D2849C",
              5,
              "#CF7A94",
              10,
              "#C76C88",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              15,
              5,
              20,
              10,
              25,
            ],
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "places",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "places",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#D2849C",
            "circle-radius": 8,
          },
        });

        map
          .on("mouseenter", "clusters", () => {
            map.getCanvas().style.cursor = "pointer";
          })
          .on("mouseenter", "unclustered-point", () => {
            map.getCanvas().style.cursor = "pointer";
          })
          .on("mouseleave", "clusters", () => {
            map.getCanvas().style.cursor = "";
          })
          .on("mouseleave", "unclustered-point", () => {
            map.getCanvas().style.cursor = "";
          });

        map.on("zoomend", () => {
          lastZoom = map.getZoom();
        });

        map.on("moveend", () => {
          lastCenter = map.getCenter().toArray();
        });

        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features?.[0]?.properties?.cluster_id;
          if (clusterId) {
            const source = map.getSource("places") as any;
            source.getClusterExpansionZoom(
              clusterId,
              (err: any, zoom: number) => {
                if (err) return;

                map.easeTo({
                  center: (features[0].geometry as any).coordinates,
                  zoom: zoom,
                });
              }
            );
          }
        });

        map.on("click", "unclustered-point", (e: any) => {
          const node = e.features[0];

          const latlng = node.geometry.coordinates.slice();
          while (Math.abs(e.lngLat.lng - latlng[0]) > 180) {
            latlng[0] += e.lngLat.lng > latlng[0] ? 360 : -360;
          }

          console.log({ props: node.properties, geo: node.geometry, latlng });

          const popupNode = document.createElement("div");
          const root = createRoot(popupNode);
          root.render(
            <LocationPopout
              place={node.properties.place}
              region={node.properties.region}
              country={node.properties.country}
              thumb={node.properties.thumb}
            />
          );

          new mapboxgl.Popup()
            .setLngLat(latlng)
            .setDOMContent(popupNode)
            .addTo(map);
        });
      });
    });
  }, []);

  return <div id="map" className="absolute inset-0" />;
}
