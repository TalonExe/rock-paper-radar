import React from "react";
import FAQSection from "./FAQSection";
import mainAxios from "../../api/mainAxios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const faqData = [
  {
    section: "General",
    content: [
      {
        title: "What is Rock Paper Radar?",
        desc: "Rock Paper Radar is a community-driven platform for eco-conscious travelers to share experiences, connect with like-minded individuals, and discover sustainable travel destinations."
      },
      {
        title: "How do I create an account?",
        desc: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Follow the prompts to enter your details and set up your profile."
      },
      {
        title: "Is Rock Paper Radar free to use?",
        desc: "Yes, Rock Paper Radar is completely free to use. We believe in making sustainable travel accessible to everyone."
      }
    ]
  },
  {
    section: "Travel Planning",
    content: [
      {
        title: "How can I find eco-friendly destinations?",
        desc: "Use our search feature to filter destinations by eco-friendliness ratings. You can also browse through user-generated content and recommendations for sustainable travel spots."
      },
      {
        title: "Can I create and share my own travel itineraries?",
        desc: "Absolutely! Once logged in, you can create and share your eco-friendly travel itineraries with the community. Simply go to your profile and click on 'Create New Itinerary'."
      },
      {
        title: "How do I connect with other travelers?",
        desc: "You can connect with other travelers by commenting on their posts, joining discussion forums, or using our direct messaging feature to reach out to individuals with similar travel interests."
      }
    ]
  },
  {
    section: "Sustainability",
    content: [
      {
        title: "How does Rock Paper Radar promote sustainable travel?",
        desc: "We encourage sustainable travel by highlighting eco-friendly destinations, providing tips for reducing carbon footprints, and fostering a community that values responsible tourism."
      },
      {
        title: "Can I contribute sustainability tips?",
        desc: "Yes! We welcome user contributions. You can share your sustainability tips by creating a post or submitting them directly to our editorial team for review."
      },
      {
        title: "How are eco-friendly ratings determined?",
        desc: "Eco-friendly ratings are based on a combination of user reviews, official certifications, and our team's research on the destination's sustainability practices."
      }
    ]
  },
  {
    section: "Technical Support",
    content: [
      {
        title: "How can I report a bug or suggest a feature?",
        desc: "You can report bugs or suggest features by going to the 'Feedback' section in your user profile. We appreciate your input in making Rock Paper Radar better!"
      },
      {
        title: "Is my personal information secure?",
        desc: "We take data security seriously. Your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent."
      }
    ]
  }
];

const FAQContent = ({ onSelect }) => {
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

export default FAQContent;