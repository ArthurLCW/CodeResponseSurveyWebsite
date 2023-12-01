import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Map images
const imageMap = {
  
};

const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter style={solarizedlight} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        img({node, ...props}) {
          const newSrc = imageMap[props.src] || props.src;
          return <img {...props} src={newSrc} style={{maxWidth: "100%"}}/>
        }
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}

const MdDisplayerComponent = ({ fileName }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/question-text/${fileName}`)
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading markdown:', error));
  }, [fileName]);

  return <Markdown content={content} />;
};

export default MdDisplayerComponent;
