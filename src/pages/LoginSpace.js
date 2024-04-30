import Button from "@mui/material/Button";
import LoginEditor from "../components/LoginEditor";
import { useNavigate } from "react-router-dom";
import LoginSpan from "../components/LoginSpan";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// 배지
import Badge from "@mui/material/Badge";
// 공간대여자 로그인 페이지 => 비밀번호 찾기때문에 나눔

const LoginSpace = () => {
  const nav = useNavigate();
  const goAuthorLogin = () => {
    nav(`/loginauthor`, { replace: true });
  };
  return (
    <>
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
          <Stack spacing={2} direction="row">
            <Button color="inherit" size="large" onClick={goAuthorLogin}>
              작가
            </Button>
            <Badge color="info" badgeContent=" " variant="dot">
              <Button
                color="info"
                size="large"
                onClick={() => {
                  console.log("비즈니스 로그인으로이동");
                  nav(`/loginbusiness`);
                }}
              >
                임대사업자
              </Button>
            </Badge>
          </Stack>
        </Box>
      </div>
      {/* 로그인 폼 */}
      <LoginEditor whatUser={"space"} />
    </>
  );
};
export default LoginSpace;
