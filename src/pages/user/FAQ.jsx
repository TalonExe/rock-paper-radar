import UserLayout from "../../components/layouts/UserLayout";
import Header from "../../components/layouts/Header";
import FAQContent from "../../components/layouts/FAQContent";
import UserGuideContent from "../../components/layouts/UserGuideContent";
import { useState } from "react";

const FAQ = () => {
    const [selectedContent, setSelectedContent] = useState([]);
    return (
        <UserLayout>
        <Header>
          <span className="text-2xl">
            <b>FAQ</b>
          </span>
        </Header>
        <div className="flex flex-row bg-white h-screen">
          <FAQContent onSelect={setSelectedContent}/>
          <UserGuideContent content={selectedContent || []} />
        </div>
      </UserLayout>
    )
}

export default FAQ;