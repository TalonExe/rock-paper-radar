import React from "react";
import FAQSection from "./FAQSection";

const FAQ = ({ onSelect }) => {
    const faqData = [
        {
          section: "Posts",
          content: [
            {
              index: 1.1,
              title: "How to create a post?",
              desc: `
              Steps to create a post...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              `
            },
            {
              index: 1.2,
              title: "How to edit a post?",
              desc: `
              Steps to edit a post...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              `
            }
          ]
        },
        {
          section: "Comments",
          content: [
            {
              index: 2.1,
              title: "How to add a comment?",
              desc: `
              Steps to add a comment...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              `
            },
            {
              index: 2.2,
              title: "How to delete a comment?",
              desc: `
              Steps to delete a comment...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              `
            }
          ]
        },
        {
          section: "Likes",
          content: [
            {
              index: 3.1,
              title: "How to like a post?",
              desc: `
              Steps to like a post...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              `
            },
            {
              index: 3.2,
              title: "How to unlike a post?",
              desc: `
              Steps to unlike a post...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis molestias doloribus dicta tempora minima asperiores? Quisquam doloribus quibusdam, reprehenderit voluptatum officia error vitae asperiores soluta hic quos ipsa ut?
              `
            }
          ]
        }
      ];
      

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
