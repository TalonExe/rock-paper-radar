
const ReportPostModal = ({id}) => {
  return (
    <>
        <dialog id={`reportPostModal${id}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Warning!!!</h3>
            <p className="py-4">Precaution: please do not simply report post or we will take action on you as well for misconduct.</p>
            <div className="modal-action">
                <button className="btn bg-red-600 text-white">Report</button>
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    </>
  )
}

export default ReportPostModal
