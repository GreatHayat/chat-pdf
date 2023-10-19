"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  ToolbarPlugin,
  toolbarPlugin,
  ToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import { User2 } from "lucide-react";
import ChatMessage from "./components/message";

export default function Chat() {
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const { ZoomOut } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <div style={{ padding: "0px 2px" }}>
              <ZoomOut>
                {(props) => (
                  <button
                    style={{
                      backgroundColor: "#357edd",
                      border: "none",
                      borderRadius: "4px",
                      color: "#ffffff",
                      cursor: "pointer",
                      padding: "8px",
                    }}
                    onClick={props.onClick}
                  >
                    Zoom out
                  </button>
                )}
              </ZoomOut>
            </div>
            ...
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <div className="overflow-y-auto">
        <ChatMessage
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

        <ChatMessage
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

        <ChatMessage
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

        <ChatMessage
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
      </div>

      <div className="block w-full max-w-[700px] mx-auto mb-4">
        <div className="border shadow p-4 rounded-md">OK</div>
      </div>
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
