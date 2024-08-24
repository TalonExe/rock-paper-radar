import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import userStore from "../../stores/userStore";

const ReportCommentModal = ({ commentId }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const createCommentReport = userStore((state) => state.createCommentReport);

    const onSubmit = (data) => {
        createCommentReport(commentId, data.reportContent);
        document.getElementById(`reportCommentModal${commentId}`).close();
        reset();
    };

    return (
        <>
            <dialog id={`reportCommentModal${commentId}`} className="modal">
                <div className="modal-box w-11/12 max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="py-4">Precaution: please do not simply report comments or we will take action on you as well for misconduct.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className='flex flex-col w-full'>
                            <label htmlFor="reportContent" className="text-base mb-2">Report Content:</label>
                            <textarea
                                id="reportContent"
                                placeholder="Enter Report Content"
                                className="textarea textarea-bordered w-full h-24"
                                {...register("reportContent", { 
                                    required: "Report content is required",
                                    minLength: {
                                        value: 10,
                                        message: "Report content must be at least 10 characters long"
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: "Report content must not exceed 500 characters"
                                    }
                                })}
                            />
                            <ErrorMessage errors={errors} name="reportContent" as="p" className="text-red-600 mt-1" />
                        </div>
                        <div className='flex justify-between w-full mt-4'>
                            <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700">Report</button>
                            <button type="button" className="btn" onClick={() => document.getElementById(`reportCommentModal${commentId}`).close()}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default ReportCommentModal