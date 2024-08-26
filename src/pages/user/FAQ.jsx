import UserLayout from "../../components/layouts/UserLayout";
import Header from "../../components/layouts/Header";
import FAQContent from "../../components/layouts/FAQContent";
import UserGuideContent from "../../components/layouts/UserGuideContent";
import { useState } from "react";

const FAQ = () => {
    const [selectedContent, setSelectedContent] = useState([]);
    const [activeTab, setActiveTab] = useState('faq');

    return (
        <UserLayout>
            <Header>
                <span className="text-2xl">
                    <b>FAQ & User Guide</b>
                </span>
            </Header>
            <div className="flex flex-col bg-white h-screen">
                <div className="tabs tabs-boxed">
                    <a 
                        className={`tab ${activeTab === 'faq' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        FAQ
                    </a>
                    <a 
                        className={`tab ${activeTab === 'userguide' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('userguide')}
                    >
                        User Guide
                    </a>
                </div>
                <div className="flex flex-row">
                    {activeTab === 'faq' ? (
                        <FAQContent onSelect={setSelectedContent}/>
                    ) : (
                        <UserGuideContent onSelect={setSelectedContent}/>
                    )}
                    <div className="flex-grow p-4">
                        {selectedContent.map((item, index) => (
                            <div key={index}>
                                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default FAQ;