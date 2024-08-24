import UserLayout from '../../components/layouts/UserLayout';
import ProfileSection from '../../components/ui/ProfileSection';
import ProfilePosts from '../../components/ui/ProfilePosts';
import ProfileBar from '../../components/ui/ProfileBar';
import { useSearchParams } from 'react-router-dom';
import userStore from '../../stores/userStore';

const Profile = () => {
    const [searchParams] = useSearchParams();
    const profileUsername = searchParams.get('u');
    const currentUsername = userStore(state => state.username);

    return (
        <UserLayout>
            <ProfileSection />
            {(!profileUsername || profileUsername === currentUsername) && <ProfileBar />}
            <ProfilePosts />
        </UserLayout>
    )
}

export default Profile;