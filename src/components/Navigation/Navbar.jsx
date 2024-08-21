import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import userStore from '../../stores/userStore'
import Mapicon from '../../assets/images/MapIcon.svg'
import searchIcon from '../../assets/images/search-icon.svg'
import CalendarIcon from '../../assets/images/CalendarIcon.svg'
import logoutIcon from '../../assets/images/LogoutIcon.svg'
import FAQIcon from '../../assets/images/FAQIcon.svg'

const Navbar = () => {
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
            <ul className="fixed menu bg-base-100 h-dvh p-0 pt-8 justify-between">
                <div>
                    <li className='mb-2'>
                        <Link to="/user/profile" className='tooltip tooltip-right pt-4 pb-4 ' data-tip="Profile">
                            <div className='avatar'>
                                <div className='ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2'>
                                    <img src={profilePictureUrl} alt="" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/user/posts" className="tooltip tooltip-right pt-2 pb-2" data-tip="Posts">
                            <img src={searchIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/user/map-view" className="tooltip tooltip-right pt-2 pb-2" data-tip="Posts">
                            <img src={Mapicon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/travel-itinerary" className="tooltip tooltip-right pt-2 pb-2" data-tip="Travel Plan">
                            <img src={CalendarIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to="/user/faq-view" className="tooltip tooltip-right pt-2 pb-2" data-tip="FAQ">
                            <img src={FAQIcon} alt="" className='w-8' />
                        </Link>
                    </li>
                </div>
                <li>
                    <div className='tooltip tooltip-right pt-2 pb-2 mb-8' data-tip="Log Out" onClick={removeCookie}>
                        <img src={logoutIcon} alt="" className='w-10' />
                    </div>
                </li>
            </ul>

        </div>

    )
}

export default Navbar
