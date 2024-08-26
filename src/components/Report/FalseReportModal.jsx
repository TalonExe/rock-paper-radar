import { useState } from 'react';
import staffStore from '../../stores/staffStore';

const FalseReportModal = ({ id, state, selectedOption }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateReportPostState = staffStore((state) => state.updateReportPostState);
    const updateReportCommentState = staffStore((state) => state.updateReportCommentState);
    const updateReportUserState = staffStore((state) => state.updateReportUserState);

    const falseReportHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (state !== 'Unreviewed') {
                throw new Error('This report has already been reviewed.');
            }
            if (selectedOption === 'Post'){
                await updateReportPostState({ reportId: id, state: 'False Report' });
            }
            else if (selectedOption === 'Comment'){
                await updateReportCommentState({ reportId: id, state: 'False Report' });
            }
            else if (selectedOption === 'User'){
                await updateReportUserState({ reportId: id, state: 'False Report' });
            }
            const modalElement = document.getElementById(`falseReportModal${id}`);
            if (modalElement) {
                modalElement.close();
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating report state:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <dialog id={`falseReportModal${id}`} className="modal">
            <div className="modal-box flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h3 className="font-bold text-lg mb-4">Warning!!!</h3>
                <p className="py-4 text-center">This action is irreversible, are you sure you want to continue?</p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="modal-action flex justify-center w-full">
                    <button 
                        className="btn bg-red-600 text-white mr-2" 
                        onClick={falseReportHandler} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Mark as False Report'}
                    </button>
                    <form method="dialog">
                        <button className="btn" disabled={isLoading}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default FalseReportModal;