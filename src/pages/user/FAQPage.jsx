import { useState } from "react";
import Header from "../../../components/layouts/Header";
import UserLayout from "../../../components/layouts/UserLayout";
import FAQ from "../../../components/ui/FAQ";
import UserGuideContent from "../../../components/ui/UserGuideContent";

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
        <UserGuideContent content={selectedContent || []} />
      </div>
    </UserLayout>
  );
};

export default ViewFAQ;