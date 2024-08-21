import Header from "../../../components/ui/Header";
import UserLayout from "../../../components/Layouts/UserLayout";
import TravelList from "../../../components/Travel/TravelList";
import PlusSign from '../../../assets/images/PlusSign.svg'
import CreateTravelPlanModal from "../../../components/Travel/CreateTravelPlanModal";
// import { Link } from "react-router-dom";

function TravelItinerary() {
  return (
    <UserLayout>
      <Header>
        <span className="text-2xl">
          <b>Travel Itinerary</b>
        </span>
        <div
          className="bg-[#7091E6] hover:opacity-80 py-1.5 px-3 rounded-md text-white float-right flex flex-row justify-center items-center cursor-pointer"
          onClick={() => document.getElementById('createTravelCardModal').showModal()}
        >
          <img
            src={PlusSign}
            className="w-6 h-6 float-left mt-1 mr-1 fill-white"
          />
          Add Location
        </div>
      </Header>
      <TravelList />
      <CreateTravelPlanModal />
    </UserLayout>
  );
}

export default TravelItinerary;
