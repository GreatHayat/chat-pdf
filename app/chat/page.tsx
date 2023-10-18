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
      <div className="flex space-x-2">
        <div style={{ width: "50%" }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div style={{ height: "100vh" }}>
              <Viewer
                fileUrl={"/Threads.pdf"}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        </div>
      </div>
    </>
  );
}
