import { Marker } from "react-map-gl/dist/esm/exports-maplibre"
import CongestedIcon from "./CongestedIcon"

const CongestedMarker = ({size=20, length, lat, lng, onClick, userId}) => {
  // Generate a color based on the userId
  const color = userId ? `hsl(${parseInt(userId) * 137.508 % 360}, 70%, 50%)` : '#000000';

  return (
    <Marker
      key={length}
      latitude={lat}
      longitude={lng}
      anchor='bottom'
      onClick={onClick}
    >
      <CongestedIcon size={`${size}px`} color={color}/>
    </Marker>
  )
}

export default CongestedMarker