"use client";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Message } from "ai";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { CodeBlock } from "@/components/ui/codeblock";
import { User2 } from "lucide-react";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  const bgClass =
    message.role === "user"
      ? "block w-full bg-white border-b"
      : "block w-full bg-muted/60 border-b";
  return (
    <div className={bgClass}>
      <div className="block max-w-[700px] mx-auto p-[20px]">
        <div className="flex items-start justify-start">
          <div className="w-9 h-9 flex flex-none items-center justify-center mr-4 bg-black rounded-md">
            <User2 className="w-6 h-6 text-white" />
          </div>

          <div className="">
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                code({ children, inline, className, node, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");

                  return match ? (
                    <CodeBlock
                      key={Math.random()}
                      language={(match && match[1]) || ""}
                      value={String(children).replace(/\n$/, "")}
                      {...props}
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
