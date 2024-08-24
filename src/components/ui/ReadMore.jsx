import { useState } from "react";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <div className="text">
            {isReadMore ? text.slice(0, 100) : text}
            <div
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "green", display: (text.length > 100) ? 'initial' : 'none' }}
            >
                {isReadMore ? "...read more" : " show less"}
            </div>
        </div>
    );
};

export default ReadMore