import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./MdDisplayerComponent.css";

const imageMap = {};

const Image = React.memo(({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const newSrc = imageMap[src] || src;
    setImageSrc(newSrc);
  }, [src]);

  return <img src={imageSrc} alt={alt} style={{ maxWidth: "100%" }} />;
});

export const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          if (!inline && match) {
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
            return (
              <code className={`inline-code ${className}`} {...props}>
                {children}
              </code>
            );
          }
        },
        img: Image,
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );
};

const MdDisplayerComponent = ({ fileName }) => {
  // console.log("mdDisplayer rerender", fileName);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/question-text/${fileName}`)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, [fileName]);

  return <Markdown content={content} />;
};

export default MdDisplayerComponent;
