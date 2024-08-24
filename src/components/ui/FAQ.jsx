import React from "react";
import FAQSection from "./FAQSection";
import mainAxios from "../../api/mainAxios";
import { useEffect, useState } from "react";

const FAQ = ({ onSelect }) => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mainAxios.get('/userguide/');
        const transformedData = transformApiData(response.data.data);
        setFaqData(transformedData);
      } catch (error) {
        console.log(error);
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
        index: acc[item.section].length + 1,
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

  return (
    <div>
        {faqData.map((faq, index) => (
          <FAQSection
            key={index}
            section={faq.section}
            content={faq.content}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
};

export default FAQ;