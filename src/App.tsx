import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Router } from "./routes/Router";
import { GlobalStyle } from "./styles/global";
import { darkTheme } from "./styles/themes/dark";
import { defaultTheme } from "./styles/themes/default";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <div className="App">
      
      {/* isDarkTheme ? darkTheme : */}
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <GlobalStyle />
          <ToastContainer />
        </ThemeProvider>
   
    </div>
  );
}
