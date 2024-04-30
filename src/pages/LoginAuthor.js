import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";

import LoginEditor from "../components/LoginEditor";
import LoginSpan from "../components/LoginSpan";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// 배지
import Badge from "@mui/material/Badge";
// 작가 로그인 페이지 => 비밀번호 찾기때문에 나눔
const LoginAuthor = () => {
  const nav = useNavigate();

  // 임대사업자 로그인으록 가기
  const goSpaceLogin = () => {
    nav(`/loginspace`, { replace: true });
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
              작가
            </Button>
          </Badge>

          <Button color="inherit" size="large" onClick={goSpaceLogin}>
            임대사업자
          </Button>
        </Stack>
      </Box>
      <LoginEditor whatUser={"author"} />
    </>
  );
};
export default LoginAuthor;
