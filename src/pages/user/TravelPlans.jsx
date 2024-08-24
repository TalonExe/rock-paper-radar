import Header from "../../components/layouts/Header";
import UserLayout from "../../components/layouts/UserLayout";
import TravelList from "../../components/ui/TravelList";
import PlusSign from '../../assets/icons/plusSign.svg'
import CreateTravelPlanModal from "../../components/modals/CreateTravelPlanModal";
import RecommendedTravelPlans from "../../components/ui/RecommendedTravelPlans";

const TravelPlans = () => {
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
            <div className="flex flex-col space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4 p-4 pb-0">Recommended Travel Plan</h2>
                    <RecommendedTravelPlans />
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-4 p-4 pb-0">Your Travel Plans</h2>
                    <TravelList />
                </section>
            </div>
            <CreateTravelPlanModal />
        </UserLayout>
    )
}

export default TravelPlans