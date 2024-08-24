import VerticalNavbar from './VerticalNavbar';

const UserLayout = ({ children }) => {
    return (
        <div className="flex flex-row w-full min-h-dvh h-full scrollbar-hidden ">
            <VerticalNavbar />
            <div className='flex flex-col min-h-dvh h-fit bg-[#7091E6] bg-opacity-20 w-full pl-[4.5rem] items-stretch'>
                {children}
            </div>
        </div>

    )
}

export default UserLayout