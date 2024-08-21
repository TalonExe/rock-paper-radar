import { useState } from "react";
import Header from "../../../components/ui/Header";
import UserLayout from "../../../components/Layouts/UserLayout";
import FAQ from "../../../components/FAQ/FAQ";
import UserGuideContent from "../../../components/UserGuide/UserGuideContent";

const ViewFAQ = () => {
  const [selectedContent, setSelectedContent] = useState([]);

  return (
    <UserLayout>
      <Header>
        <span className="text-2xl">
          <b>FAQ</b>
        </span>
      </Header>
      <div className="flex flex-row bg-white h-screen">
        <FAQ onSelect={setSelectedContent} />
        {console.log("Selected Content in ViewUserGuide:", selectedContent)}
        <UserGuideContent content={selectedContent || []} />
      </div>
    </UserLayout>
  );
};

export default ViewFAQ;
