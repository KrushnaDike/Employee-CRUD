import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
