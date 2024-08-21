import Map, { Marker } from 'react-map-gl/maplibre';
import { useRef, useEffect } from 'react';

const MapLoader = ({handleClick, setCursor, markers}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.on('styleimagemissing', (e) => {
        const id = e.id; // id of the missing image
        map.loadImage(`path/to/your/images/${id}.png`, (error, image) => {
          if (error) throw error;
          map.addImage(id, image);
        });
      });
    }
  }, []);

  return (
    <div className='h-full w-full '>
      <Map
        ref={mapRef}
        onMouseMove={(e) => {
            setCursor(e.lngLat) 
        }}
        onMouseDown={handleClick}
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1,

        }}
        mapStyle={"https://api.maptiler.com/maps/streets/style.json?key=q9EdfYY1JdifqGtVraeG"}
        style={{width: "100%", height: "100%", position: "absolute"}}
        cursor='pointer'
      >
        {markers?.map((marker, index) => (
          <Marker key={index} longitude={marker.props.lng} latitude={marker.props.lat}>
            {marker}
          </Marker>
        ))}
      </Map>
    </div>
  )
}

export default MapLoader