import TravelCard from "./TravelCard";
import { useEffect, useState } from "react";
import userStore from "../../stores/userStore";
import LoadingSpinner from "../ui/LoadingSpinner";

const TravelList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getUserTravelPlans = userStore((state) => state.getUserTravelPlans);
  const travelPlans = userStore((state) => state.travelPlans);

  useEffect(() => {
    const fetchTravelPlans = async () => {
      setIsLoading(true);
      try {
        await getUserTravelPlans();
      } catch (error) {
        console.error("Error fetching travel plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravelPlans();
  }, [getUserTravelPlans]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid-cols-1 bg-opacity-50 ">
      {travelPlans?.map(({ id, pictureUrl, title, location, duration, TravelTags }) => (
        <TravelCard
          key={id}
          image={pictureUrl}
          title={title}
          location={location}
          duration={duration}
          tags={TravelTags}
          id={id}
          hoverable
        />
      ))}
    </div>
  );
};

export default TravelList;