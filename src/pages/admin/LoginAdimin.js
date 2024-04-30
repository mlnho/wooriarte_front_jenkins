import { useNavigate } from "react-router-dom";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useState } from "react";

const LoginAdmin = () => {
  const nav = useNavigate();

  const handleLoginClick = () => {
    // todo 관리자 api 연결하기
    nav(`/mainadmin`);
  };

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
        <Stack
          direction="column"
          spacing={2}
          style={{ marginTop: 100, marginBottom: 260 }}
        >
          <span>AdminLogin </span>
          <TextField
            name="id"
            id="standard-search"
            label="아이디"
            type="search"
            variant="standard"
            onChange={handleChangeState}
          />

          <TextField
            name="pw"
            id="standard-password-input"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={handleChangeState}
          />

          <button type="button" class="btn btn-dark" onClick={handleLoginClick}>
            로그인
          </button>
        </Stack>
      </Box>
    </>
  );
};

export default LoginAdmin;
