import { useEffect, useState } from "react";

import EditText from "../components/EditText";
import { useNavigate, useSearchParams } from "react-router-dom";
// api
import { onSignupUserHandler } from "../apis/servicehandeler/ApiHandler";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
// 배지
import Badge from "@mui/material/Badge";
// 레이아웃
import Box from "@mui/material/Box";

// 다이어로그
import MuiDialog from "../libs/MuiDialog";

// 회원가입 완료
// todo("회원가입 통신 연결해야함 ")
// todo("개인 사업자 버튼 이벤트 넣기 ")

const SignupUser = () => {
  const nav = useNavigate();

  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);
  const [enableDialog, setEnableDialog] = useState(false);

  const submitsignup = () => {
    if (state.id !== "" && state.pw !== "") {
      // 회원가입 통신
      onSignupUserHandler(
        {
          userName: state.name,
          id: state.id,
          phoneNum: state.phoneNumber,
          email: state.email,
          pass: state.password,
          authPass: state.authPassword,
        },
        (success) => {
          console.log("callback 안 ");
          if (!success) {
            console.log("callback 실패 안 ");
            setEnableDialog(true);
          } else {
            console.log("callback 성공 안 ");
            // 성공시 콜백
            console.log("Signup successful, navigating back");
            nav(-1); // 로그인 페이지로 가기
          }
        }
      );
    }
  };

  const [state, setState] = useState({
    name: "",
    id: "",
    phoneNumber: "",
    email: "",
    password: "",
    authPassword: "",
  });

  useEffect(() => {
    if (state.password.length > 3 && state.authPassword === state.password) {
      console.log("비번일치");
      if (
        state.id !== "" &&
        state.name !== "" &&
        state.email !== "" &&
        state.phoneNumber.length > 8
      ) {
        console.log("빈값없음");
        if (validateEmail(state.email)) {
          console.log("이메일일치");
          setEnableNextBtn(true); // 다음 버튼 활성화
        } else {
          console.log("이메일불일치");
          setEnableNextBtn(false); // 다음 버튼 비활성화
        }
      } else {
        setEnableNextBtn(false); // 다음 버튼 비활성화
      }
    } else {
      console.log("비번불일치");
      setEnableNextBtn(false); // 다음 버튼 비활성화
    }
  }, [state]); // state 객체의 모든 변경에 반응

  // id, pw 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 2,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        <h1>Signup</h1>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 2,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        <Stack spacing={2}>
          <div>
            <Stack spacing={2} direction="row" style={{ marginLeft: 20 }}>
              <Badge color="info" badgeContent=" " variant="dot">
                <Button color="info" size="large">
                  개인
                </Button>
              </Badge>
              <Button
                color="inherit"
                size="large"
                onClick={() => {
                  console.log("비즈니스 로그인으로이동");
                  nav(`/loginbusiness`);
                }}
              >
                사업자
              </Button>
            </Stack>
          </div>
          <div>
            <TextField
              name="name"
              id="standard-search-name"
              label="이름"
              type="search"
              variant="standard"
              onChange={handleChangeState}
              style={{ marginLeft: 10 }}
            />
          </div>
          <div>
            <TextField
              name="id"
              id="standard-search-id"
              label="아이디"
              type="search"
              variant="standard"
              onChange={handleChangeState}
              style={{ marginLeft: 10 }}
            />
          </div>
          <div>
            <TextField
              name="phoneNumber"
              id="standard-number"
              label="전화번호"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChangeState}
              style={{ marginLeft: 10 }}
            />
          </div>
          <div>
            <TextField
              name="email"
              id="standard-search-email"
              label="이메일"
              type="search"
              variant="standard"
              onChange={handleChangeState}
              style={{ marginLeft: 10 }}
            />
          </div>
          <div>
            <TextField
              name="password"
              id="standard-search-Password"
              label="비밀번호"
              type="password"
              variant="standard"
              onChange={handleChangeState}
              style={{ marginLeft: 10 }}
            />
          </div>
          <div>
            <TextField
              name="authPassword"
              id="standard-search-authPassword"
              label="비밀번호확인"
              type="password"
              variant="standard"
              onChange={handleChangeState}
              style={{ marginLeft: 10 }}
            />
          </div>
          <button
            type="button"
            class="btn btn-success"
            onClick={submitsignup}
            disabled={!enableNextBtn}
            style={{ marginLeft: 7, marginBottom: 30, marginTop: 40 }}
          >
            확인
          </button>
        </Stack>
        {enableDialog && (
          <MuiDialog
            title={"알림"}
            content={"이미 가입 된 회원입니다!"}
            result={true}
            page={"userSignUp"}
          />
        )}
      </Box>
    </>
  );
};

export default SignupUser;
