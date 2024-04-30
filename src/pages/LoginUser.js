import LoginEditor from "../components/LoginEditor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../App";
import LoginSpan from "../components/LoginSpan";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// 배지
import Badge from "@mui/material/Badge";

const LoginUser = () => {
  const nav = useNavigate();
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
          <Stack spacing={2} direction="row">
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
        </Box>
      </div>
      {/* 로그인 폼 */}
      <LoginEditor whatUser={"user"} />
    </>
  );
};
export default LoginUser;
