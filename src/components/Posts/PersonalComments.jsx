import Dropdown from '../ui/Dropdown'
import DeleteCommentModal from './DeleteCommentModal'
import EditCommentModal from './EditCommentModal'
import { Link } from 'react-router-dom'
import userStore from '../../stores/userStore'
import ReportCommentModal from './ReportCommentModal'

const PersonalComments = ({ comment }) => {
    const date = new Date(comment.createdAt);
    const actualUser = userStore((state) => state.username);

    const centerAndShowModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('flex', 'items-center', 'justify-center');
            modal.showModal();
        }
    };

    let manageComments = [
        {
            label: "Edit Comment",
            action: () => centerAndShowModal(`editCommentModal${comment.id}`),
            modal: <EditCommentModal commentId={comment.id} postId={comment.postId} comment={comment.commentContent} />
        },
        {
            label: "Delete Comment",
            action: () => centerAndShowModal(`deleteCommentModal${comment.id}`),
            modal: <DeleteCommentModal commentId={comment.id} postId={comment.postId} />
        },
    ]
    if (comment.User.username !== actualUser) {
        manageComments = [
            {
                label: "Report Comment",
                action: () => centerAndShowModal(`reportCommentModal${comment.id}${comment.postId}`),
                modal: <ReportCommentModal commentId={comment.id} postId={comment.postId} />
            }
        ]
    }
    return (
        <div className='flex flex-row items-center w-full px-8 py-2 border-x-2 border-b-2'>
            <Link to={`/user/profile-public?u=${comment.User.username}`}>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring ring-offset-2">
                        <img src={comment.User.UserProfile.profilePictureUrl} alt="" />
                    </div>
                </div>
            </Link>
            <div className="p-5 flex-1">
                <div className="flex items-center">
                    <Link to={`/user/profile-public?u=${comment.User.username}`}>
                        <b className="text-lg hover:underline">{comment.User.username}</b>
                    </Link>
                    <p className="text-gray-400 ml-5">{`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="">{comment.commentContent}</p>
                </div>
            </div>
            <Dropdown items={manageComments} />
        </div>
    )
}

export default PersonalComments