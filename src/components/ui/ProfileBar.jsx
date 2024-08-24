import { Link } from 'react-router-dom'

const ProfileBar = () => {
    return (
        <div className='flex flex-row bg-white items-center justify-between border-solid border-t-2 px-8 py-4'>
            <span className='text-2xl text-black'><b>Your Posts</b></span>
            <Link to="/user/create-post" className='btn border-none bg-[#7091E6] text-white hover:cursor-pointer'>Add Post</Link>
        </div>
    )
}

export default ProfileBar