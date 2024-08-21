import React, { useState } from "react";
import Header from "../../../components/ui/Header";
import UserLayout from "../../../components/Layouts/UserLayout";
import UserGuide from "../../../components/UserGuide/UserGuide";
import UserGuideContent from "../../../components/UserGuide/UserGuideContent";
import PlusSign from "../../../assets/images/PlusSign.svg";
import { Link } from "react-router-dom";

const ViewUserGuide = () => {
  const [selectedContent, setSelectedContent] = useState([]);

  return (
    <UserLayout>
      <Header>
        <span className="text-2xl">
          <b>User Guide</b>
          <Link
            to="/admin/user-guide-create"
            className="btn ml-4 text-white bg-[#7091E6] float-right"
          >
            <img
              src={PlusSign}
              className="w-6 h-6 float-left mt-1 mr-1 fill-white"
            />
            Add User Guide
          </Link>
        </span>
      </Header>
      <div className="flex flex-row bg-white h-screen">
        <UserGuide onSelect={setSelectedContent} />
        {console.log("Selected Content in ViewUserGuide:", selectedContent)}
        <UserGuideContent content={selectedContent || []} />
      </div>
    </UserLayout>
  );
};

// function ViewUserGuide() {
//   return (
//     <UserLayout>
//       <Header>
//         <span className="text-2xl">
//           <b>User Guide</b>
//         </span>
//       </Header>
//       <div className="flex flex-row">
//         <div className="flex flex-col h-screen bg-white">
//           <UserGuide />
//         </div>
//         <UserGuideContent />
//       </div>
//     </UserLayout>
//   );
// }

export default ViewUserGuide;
