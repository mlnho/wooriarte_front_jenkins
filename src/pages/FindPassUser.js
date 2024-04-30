import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { onFindUserPwHandler } from "../apis/servicehandeler/ApiHandler"; // api
import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
import Alert from "@mui/material/Alert"; // alert
const FindPassUser = () => {
  const nav = useNavigate();

  // todo 이메일찾기 연결하고 false로 원상복귀하기
  // 이메일 유효한지
  const [isEmailValid, setIsEmailValid] = useState(true);
  // 이메일 인증번호 버튼 제어
  const [enableAuthBtn, setEnableAuthBtn] = useState(true);
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(true);

  // 다음 버튼 눌렀을 때 경고창 => 입력이 잘됐고 안됐고
  const [enableSuccessAlert, setEnableSuccessAlert] = useState(false);
  const [enableFailAlert, setEnableFailAlert] = useState(false);

  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    authnumber: "",
  });
  // id, pw 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setIsEmailValid(validateEmail(e.target.value));
    }
  };
  // todo(인증번호 보내기 api)
  const sendAuthNumber = () => {
    console.log("인증번호 보내기");
    setEnableAuthBtn(true); // 이메일 인증 활성화
  };
  // todo 인증번호 확인 api
  const certifyAuthNumber = () => {
    console.log("인증번호 확인");
    // 사업자 번호 입력이 정상 적으로 됐으면
    if (false) {
      // todo 메일인증 번호
      setEnableNextBtn(true);
    } else {
      // 인증번호 확인 됐을 때 다음 버튼 활성화
      console.log("인증번호비활성화");
      // 인증번호 활성화 안됐을 때
      setEnableFailAlert(true);
      setTimeout(() => {
        setEnableFailAlert(false);
      }, 2000);
    }
  };
  // 비번 찾기 버튼 눌림
  const nextPage = () => {
    alert("비밀번호 찾기");
    onFindUserPwHandler(
      { userId: state.id, userName: state.name, email: state.email },
      () => {
        // 성공시 콜백
        setEnableSuccessAlert(true);
        setTimeout(() => {
          setEnableSuccessAlert(false);
          console.log("유저비번 successful, navigating back");
          nav(`/loginuser`);
        }, 2000); // 성공시 alert뜨기
      }
    );
  };

  return (
    <>
      {enableSuccessAlert && (
        <Alert severity="success">This is a success Alert.</Alert>
      )}
      {enableFailAlert && (
        <Alert severity="error"> 인증번호가 틀렸습니다.</Alert>
      )}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <span>비밀번호 찾기</span>

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
            name="name"
            id="standard-search"
            label="이름"
            type="search"
            variant="standard"
            onChange={handleChangeState}
          />
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <TextField
              name="email"
              id="standard-search"
              label="이메일"
              type="search"
              variant="standard"
              onChange={handleChangeState}
            />

            <button
              type="button"
              class="btn btn-dark"
              onClick={sendAuthNumber}
              disabled={!isEmailValid}
            >
              전송
            </button>
          </Stack>
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <TextField
              name="authnumber"
              id="standard-number"
              label="인증번호 "
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChangeState}
            />

            <button
              type="button"
              class="btn btn-success"
              onClick={certifyAuthNumber}
              disabled={!enableAuthBtn}
            >
              확인
            </button>
          </Stack>
        </div>
        <button
          type="button"
          class="btn btn-dark"
          onClick={nextPage}
          disabled={!enableNextBtn}
        >
          다음
        </button>
      </Box>
    </>
  );
};
export default FindPassUser;
