import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import userStore from '../../stores/userStore';
import MapIcon from '../../assets/icons/mapIcon.svg';
import SearchIcon from '../../assets/icons/searchIcon.svg';
import CalendarIcon from '../../assets/icons/calendarIcon.svg';
import LogoutIcon from '../../assets/icons/logOut.svg';
import FAQIcon from '../../assets/icons/faqIcon.svg';
import FeedbackIcon from '../../assets/icons/feedbackIcon.svg';

const VerticalNavbar = () => {
    const checkLogin = userStore(state => state.checkLogin);
    const profilePictureUrl = userStore(state => state.profilePictureUrl);
    const logout = userStore(state => state.logout);
    const navigate = useNavigate();
    const removeCookie = () => {
        Cookies.remove('username', { path: '/' });
        Cookies.remove('token', { path: '/' });
        Cookies.remove('profilePictureUrl', { path: '/' });
        Cookies.remove('bannerPic', { path: '/' });
        checkLogin();
        logout();
        navigate('/', 'replace')
    }
    return (
        <div className='flex flex-col h-full'>
            <ul className="fixed menu bg-white h-dvh p-0 pt-8 justify-between shadow-md z-10">
                <div>
                    <li className='mb-2 relative'>
                        <Link to="/user/profile" className='tooltip tooltip-right pt-4 pb-4 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200' data-tip="Profile">
                            <div className='avatar'>
                                <div className='ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2'>
                                    <img src={profilePictureUrl} alt="" className='w-8' />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='mb-2 relative'>
                        <Link to="/user/community" className="tooltip tooltip-right pt-2 pb-2 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200" data-tip="Posts">
                            <img src={SearchIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li className='mb-2 relative'>
                        <Link to="/user/map" className="tooltip tooltip-right pt-2 pb-2 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200" data-tip="Map View">
                            <img src={MapIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li className='relative'>
                        <Link to="/user/travel-plans" className="tooltip tooltip-right pt-2 pb-2 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200" data-tip="Travel Plan">
                            <img src={CalendarIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li className='mb-2 relative'>
                        <Link to="/user/faq" className="tooltip tooltip-right pt-2 pb-2 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200" data-tip="FAQ">
                            <img src={FAQIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/user/feedback" className="tooltip tooltip-right pt-2 pb-2" data-tip="Feedback">
                            <img src={FeedbackIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                </div>
                <li className='relative'>
                    <div className='tooltip tooltip-right pt-2 pb-2 mb-8 hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-200' data-tip="Log Out" onClick={removeCookie}>
                        <img src={LogoutIcon} alt="" className='w-10' />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default VerticalNavbar;