import { useState } from 'react';
import staffStore from '../../stores/staffStore';

const BanReportModal = ({ id, currentState }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateReportPostState = staffStore((state) => state.updateReportPostState);

    const banReportHandler = async () => {
      if (currentState === 'Unreviewed') {
        setError('Cannot ban an unreviewed report. Please review the report first.');
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        await updateReportPostState({ reportId: id, state: 'Banned' });
        const modalElement = document.getElementById(`banReportModal${id}`);
        if (modalElement) {
          modalElement.close();
        }
      } catch (error) {
        console.log(error);
        setError('An error occurred while banning the report.');
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
    }

    return (
      <dialog id={`banReportModal${id}`} className="modal">
        <div className="modal-box flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="font-bold text-lg mb-4">Warning!!!</h3>
          <p className="py-4 text-center">This action is irreversible, are you sure you want to continue?</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="modal-action flex justify-center w-full">
            <button 
              className="btn bg-red-600 text-white mr-2" 
              onClick={banReportHandler} 
              disabled={isLoading || currentState === 'Unreviewed'}
            >
              {isLoading ? 'Processing...' : 'Ban Post'}
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
};

export default BanReportModal;