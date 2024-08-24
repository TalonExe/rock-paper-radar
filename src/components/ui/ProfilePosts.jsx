import AuthorCard from '../ui/AuthorCard'
import userStore from "../../stores/userStore"
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from "../ui/LoadingSpinner";

const ProfilePosts = () => {
    const username = userStore((state) => state.username);
    const getUserPosts = userStore((state) => state.getUserPosts);
    const userProfile = userStore((state) => state.userProfile);
    const posts = userStore((state) => state.profilePosts);
    const profileDetails = userStore((state) => state.profileDetails);
    const [searchParams] = useSearchParams();
    const profileUsername = searchParams.get('u');
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            if (profileUsername) {
                await getUserPosts(profileUsername);
            } else if (pathname === '/user/profile') {
                await getUserPosts(username);
            } else {
                navigate('/user/profile', { replace: true });
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, [username, getUserPosts, profileUsername, pathname, profileDetails]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {(!posts) ? 'No posts yet' : (posts.map((element, index) => {
                return (<AuthorCard
                    key={index}
                    postId={element.id}
                    postTitle={element.postTitle}
                    pictureUrl={element.pictureUrl}
                    postContent={element.postContent}
                    createdAt={new Date(element.createdAt)}
                    location={element.location}
                    tags={element.PostTags}
                    username={userProfile.username}
                    profilePictureUrl={userProfile.profilePictureUrl}
                />)
            }))}
        </div>

    )
}

export default ProfilePosts;