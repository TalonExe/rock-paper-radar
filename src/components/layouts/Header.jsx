const Header = ({ children, className }) => {
    return (
        <div className={'w-full bg-white border-solid border-2 p-4 ' + className}>
            {children}
        </div>
    )
}

export default Header