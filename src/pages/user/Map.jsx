import UserLayout from '../../components/layouts/UserLayout';
import Header from '../../components/layouts/Header';
import { useState, useEffect } from 'react';
import GarbageIcon from '../../components/ui/GarbageIcon';
import GarbageMarker from '../../components/ui/GarbageMarker';
import CongestedMarker from '../../components/ui/CongestedMarker';
import CongestedIcon from '../../components/ui/CongestedIcon';
import MapLoader from '../../components/layouts/MapLoader';
import PhotogenicMarker from '../../components/ui/PhotogenicMarker';
import PhotogenicIcon from '../../components/ui/PhotogenicIcon';
import userStore from '../../stores/userStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import MarkerCustomizer from '../../components/ui/MarkerCustomizer';

const Map = () => {
  const [cursor, setCursor] = useState({ lng: 0, lat: 0 });
  const [activeMarkerType, setActiveMarkerType] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getMarkers = userStore((state) => state.getMarkers);
  const createMarker = userStore((state) => state.createMarker);
  const deleteMarker = userStore((state) => state.deleteMarker);
  const markers = userStore((state) => state.markers);
  const [markerSize, setMarkerSize] = useState(20);

  useEffect(() => {
    const fetchMarkers = async () => {
      setIsLoading(true);
      try {
        await getMarkers();
      } catch (error) {
        console.error("Error fetching markers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarkers();
  }, [getMarkers]);

  const handleClick = async () => {
    try {
      if (activeMarkerType) {
        const newMarker = {
          type: activeMarkerType,
          lat: cursor.lat,
          lng: cursor.lng
        }
        await createMarker(newMarker);
        await getMarkers();
        setActiveMarkerType(null) // Reset after adding
      }
    } catch (error) {
      console.log("Error creating marker:", error);
    }
  }

  const handleMarkerClick = async (id) => {
    try {
      if (isDelete) {
        await deleteMarker(id);
        await getMarkers();
      }
    } catch (error) {
      console.log("Error deleting marker:", error);
    }
  }

  const renderMarker = (marker) => {
    const { id, userId, ...otherProps } = marker;
    const commonProps = {
      size: markerSize,
      lat: otherProps.lat,
      lng: otherProps.lng,
      onClick: () => handleMarkerClick(id),
      userId: userId,
    }
    switch (marker.type) {
      case 'garbage': return <GarbageMarker key={id} lng={otherProps.lng} lat={otherProps.lat} {...commonProps} />
      case 'traffic': return <CongestedMarker key={id} lng={otherProps.lng} lat={otherProps.lat} {...commonProps} />
      case 'camera': return <PhotogenicMarker key={id} lng={otherProps.lng} lat={otherProps.lat} {...commonProps} />
      default: return null
    }
  }

  return (
    <UserLayout>
      <Header className="flex flex-row justify-between items-center">
        <span className='text-2xl'>Map View</span>
        <div className='gap-4 flex'>
          {[
            { type: 'garbage', label: 'Dirty' },
            { type: 'traffic', label: 'Overcrowded' },
            { type: 'camera', label: 'Photogenic' }
          ].map(({ type, label }) => (
            <button
              key={type}
              className={`${activeMarkerType === type ? "bg-lime-400 hover:bg-lime-600" : "hover:bg-[#5079df] bg-[#7091E6]"} text-white my-2 font-semibold rounded-md p-2 text-center items-center justify-center cursor-pointer focus:outline-none tooltip`}
              onClick={() => setActiveMarkerType(activeMarkerType === type ? null : type)}
              data-tip={label}
            >
              {type === 'garbage' && <GarbageIcon size={40} />}
              {type === 'traffic' && <CongestedIcon size={40} />}
              {type === 'camera' && <PhotogenicIcon size={40} />}
            </button>
          ))}
          <button
            className={`${isDelete ? "bg-lime-400 hover:bg-lime-600" : "hover:bg-[#5079df] bg-[#7091E6]"} min-w-28 text-white my-2 font-semibold rounded-md p-2 text-center items-center justify-center cursor-pointer focus:outline-none tooltip`}
            onClick={() => setDelete(d => !d)}
            data-tip="Remove Marker"
          >
            Remove Marker
          </button>
        </div>
      </Header>

      <MarkerCustomizer
        size={markerSize}
        setSize={setMarkerSize}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <MapLoader
          handleClick={handleClick}
          setCursor={setCursor}
          cursor={cursor}
          markers={markers?.map(renderMarker)}
          initialViewState={{
            longitude: 0, // Replace with a more suitable longitude
            latitude: 0,  // Replace with a more suitable latitude
            zoom: 2,      // Adjust the zoom level as needed
          }}
        />
      )}
    </UserLayout>
  );
}

export default Map