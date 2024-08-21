import React from "react";

const UserGuideContent = ({ content = [] }) => {
  return (
    <div className="w-screen">
      {content.map((item, index) => (
        <div key={index} className="px-7 py-5 bg-slate-100 w-full h-full">
          <h2 className="card-title font-bold text-3xl mb-4">{item.title}</h2>
          <div className="border-t-2 border-slate-300 py-2 space-y-4">
            {item.desc.split("\n").map((paragraph, index) => (
              <p key={index} className="my-3 text-pretty">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGuideContent;
