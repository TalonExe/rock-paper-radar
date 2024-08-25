import staffStore from '../../stores/staffStore';

const BanReportModal = ({ id }) => {

    // const deletePost = userStore((state) => state.deletePost);
    const createBannedPost = staffStore((state) => state.createBannedPost);

    const banReportHandler = async () => {
    try {
        await createBannedPost(id);
    //   await deletePost(postId);
      const modalElement = document.getElementById(`banReportModal${id}`);
      if (modalElement) {
        modalElement.close();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <dialog id={`banReportModal${id}`} className="modal">
            <div className="modal-box flex flex-col items-center  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="font-bold text-lg mb-4">Warning!!!</h3>
          <p className="py-4 text-center">This action is irreversible, are you sure you want to continue?</p>
          <div className="modal-action flex justify-center w-full">
            <button className="btn bg-red-600 text-white mr-2" onClick={banReportHandler}>Ban Post</button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  );
};

export default BanReportModal;