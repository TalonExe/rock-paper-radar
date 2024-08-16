import UserLayout from '../../../components/Layouts/UserLayout';
import Header from '../../../components/ui/Header';
import { useState, useEffect } from 'react';
import GarbageIcon from '../../../components/Travel/GarbageIcon'
import GarbageMarker from '../../../components/Travel/GarbageMarker';
import CongestedMarker from '../../../components/Travel/CongestedMarker';
import CongestedIcon from '../../../components/Travel/CongestedIcon';
import MapLoader from '../../../components/Travel/MapLoader';
import PhotogenicMarker from '../../../components/Travel/PhotogenicMarker';
import PhotogenicIcon from '../../../components/Travel/PhotogenicIcon';
import userStore from '../../../stores/userStore';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const MapPage = () => {
  const [cursor, setCursor] = useState({ lng: 0, lat: 0 });
  const [activeMarkerType, setActiveMarkerType] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getMarkers = userStore((state) => state.getMarkers);
  const createMarker = userStore((state) => state.createMarker);
  const deleteMarker = userStore((state) => state.deleteMarker);
  const markers = userStore((state) => state.markers);

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
        const createdMarker = await createMarker(newMarker);
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
      size: 20,
      lat: otherProps.lat,
      lng: otherProps.lng,
      onClick: () => handleMarkerClick(id),
      userId: userId
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
          {['garbage', 'traffic', 'camera'].map(type => (
            <button
              key={type}
              className={`${activeMarkerType === type ? "bg-lime-400 hover:bg-lime-600" : "hover:bg-[#5079df] bg-[#7091E6]"} text-white my-2 font-semibold rounded-md p-2 text-center items-center justify-center cursor-pointer focus:outline-none`}
              onClick={() => setActiveMarkerType(activeMarkerType === type ? null : type)}
            >
              {type === 'garbage' && <GarbageIcon size={40} />}
              {type === 'traffic' && <CongestedIcon size={40} />}
              {type === 'camera' && <PhotogenicIcon size={40} />}
            </button>
          ))}
          <button
            className={`${isDelete ? "bg-lime-400 hover:bg-lime-600" : "hover:bg-[#5079df] bg-[#7091E6]"} min-w-28 text-white my-2 font-semibold rounded-md p-2 text-center items-center justify-center cursor-pointer focus:outline-none`}
            onClick={() => setDelete(d => !d)}
          >
            Remove Marker
          </button>
        </div>
      </Header>

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
        />
      )}
    </UserLayout>
  );
}

export default MapPage