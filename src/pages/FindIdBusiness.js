import { useState } from "react";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import EditText from "../components/EditText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert"; // alert

import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식

//api
import { onFindAuthorIdHandler } from "../apis/servicehandeler/AuthorApiHandler";
import { onFindSpaceIdHandler } from "../apis/servicehandeler/SpaceApiHandler";
const FindIdBusiness = () => {
  const uselocation = useLocation();
  const { userInfo } = uselocation.state;
  const nav = useNavigate();

  // 이메일 전송 버튼 제어 => 이메일 정규식에 따라 활성화
  const [isEmailValid, setIsEmailValid] = useState(true);
  // 이메일 인증번호 버튼 제어
  const [enableAuthBtn, setEnableAuthBtn] = useState(true);
  // 다음 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(true);

  // 인증번호 버튼 눌렀을 때 경고창 => 인증번호 틀리고 안틀리고
  const [enableSuccessAlert, setEnableSuccessAlert] = useState(false);
  const [enableFailAlert, setEnableFailAlert] = useState(false);

  const [state, setState] = useState({
    businessNumber: "",
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
  // todo(인증번호 연결 )
  const sendAuthNumber = () => {
    console.log("인증번호 보내기");
    setEnableAuthBtn(true); // 이메일 인증 활성화
  };
  const certifyAuthNumber = () => {
    console.log("인증번호 확인");
    // todo 통신되면 아래는 실패시 alert
    console.log("인증번호비활성화");
    // 인증번호 활성화 안됐을 때
    setEnableFailAlert(true);
    setTimeout(() => {
      setEnableFailAlert(false);
    }, 2000);
    // todo 통신됐을때
    setEnableNextBtn(true); // 인증번호 확인 됐을 때 다음 버튼 활성화
  };

  // 아이디 찾기 api
  const nextPage = () => {
    alert("아이디 표시");

    if (userInfo === "author") {
      onFindAuthorIdHandler({ email: state.email }, (response) => {});
    } else if (userInfo === "space") {
      onFindSpaceIdHandler({ email: state.email }, (response) => {});
    } else {
    }

    // todo userInfo에 author 인지 space인지
    console.log("아이디찾기 : " + userInfo);
    nav(-1);
  };

  return (
    <>
      {enableFailAlert && (
        <Alert severity="error"> 인증번호가 틀렸습니다.</Alert>
      )}
      <Box
        component="form"
        sx={{
          display: "flex", // 사용 flexbox 레이아웃
          flexDirection: "column", // 요소들을 세로로 정렬
          alignItems: "center", // 가로 방향으로 가운데 정렬
          "& .MuiTextField-root": { m: 1, width: "25ch" }, // 각 텍스트 필드 스타일 지정
        }}
        noValidate
        autoComplete="off"
      >
        <h2 style={{ marginBottom: 20, marginTop: 30 }}>아이디 찾기</h2>
        <TextField
          name="businessNumber"
          id="standard-number"
          label="사업자번호 "
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={handleChangeState}
        />

        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{
              marginLeft: 63,
              marginTop: 10, // 위 여백 추가
              marginBottom: 10, // 아래 여백 추가
              alignItems: "center", // 요소들의 높이를 각 요소에 맞춤
            }}
          >
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
              style={{ padding: 7 }}
            >
              전송
            </button>
          </Stack>
        </div>
        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{
              marginLeft: 63,
              marginTop: 10, // 위 여백 추가
              marginBottom: 10, // 아래 여백 추가
              alignItems: "center", // 요소들의 높이를 각 요소에 맞춤
            }}
          >
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
              style={{ padding: 7 }}
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
          style={{ marginTop: 50, marginBottom: 70 }}
        >
          다음
        </button>
      </Box>
    </>
  );
};
export default FindIdBusiness;
