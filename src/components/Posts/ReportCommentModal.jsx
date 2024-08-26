import { useState } from 'react';
import mainAxios from '../../api/mainAxios';
import Cookies from 'js-cookie';

const ReportCommentModal = ({commentId, postId}) => {
  const [reportContent, setReportContent] = useState('');

  const handleReport = async () => {
    try {
      await mainAxios.post('/travelPost/reportComment', {
        commentId,
        reportContent
      }, {
        headers: {
          authorization: Cookies.get('token'),
        }
      });
      // Close the modal after successful report
      document.getElementById(`reportCommentModal${commentId}${postId}`).close();
      // Optionally, you can add a success message or trigger a refresh here
    } catch (error) {
      console.error('Error reporting comment:', error);
      // Optionally, you can add an error message here
    }
  };

  return (
    <>
      <dialog id={`reportCommentModal${commentId}${postId}`} className="modal modal-middle sm:modal-middle">
        <div className="modal-box mx-auto max-w-sm">
          <h3 className="font-bold text-lg">Warning!!!</h3>
          <p className="py-4">Precaution: please do not simply report comments or we will take action on you as well for misconduct.</p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Reason for reporting"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <button className="btn bg-red-600 text-white" onClick={handleReport}>Report</button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ReportCommentModal