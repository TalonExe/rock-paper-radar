import { useEffect, useState } from "react";
import userStore from "../../stores/userStore";
import TravelCard from "./TravelCard";
import LoadingSpinner from "./LoadingSpinner";

const RecommendedTravelPlans = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getRecommendedTravelPlans = userStore((state) => state.getRecommendedTravelPlans);
  const recommendedPlan = userStore((state) => state.recommendedTravelPlan);

  useEffect(() => {
    const fetchRecommendedPlans = async () => {
      setIsLoading(true);
      try {
        await getRecommendedTravelPlans();
      } catch (error) {
        console.error("Error fetching recommended travel plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedPlans();
  }, [getRecommendedTravelPlans]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid-cols-1 bg-opacity-50">
        <TravelCard
          key={recommendedPlan.id}
          image={recommendedPlan.pictureUrl}
          title={"A trip to " + recommendedPlan.location}
          location={recommendedPlan.location}
          duration={""}
          tags={recommendedPlan.PostTags}
          recommendedPlan={true}
          hoverable
        />
    </div>
  );
};

export default RecommendedTravelPlans;
