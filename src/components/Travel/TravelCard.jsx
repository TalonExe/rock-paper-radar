import Marker from "../../assets/images/Marker.svg";
import Badge from "../ui/Badge.jsx";
import Dropdown from "../ui/Dropdown";
import DeletePlanModal from "../ui/DeletePlanModal";
import EditPlanModal from "../ui/EditPlanModal";

const TravelCard = ({ image, title, location, duration, tags, id }) => {
  let list = [
    {
        label: "Delete Post",
        action: () => document.getElementById(`deletePlanModal${id}`).showModal(),
        modal: <DeletePlanModal key={id} id={id} />
    },
    {
        label: "Edit Post",
        action: () => document.getElementById(`editPlanModal${id}`).showModal(),
        modal:  <EditPlanModal key={id} id={id} tags={tags} location={location} duration={duration} pictureUrl={image} planTitle={title} />
    }
]
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${remainingMinutes} min`;
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm border-2 w-11/12 max-w-2xl max-h-56 m-4 overflow-hidden">
      <figure className="w-1/3 h-56 overflow-hidden">
        <img src={image} className="w-full h-full object-cover" alt={title} />
      </figure>
      <div className="card-body overflow-y-auto p-4 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
          <div className="flex items-center mb-2">
            <img src={Marker} alt="" className="w-8 h-8 mr-2 flex-shrink-0" />
            <span className="text-sm max-w-[60%] break-words">{location}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-lg font-bold">Duration: </span>
            <span className="text-sm">{formatDuration(duration)}</span>
          </div>

          <div>
            <span className="text-lg font-bold">Tags: </span>
            <div className="flex flex-wrap mt-1">
              {tags?.map((tag) => (
                <Badge category={tag.name} key={tag.id} className="text-xs mr-1 mb-1" />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2">
          <Dropdown items={list} />
        </div>
      </div>
    </div>
  );
};

export default TravelCard;