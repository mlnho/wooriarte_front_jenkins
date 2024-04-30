import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import BusinessInfo from "../components/BusinessInfo";

// 배지
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

// 다이어로그
import MuiDialog from "../libs/MuiDialog";
const Signupbusiness = () => {
  // whatuser
  const uselocation = useLocation();
  const { userInfo } = uselocation.state; // LoginEditor에서 옴
  const [enableDialog, setEnableDialog] = useState(false);

  const nav = useNavigate();

  const goUserSignup = () => {
    nav(`/signupuser`, { replace: true });
  };
  const goBusinessSignup = () => {
    // whatUser에 따라 회원가입 다르게 해야함
    alert("회원가입 누구? " + userInfo);
    console.log("회원가입 누구? " + userInfo);
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 2,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        <div>
          <h1 style={{ marginLeft: 23 }}>Signup</h1>
          <Stack spacing={2} direction="row" style={{ marginTop: 30 }}>
            <Button color="inherit" size="large" onClick={goUserSignup}>
              개인
            </Button>
            <Badge color="info" badgeContent=" " variant="dot">
              <Button color="info" size="large" onClick={goBusinessSignup}>
                사업자
              </Button>
            </Badge>
          </Stack>
        </div>
      </Box>
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          width: "100%", // 박스 너비 설정
          display: "flex", // flexbox 디스플레이 설정
          justifyContent: "center", // 가로 중앙 정렬
        }}
      >
        {/* 회원가입양식 */}
        <BusinessInfo
          isBusinessInfo={false}
          whatUser={userInfo}
          setDialog={setEnableDialog}
        />

        {enableDialog && (
          <MuiDialog
            title={"알림"}
            content={"이미 가입 된 회원입니다!"}
            result={true}
            page={userInfo === "author" ? "authorLogin" : "spaceLogin"}
          />
        )}
      </Box>
    </div>
  );
};
export default Signupbusiness;
