import backgroundImage from "../../assets/images/user/background.png";
import userStore from "../../stores/userStore";
import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from 'react-router-dom';
import unsplashApi from "../../api/unsplashApi";
import Dropdown from "../ui/Dropdown";
import Cookies from "js-cookie";
import EditProfileModal from "../modals/EditProfileModal.jsx";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProfileSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const manageList = [{
        label: "Edit Profile",
        action: () => document.getElementById('editProfile').showModal(),
        modal: <EditProfileModal />
    }];
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const usernameQuery = searchParams.get('u');
    const username = userStore(state => state.username);
    const getPersonalProfile = userStore(state => state.getPersonalProfile);
    const getPublicProfile = userStore(state => state.getPublicProfile);
    const [bannerPic, setBannerPic] = useState('');
    const profileDetails = userStore(state => state.profileDetails);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (!usernameQuery || usernameQuery === username) {
                await getPersonalProfile();
            } else {
                await getPublicProfile(usernameQuery);
            }
            await getBannerPic();
            setIsLoading(false);
        };

        fetchData();
    }, [usernameQuery, username, getPublicProfile, getPersonalProfile, location.pathname]);

    if (usernameQuery && usernameQuery !== username) {
        manageList[0] = {
            label: "Report User",
            action: () => document.getElementById('editProfile').showModal(),
            modal: <LoadingSpinner />
        };
    }

    const getBannerPic = async () => {
        if (!Cookies.get('bannerPic')) {
            try {
                const response = await unsplashApi.get('/photos/random?count=1');
                const data = response.data[0].urls.regular;
                Cookies.set('bannerPic', data);
                setBannerPic(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setBannerPic(Cookies.get('bannerPic'));
        }
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='flex flex-col bg-white w-full'>
            <img src={(bannerPic === '') ? backgroundImage : bannerPic} alt="" className='object-cover h-32 min-w-0' />
            <div className='flex flex-row items-center justify-between p-4'>
                <div className='flex flex-row items-center'>
                    <div className='avatar'>
                        <div className='ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2 m-2 mr-8'>
                            <img src={(profileDetails) ? profileDetails.profilePictureUrl : ''} alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl text-black font-bold mb-2'>{(profileDetails) ? profileDetails.username : ''}</span>
                        <span className='text-xl text-black text-[#ABABAB]'>Joined in {(profileDetails) ? profileDetails.joinedDate : ''}</span>
                    </div>
                </div>

                <div className='flex flex-row items-center w-fit'>
                    <span className='text-2xl text-black mb-2'>{(profileDetails) ? ((profileDetails.totalPosts === 1) ? `${profileDetails.totalPosts} Post` : `${profileDetails.totalPosts} Posts`) : `0 Posts`}</span>
                    <Dropdown
                        items={manageList}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileSection