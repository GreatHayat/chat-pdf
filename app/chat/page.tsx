"use client";

// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import {
//   ToolbarPlugin,
//   toolbarPlugin,
//   ToolbarSlot,
// } from "@react-pdf-viewer/toolbar";
import { FormEvent, useState } from "react";
import { useChat } from "ai/react";
import { User2 } from "lucide-react";
import ChatMessage from "./components/message";
import { testMessage } from "@/test";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
  //   <Toolbar>
  //     {(slots: ToolbarSlot) => {
  //       const { ZoomOut } = slots;
  //       return (
  //         <div
  //           style={{
  //             alignItems: "center",
  //             display: "flex",
  //           }}
  //         >
  //           <div style={{ padding: "0px 2px" }}>
  //             <ZoomOut>
  //               {(props) => (
  //                 <button
  //                   style={{
  //                     backgroundColor: "#357edd",
  //                     border: "none",
  //                     borderRadius: "4px",
  //                     color: "#ffffff",
  //                     cursor: "pointer",
  //                     padding: "8px",
  //                   }}
  //                   onClick={props.onClick}
  //                 >
  //                   Zoom out
  //                 </button>
  //               )}
  //             </ZoomOut>
  //           </div>
  //           ...
  //         </div>
  //       );
  //     }}
  //   </Toolbar>
  // );

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) {
      return alert("You can't send a blank message");
    }
    handleSubmit(e);
  };
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {/* <div className="w-[50%]">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div style={{ height: "100vh" }}>
              <Viewer
                fileUrl={"/Threads.pdf"}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        </div> */}

        {messages.map((message) =>
          // <div key={m.id}>
          //   {m.role === 'user' ? 'User: ' : 'AI: '}
          //   {m.content}
          // </div>
          message.role === "user" ? (
            <ChatMessage key={message.id} message={message} />
          ) : (
            <ChatMessage key={message.id} message={message} />
          )
        )}
        {/* <ChatMessage message={testMessage} /> */}
      </div>

      <form onSubmit={sendMessage}>
        <div className="bg-white p-4 border-t flex items-center">
          <input
            type="text"
            className="w-full px-2 py-2 border rounded-md"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
          />
          <Button
            className="ml-2 text-white px-3 py-2 rounded-md"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>

      {/*<div className="overflow-y-auto">
        {/* <ChatMessage
          message="This is a message"
          icon={<User2 className="w-6 h-6 text-white" />}
          type="user"
        />

        <ChatMessage
          message={`This updated HTML and CSS will display avatars next to the message content in a flex row layout. The avatar class is used to style the avatar, and the content class is used to style the message content. You can adjust the width, height, and other styling properties to fit your design.

          Make sure you replace "avatar.png" in the img element with the actual URL or path to your user's avatar image.`}
          icon={<User2 className="w-6 h-6 text-white" />}
          type="bot"
        /> 
      </div>*/}

      {/* <div className="block w-full max-w-[700px] mx-auto mb-4">
        <div className="border shadow p-4 rounded-md">OK</div>
      </div> */}
      {/* <div style={{ width: "50%" }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div style={{ height: "100vh" }}>
              <Viewer
                fileUrl={"/Threads.pdf"}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        </div> */}
    </>
  );
}
