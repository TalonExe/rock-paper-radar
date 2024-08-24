import userStore from "../../stores/userStore";

const DeleteCommentModal = ({ commentId, postId }) => {
  const deleteComment = userStore((state) => state.deleteComment);
  const getPostComments = userStore((state) => state.getPostComments);
  const onDelete = async () => {
    try {
      await deleteComment(commentId);
      await getPostComments(postId);
      const modalElement = document.getElementById(`deleteCommentModal${commentId}`);
      if (modalElement) {
        modalElement.close();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <dialog id={`deleteCommentModal${commentId}`} className="modal">
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

export default DeleteCommentModal