import React, { useEffect, useState } from "react";
import mainAxios from "../../api/mainAxios";
import FAQSection from "./FAQSection";
import Cookies from "js-cookie";
import LoadingSpinner from "../ui/LoadingSpinner";

const UserGuideContent = ({ onSelect }) => {
    const [userGuideData, setUserGuideData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await mainAxios.get('/userguide/', {
                    headers: {
                        authorization: Cookies.get('token')
                    }
                });
                const filteredData = response.data.data.filter(item => item.forUserType === 'user');
                const transformedData = transformApiData(filteredData);
                setUserGuideData(transformedData);
            } catch (error) {
                console.error("Error fetching user guide data:", error);
                setError("Failed to load user guide. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const transformApiData = (apiData) => {
        const groupedData = apiData.reduce((acc, item) => {
            if (!acc[item.section]) {
                acc[item.section] = [];
            }
            acc[item.section].push({
                title: item.title,
                desc: item.content
            });
            return acc;
        }, {});

        return Object.entries(groupedData).map(([section, content]) => ({
            section,
            content
        }));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            {userGuideData.map((guide, index) => (
                <FAQSection
                    key={index}
                    section={guide.section}
                    content={guide.content}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default UserGuideContent;