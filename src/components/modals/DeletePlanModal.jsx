import userStore from "../../stores/userStore"
const DeletePlanModal = ({ id }) => {
    const deleteTravelPlan = userStore((state) => state.deleteTravelPlan);
    const getUserTravelPlans = userStore((state) => state.getUserTravelPlans);
    const onDelete = async () => {
        try {
              await deleteTravelPlan(id);
              await getUserTravelPlans();
              const modalElement = document.getElementById(`deletePlanModal${id}`);
              if (modalElement) {
                modalElement.close();
              }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <dialog id={`deletePlanModal${id}`} className="modal">
                <div className="modal-box absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h3 className="font-bold text-lg">Warning!!!</h3>
                    <p className="py-4">This action is irreversible, are you sure you want to continue?</p>
                    <div className="modal-action">
                        <button className="btn bg-red-600 text-white" onClick={onDelete}>Delete</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeletePlanModal