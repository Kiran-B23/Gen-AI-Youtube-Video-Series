// Package Markdown (content plan, script, storyboard …) with GFM tables. No raw HTML is rendered (react-markdown's
// default), links open in a new tab.
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ text }: { text: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer noopener">{children}</a>,
          table: ({ children }) => <div className="md-table scroll-thin"><table>{children}</table></div>,
        }}>{text}</ReactMarkdown>
    </div>
  );
}
