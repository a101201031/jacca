import { MapBox } from 'component';
import { useEffect, useRef } from 'react';

interface MapContainerProps {
  location: { coordinates: number[] };
}

export function MapContainer({ location }: MapContainerProps) {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const mapLocation = new naver.maps.LatLng(
      location.coordinates[1],
      location.coordinates[0],
    );
    const mapOptions: naver.maps.MapOptions = {
      center: mapLocation,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: mapLocation,
      map,
    });
  }, [location.coordinates]);

  return <MapBox ref={mapElement} />;
}
