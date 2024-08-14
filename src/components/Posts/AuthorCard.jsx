import Badge from "../ui/Badge";
import { Link } from "react-router-dom";
import ReadMore from "../ui/ReadMore";
import Dropdown from "../ui/Dropdown";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";

const AuthorCard = ({ postId, postTitle, pictureUrl, username, postContent, createdAt, profilePictureUrl, tags }) => {
    // const manageList = [
    //     {
    //         label: "Edit Post",
    //         action: () => {
    //             document.getElementById(`editPost${id}`).showModal()                
    //             setCurrTitle(title)                  
    //             setCurrDescription(description)             
    //         },
    //         modal: <EditPostModal
    //             key={id}
    //             id={id}
    //             title={currTitle}
    //             description={currDescription}
    //         /> ,
    //     },
    //     {
    //         label: "Delete Post",
    //         action: () => document.getElementById('deleteModal').showModal(),
    //         modal: <DeleteModal
    //             key={id}
    //         /> ,
    //     },
    // ]

    return (

        <div className="card bg-base-100 mx-8 mt-4 shadow-xl max-h-[700px]" key={postId}>
            <Link to={`/user/post-view?p=${postId}`}><figure>
                <img
                    src={pictureUrl}
                    alt="Profile Picture" />
            </figure>
            </Link>
            <div className="card-body">
                <h2 className="card-title">
                    {postTitle}
                </h2>
                <ReadMore>{postContent}</ReadMore>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <div className='avatar'>
                            <div className='ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 mr-4 mt-4 mb-4'>
                                <img src={profilePictureUrl} alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm ">{username}</span>
                            <span className="text-sm text-[#ABABAB]">{`${String(createdAt.getDate()).padStart(2, '0')}/${String(createdAt.getMonth() + 1).padStart(2, '0')}/${createdAt.getFullYear()}`}</span>
                        </div>
                    </div>
                    {/* <Dropdown
                            key={id}
                            items={manageList}
                        /> */}
                </div>
                <div className="card-actions justify-start">
                    {tags.map((tag, index) => {
                        return <Badge category={tag.name} key={index} />
                    }
                    )}
                </div>
            </div>
        </div>


    );
}

export default AuthorCard