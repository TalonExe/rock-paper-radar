import userStore from "../../stores/userStore";

const DeletePostModal = ({ id }) => {
  const deletePost = userStore((state) => state.deletePost);
  const getUserPosts = userStore((state) => state.getUserPosts);
  const getPersonalProfile = userStore((state) => state.getPersonalProfile);
  const username = userStore((state) => state.username);
  const deletePostHandler = async () => {
    try {
      await deletePost(id);
      await getUserPosts(username);
      await getPersonalProfile();
      const modalElement = document.getElementById(`deleteModal${id}`);
      if (modalElement) {
        modalElement.close();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <dialog id={`deleteModal${id}`} className="modal modal-middle">
        <div className="modal-box flex flex-col items-center  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="font-bold text-lg mb-4">Warning!!!</h3>
          <p className="py-4 text-center">This action is irreversible, are you sure you want to continue?</p>
          <div className="modal-action flex justify-center w-full">
            <button className="btn bg-red-600 text-white mr-2" onClick={deletePostHandler}>Delete</button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default DeletePostModal