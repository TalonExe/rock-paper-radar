
const FalseReportModal = ({ id }) => {

    const falseReportHandler = () => {
        console.log('false report');
    }

  return (
    <dialog id={`falseReportModal${id}`} className="modal">
            <div className="modal-box flex flex-col items-center  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="font-bold text-lg mb-4">Warning!!!</h3>
          <p className="py-4 text-center">This action is irreversible, are you sure you want to continue?</p>
          <div className="modal-action flex justify-center w-full">
            <button className="btn bg-red-600 text-white mr-2" onClick={falseReportHandler}>Mark as False Report</button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  );
};

export default FalseReportModal;