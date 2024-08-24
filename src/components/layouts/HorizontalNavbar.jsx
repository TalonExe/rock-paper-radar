import { Link } from 'react-router-dom';
import userStore from '../../stores/userStore';

function HorizontalNavbar() {
    const isLogin = userStore(state => state.isLogin);

    return (
        <div className="flex justify-between items-center w-full py-6 px-8 z-10">
            <Link to="/" className="text-3xl font-bold font-poppins italic text-white text-stroke-blue">Rock Paper Radar</Link>
            <div className="space-x-6">
                <Link to="/blogs" className="text-white hover:text-blue-300 active:text-blue-100 transition duration-300 relative group">
                    <span>Blogs</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                {isLogin ? (
                    <>
                        <Link to="/user/profile" className="text-white hover:text-blue-300 active:text-blue-100 transition duration-300 relative group">
                            <span>My Account</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/auth/signin" className="text-white hover:text-blue-300 active:text-blue-100 transition duration-300 relative group">
                            <span>Sign In</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link to="/auth/signup" className="text-white hover:text-blue-300 active:text-blue-100 transition duration-300 relative group">
                            <span>Sign Up</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default HorizontalNavbar;