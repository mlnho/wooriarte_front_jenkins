import { useNavigate, useLocation } from "react-router-dom";
import LoginSpan from "../components/LoginSpan";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonBoot from "react-bootstrap/Button";

import Box from "@mui/material/Box";
// 배지
import Badge from "@mui/material/Badge";

// 사업자 로그인페이지 => 사업자버튼 글자 볼드 처리
const LoginBusiness = () => {
  const nav = useNavigate();

  // 유저 로그인으로 가기
  const goUserLogin = () => {
    nav(`/loginuser`, { replace: true });
  };

  // 사업자 로그인으로 가기= 작가 로그인으로 가기
  const goBusinessLogin = () => {
    nav(`/loginauthor`, { replace: true });
  };

  // 임대 사업자 로그인으로 가기
  const goSpaceLogin = () => {
    nav(`/loginspace`, { replace: true });
  };
  return (
    <>
      <div>
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 5,
            width: "100%", // 박스 너비 설정
            display: "flex", // flexbox 디스플레이 설정
            justifyContent: "center", // 가로 중앙 정렬
          }}
        >
          <LoginSpan />
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
            <Stack spacing={2} direction="row" style={{ marginLeft: 2 }}>
              <Button color="inherit" size="large" onClick={goUserLogin}>
                개인
              </Button>
              <Badge color="info" badgeContent=" " variant="dot">
                <Button color="info" size="large" onClick={goBusinessLogin}>
                  사업자
                </Button>
              </Badge>
            </Stack>

            <div>
              <Stack
                spacing={4}
                style={{ marginTop: 20, marginLeft: 5, marginBottom: 80 }}
              >
                <ButtonBoot
                  variant="outline-dark"
                  onClick={goBusinessLogin}
                  size="lg"
                >
                  작가
                </ButtonBoot>
                <ButtonBoot
                  variant="outline-dark"
                  onClick={goSpaceLogin}
                  size="lg"
                >
                  임대 사업자
                </ButtonBoot>
              </Stack>
            </div>
          </Stack>
        </Box>
      </div>
    </>
  );
};
export default LoginBusiness;
