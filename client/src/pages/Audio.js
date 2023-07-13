import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AudioPlayer from "./audioPlayer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AudioPlayer />
  </StrictMode>
);