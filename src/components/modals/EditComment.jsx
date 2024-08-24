import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import userStore from "../../stores/userStore";

const EditCommentModal = ({ commentId, comment = "", postId }) => {
    const [tempComment, setTempComment] = useState(comment);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { comment: tempComment }
    });

    useEffect(() => {
        setTempComment(comment);
    }, [comment]);

    const editComment = userStore((state) => state.editComment);
    const getPostComments = userStore((state) => state.getPostComments);

    const onSubmit = async (data) => {
        try {
            await editComment(commentId, { commentContent: data.comment });
            await getPostComments(postId);
            if (document.getElementById(`editCommentModal${commentId}`)) {
                document.getElementById(`editCommentModal${commentId}`).close();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setTempComment(comment);
        reset({ comment: comment });
    }

    return (
        <dialog id={`editCommentModal${commentId}`} className="modal" onClose={handleClose}>
            <div className="modal-box max-w-md w-full p-6 bg-white rounded-lg shadow-xl absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form method="dialog" className="absolute top-2 right-2"> 
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={handleClose}>✕</button>
                </form>
                <h3 className="font-bold text-lg mb-4 text-center">Edit Comment</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="comment" className="label">
                            <span className="label-text">Comment</span>
                        </label>
                        <textarea 
                            id="comment"
                            className="textarea textarea-bordered h-24 w-full"
                            placeholder="Enter your comment"
                            {...register("comment", { required: "Comment is required" })}
                            value={tempComment}
                            onChange={(e) => setTempComment(e.target.value)}
                        ></textarea>
                        {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
                    </div>
                    
                    <div className="modal-action justify-end">
                        <button type="button" className="btn btn-ghost" onClick={handleClose}>Cancel</button>
                        <button type='submit' className="btn bg-[#7091E6] text-white">Save Changes</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default EditCommentModal