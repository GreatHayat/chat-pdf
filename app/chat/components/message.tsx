import Image from "next/image";

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
      <div className="block max-w-[700px] mx-auto p-[20px]">
        <div className="flex items-start justify-start">
          <div className="w-9 h-9 flex flex-none items-center justify-center mr-4 bg-black rounded-md">
            {icon}
          </div>

          <div className="flex items-center relative">
            <div className="">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
