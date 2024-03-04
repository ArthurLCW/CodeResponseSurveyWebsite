import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedlight,
  vs,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import "./MdDisplayerComponent.css";

// Map images
const imageMap = {};

export const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          // return !inline && match ? (
          //   <SyntaxHighlighter
          //     className={"syntax-highlighter"}
          //     style={prism}
          //     language={match[1]}
          //     PreTag="div"
          //     children={String(children).replace(/\n$/, "")}
          //     {...props}
          //   />
          // ) : (
          //   <code className={className} {...props}>
          //     {children}
          //   </code>
          // );
          if (!inline && match) {
            // 块级代码
            return (
              <SyntaxHighlighter
                className={"syntax-highlighter"}
                style={prism}
                language={match[1]}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                {...props}
              />
            );
          } else {
            // 行内代码
            return (
              <code className={`inline-code ${className}`} {...props}>
                {children}
              </code>
            );
          }
        },
        img({ node, ...props }) {
          const newSrc = imageMap[props.src] || props.src;
          return (
            <img
              {...props}
              src={newSrc}
              style={{ maxWidth: "100%" }}
              alt={newSrc}
            />
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );
};

export const MdDisplayerComponent = ({ fileName }) => {
  // console.log("mdDisplayer", fileName);
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/question-text/${fileName}`)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, [fileName]);

  return <Markdown content={content} />;
};
