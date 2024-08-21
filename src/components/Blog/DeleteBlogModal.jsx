
const DeleteBlogModal = ({blogId}) => {
  return (
    <dialog id={`deleteBlog${blogId}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Warning!!!</h3>
            <p className="py-4">This action is irreversible, are you sure you want to continue?</p>
            <div className="modal-action">
                <button className="btn bg-red-600 text-white">Delete</button>
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
  )
}

export default DeleteBlogModal
