import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";
// 체크박스
import Checkbox from "@mui/material/Checkbox";
import { red } from "@mui/material/colors";
import * as React from "react";

// css
import "../../styles/Withdrawal.css";

// api
import { onDeleteUserHandler } from "../../apis/servicehandeler/ApiHandler";
import { onDeleteAuthorHandler } from "../../apis/servicehandeler/AuthorApiHandler";
import { onDeleteSpaceHandler } from "../../apis/servicehandeler/SpaceApiHandler";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MuiDialog from "../../libs/MuiDialog";

import { loginContext } from "../../App";

const WithDrawalUser = () => {
  const nav = useNavigate();
  // 회원탈퇴 버튼 활성화
  const [enableBtn, setEnableBtn] = useState(false);
  // 체크 상태
  const [checked, setChecked] = useState(false);
  const changeUserLoginState = React.useContext(loginContext);
  const [enableDialog, setEnableDialog] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // 동의 한 후 탈퇴 가능하게
  useEffect(() => {
    if (checked) setEnableBtn(true);
    else setEnableBtn(false);
  }, [checked]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // 탈퇴하기 클릭 리스너
  const widthDrawalHandler = () => {
    let userType = localStorage.getItem("userType");
    let id = localStorage.getItem("userId");
    if (userType === "user") {
      onDeleteUserHandler({ userId: id }, () => {
        console.log("탈퇴눌림");
        // 성공시 콜백

        console.log("유저탈퇴 successful, navigating back");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        changeUserLoginState(false);
        setEnableDialog(true);
      });
    } else if (userType === "author") {
      // todo 선언하기
      onDeleteAuthorHandler({ id }, () => {
        console.log("작가 탈퇴 눌림");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        changeUserLoginState(false);
        setEnableDialog(true);
      });
    } else if (userType === "space") {
      onDeleteSpaceHandler({ id }, () => {
        console.log("공간대여자 탈퇴 눌림");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        changeUserLoginState(false);
        setEnableDialog(true);
      });
    } else {
      console.log("회원 탈퇴 잘못된 접근 ");
    }
  };

  return (
    <div className="withdrawalContainer">
      <h2 style={{ marginBottom: 15 }}> 회원탈퇴</h2>
      <div className="content">
        <span>
          아이디 <span class="highlight">재사용</span>및{" "}
          <span class="highlight">복구 불가</span>
        </span>
      </div>
      <div />
      <span>
        사용하고 계신 아이디를 탈퇴하기면 본인과 타인 모두 재사용 및 복구가
        불가하오니 신중하게 선택하시길 바랍니다.
      </span>
      <Stack
        spacing={2}
        direction="row"
        style={{ alignItems: "center", marginBottom: 20, marginTop: 10 }}
      >
        <Checkbox
          {...label}
          onChange={handleChange}
          sx={{
            color: red[800],
            "&.Mui-checked": {
              color: red[600],
            },
          }}
        />
        <span>위 내용을 모두 확인했으며, 이에 동의합니다.</span>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button
          variant="outline-danger"
          disabled={!enableBtn}
          onClick={widthDrawalHandler}
        >
          탈퇴하기
        </Button>{" "}
      </Stack>
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"탈퇴 되었습니다."}
          result={true}
          page={"goUserMain"}
        />
      )}
    </div>
  );
};
export default WithDrawalUser;
