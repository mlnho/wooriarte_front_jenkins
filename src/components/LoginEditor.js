import EditText from "./EditText";
import "../styles/LoginEditor.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// api
import { onLoginButtonHandler } from "../apis/servicehandeler/ApiHandler";
import { onLoginAuthorHandler } from "../apis/servicehandeler/AuthorApiHandler";
import { onLoginSpaceHandler } from "../apis/servicehandeler/SpaceApiHandler";

import { loginContext } from "../App";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import MuiDialog from "../libs/MuiDialog";
// whatUser 프롭은 개인, 작가, 프로젝트 매니저 알기 위함 -> todo("부모 컴포넌트에서 값 나누기")
const LoginEditor = ({ whatUser }) => {
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그
  const setIsLoginStateState = useContext(loginContext);
  const nav = useNavigate();
  const changeUserLoginState = useContext(loginContext);
  const [state, setState] = useState({
    id: "",
    pw: "",
  });

  // id, pw 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 버튼 클릭 이벤트 핸들러
  const handleLoginClick = () => {
    console.log("로그인 정보:", state);
    // 로그인 양식 맞는지 확인 todo("더 구체적으로 작성하기 ")
    // todo 임시로 각 사이트 보기위함임!!!!
    // switch (whatUser) {
    //   case "user": {
    //     nav(`/`);
    //     changeUserLoginState(true);
    //     return;
    //   }
    //   case "space": {
    //     nav(`/mainbusiness`);
    //     changeUserLoginState(true);
    //     return;
    //   }
    //   case "author": {
    //     nav(`/mainbusiness`);
    //     changeUserLoginState(true);
    //     return;
    //   }
    //   default: {
    //     alert("잘못된 접근");
    //     return;
    //   }
    // }
    if (state.id !== "" && state.pw !== "") {
      // 로그인 통신

      switch (whatUser) {
        case "user": {
          // 유저 로그인
          onLoginButtonHandler({ id: state.id, pw: state.pw }, (result) => {
            if (result) {
              changeUserLoginState(true);
              let userType = localStorage.getItem("userId");
              let userId = localStorage.getItem("userType");
              console.log(
                "유저 로그인 유저 번호 : " + userId + "유저타입:" + userType
              );
              setIsLoginStateState(true);

              nav(`/`);
            } else {
              setEnableDialog(true);
            }
          });
          setIsLoginStateState(false);
          return;
        }
        case "space": {
          onLoginSpaceHandler({ id: state.id, pwd: state.pw }, () => {
            changeUserLoginState(true);
            let userType = localStorage.getItem("userId");
            let userId = localStorage.getItem("userType");
            console.log(
              "유저 로그인 유저 번호 : " + userId + "유저타입:" + userType
            );
            setIsLoginStateState(true);
            nav(`/mainbusiness`);
          });
          setIsLoginStateState(false);
          return;
        }
        case "author": {
          // 작가 로그인
          onLoginAuthorHandler({ id: state.id, pwd: state.pw }, () => {
            changeUserLoginState(true);
            let userType = localStorage.getItem("userId");
            let userId = localStorage.getItem("userType");
            console.log(
              "유저 로그인 유저 번호 : " + userId + "유저타입:" + userType
            );
            setIsLoginStateState(true);
            nav(`/mainbusiness`);
          });
          setIsLoginStateState(false);
          return;
        }
        default: {
          alert("LoginEditor잘못된 접근");
          setIsLoginStateState(false);
          return;
        }
      }
    } else {
    }
  };

  // 회원가입
  // todo 로그인 종류에 따라 다르게 분기해야함
  const registerClick = () => {
    console.log("회원가입 이동" + whatUser);

    if (String(whatUser) === String("user")) nav(`/signupuser`);
    if (String(whatUser) === String("space"))
      nav(`/signupbusiness`, {
        replace: true,
        state: {
          userInfo: whatUser,
        },
      });
    if (String(whatUser) === String("author"))
      nav(`/signupbusiness`, {
        replace: true,
        state: {
          userInfo: whatUser,
        },
      });
  };
  const goFindId = () => {
    const userInfo = whatUser;
    if (String(whatUser) === String("user")) nav(`/findiduser`);
    if (String(whatUser) === String("space"))
      nav(`/findidbusiness`, {
        state: {
          userInfo: whatUser,
        },
      });
    if (String(whatUser) === String("author")) {
      nav(`/findidbusiness`, {
        state: {
          userInfo: whatUser,
        },
      });
    }
  };

  const goFindpwd = () => {
    if (String(whatUser) === String("user")) nav(`/findpwuser`);
    if (String(whatUser) === String("space"))
      nav(`/findpwbusiness`, {
        state: {
          userInfo: whatUser,
        },
      });
    if (String(whatUser) === String("author"))
      nav(`/findpwbusiness`, {
        state: {
          userInfo: whatUser,
        },
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="column" spacing={2}>
          <div>
            <TextField
              name="id"
              id="standard-search"
              label="아이디"
              type="search"
              variant="standard"
              onChange={handleChangeState}
            />
          </div>
          <div>
            <TextField
              name="pw"
              id="standard-password-input"
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handleChangeState}
            />
          </div>
        </Stack>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Button color="inherit" size="medium" onClick={goFindId}>
            아이디 찾기
          </Button>
          <Button color="inherit" size="medium" onClick={goFindpwd}>
            비밀번호 찾기
          </Button>
        </div>
      </Box>
      <div>
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            "& button": { m: 1 },
            width: "100%",
            display: "flex", // flexbox 디스플레이 설정
            justifyContent: "center", // 가로 중앙 정렬
          }}
        >
          <button type="button" class="btn btn-dark" onClick={registerClick}>
            회원가입
          </button>

          <button type="button" class="btn btn-dark" onClick={handleLoginClick}>
            로그인
          </button>
          {enableDialog && (
            <MuiDialog
              title={"알림"}
              content={"아이디/비밀번호 재확인해주세요"}
              result={true}
              page={"login"}
              parentClick={setEnableDialog}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default LoginEditor;
