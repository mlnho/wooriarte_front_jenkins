import { BrowserRouter, useSearchParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import Routers from "./components/Routers";
import MainUser from "./pages/MainUser";
import { createContext, useEffect, useState } from "react";

import CuFooter from "./components/CuFooter";

export const loginContext = createContext();

function App() {
  const [isLoginState, setIsLoginStateState] = useState(false); // 로그인 여부

  // 로그인 여부 검사
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoginStateState(true);
    } else {
      setIsLoginStateState(false);
    }
  }, [isLoginState]);

  return (
    <div className="wrapper">
      <loginContext.Provider value={setIsLoginStateState}>
        <BrowserRouter>
          {/* 유저 id */}
          <Header
            isLoginState={isLoginState} // 헤더는 로그인여부 값을 받기만 함
            isLoginHandler={setIsLoginStateState}
          />
          <Routers />
          <CuFooter className="footer" />
        </BrowserRouter>
      </loginContext.Provider>
    </div>
  );
}

export default App;
