import React from "react";
import "../../components/UserGuide/ArrowStyle.css";

const FAQSection = ({ section, content = [], onSelect }) => {
  return (
    <div className="w-[260px] flex flex-col h-max bg-white">
      {/* section title */}
      <div className="collapse collapse-arrow">
        <input type="radio" name="user-guide-accordion" defaultChecked />
        <div className="collapse-title text-xl font-medium active:font-bold text-balance pl-11">
          {section}
        </div>

        <div className="collapse-content text-slate-500">
          {content.map((item, index) => (
            <button
              key={index}
              type="button"
              className="pl-7 mb-2 focus:bg-[#7091E6] w-full text-left focus:text-slate-100 ease-in-out duration-200 rounded-md"
              onClick={() => onSelect([item])}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
