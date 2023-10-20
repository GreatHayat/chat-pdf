"use client";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Message } from "ai";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { CodeBlock } from "@/components/ui/codeblock";

type Props = {
  message: string;
  type: string;
  icon: React.ReactNode;
};

export default function ChatMessage({ message, icon, type }: Props) {
  const bgClass =
    type === "user"
      ? "block w-full bg-white border-b"
      : "block w-full bg-muted/60 border-b";
  return (
    <div className={bgClass}>
      <div className="block max-w-[800px] mx-auto p-[20px]">
        <div className="flex items-start justify-start">
          <div className="w-9 h-9 flex flex-none items-center justify-center mr-4 bg-black rounded-md">
            {icon}
          </div>

          <div className="flex items-center relative">
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                code({ node, inline, className, children, ...props }) {
                  if (children?.length) {
                    if (children[0] == "▍") {
                      return (
                        <span className="mt-1 cursor-default animate-pulse">
                          ▍
                        </span>
                      );
                    }

                    children[0] = (children[0] as string).replace("`▍`", "▍");
                  }

                  const match = /language-(\w+)/.exec(className || "");

                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock
                      key={Math.random()}
                      language={(match && match[1]) || ""}
                      value={String(children).replace(/\n$/, "")}
                      {...props}
                    />
                  );
                },
              }}
            >
              {message}
            </MemoizedReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
