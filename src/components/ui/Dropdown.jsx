import DotMenu from "../../assets/icons/dotMenu.svg";

const Dropdown = ({ items }) => {
    return (
        <div className="dropdown dropdown-left dropdown-end">
            <div tabIndex={0} className="p-4 hover:cursor-pointer">
                <img src={DotMenu} alt="Menu" width="32" height="32" className="w-8 h-8"/>
            </div>
            <ul tabIndex={0} className="dropdown-content text-black menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                {items.map((item) => (
                    <li key={item.label}>
                        <button onClick={item.action}>{item.label}</button>
                        {item.modal}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown;