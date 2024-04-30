import EditText from "../components/EditText";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import "../styles/ModifyUserInfo.css";

import MuiDialog from "../libs/MuiDialog";
import { validateEmail } from "../util/GlobalFunc"; // 이메일 형식
import {
  onConfirmUserPwHandler,
  onGetUserInfoHandler,
  onUpdateUserInfoHandler,
} from "../apis/servicehandeler/ApiHandler"; // api
import { string } from "prop-types";

const ModifyUserInfo = () => {
  // 비밀번호 입력 후 개인정보 수정 들어간건지
  const [authState, setAuthState] = useState(false);
  // 저장 버튼 활성화
  const [saveState, setSaveState] = useState(false);
  const [enableDialog, setEnableDialog] = useState(false); //  다이어로그

  const setAuthStateChange = () => {
    let id = localStorage.getItem("userId");
    // 비밀번호 확인 api
    onConfirmUserPwHandler(
      { userId: id, password: passwordState },
      (responseStatus) => {
        console.log("비번확인 눌림");
        if (responseStatus) {
          // 성공시 콜백
          console.log("유저 비번확인 successful, navigating back");
          setAuthState(true);
          setEnableDialog(false);
        } else {
          setEnableDialog(true);
          setAuthState(false);
        }
      }
    );
  };
  // 비밀번호 입력
  const [passwordState, setPasswordState] = useState("");

  const handlePasswordChangeState = (e) => {
    setPasswordState(e.target.value);
  };

  const [infostate, setInfoState] = useState({
    name: "",
    id: "",
    phoneNumber: "",
    email: "",
    password: "",
    authPassword: "",
  });
  useEffect(() => {
    if (authState) {
      let userId = localStorage.getItem("userId");

      // todo 사용자 정보 업데이트 함수 호출
      onGetUserInfoHandler({ userId }, (response) => {
        console.log("응답값 받음");
        setInfoState((prevState) => ({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phoneNumber: response.data.phone,
          password: " ",
          authPassword: " ",
        }));
      });
    }
  }, [authState]); // authState 변화에 따라 실행

  useEffect(() => {
    // 입력값이 모두 있어야함. 유효한 email이여야 가입 가능
    if (
      infostate.password.length > 4 &&
      infostate.authPassword.length > 4 &&
      validateEmail(infostate.email) &&
      infostate.name.length > 1 &&
      infostate.id.length > 3 &&
      infostate.phoneNumber.length > 8 &&
      String(infostate.authPassword) === String(infostate.password)
    ) {
      setSaveState(true); // 저장 버튼 눌리게
    } else {
      setSaveState(false);
    }
  }, [infostate]);

  const handleChangeState = (e) => {
    setInfoState({
      ...infostate,
      [e.target.name]: e.target.value,
    });
  };

  const saveUserInfo = () => {
    // todo rest api 통신 후 저장이 되면 alert 띄우기
    let id = localStorage.getItem("userId");
    onUpdateUserInfoHandler(
      {
        userId: id,
        id: infostate.id,
        pwd: infostate.password,
        name: infostate.name,
        email: infostate.email,
        phone: infostate.phoneNumber,
      },
      () => {
        console.log("유저 정보 수정");

        console.log("유저 정보 수정 successful, navigating back");
        setAuthState(false); // 비밀번호 창으로
      }
    );
  };

  return (
    <div className="userInfoContainer">
      {authState === true && (
        <div>
          <h2>회원 정보 수정</h2>
          <div>
            <TextField
              name="name"
              id="standard-search-name"
              label="이름"
              type="search"
              variant="standard"
              onChange={handleChangeState}
              value={infostate.name} // 상태와 입력 필드 연결
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
              value={infostate.id} // 상태와 입력 필드 연결
            />
          </div>
          <div>
            <TextField
              name="phoneNumber"
              id="standard-number"
              label="연락처"
              type="search"
              variant="standard"
              onChange={handleChangeState}
              value={infostate.phoneNumber}
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
              value={infostate.email}
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
            />
          </div>

          <button
            type="button"
            class="btn btn-dark"
            onClick={saveUserInfo}
            style={{ marginTop: 15 }}
            disabled={!saveState}
          >
            저장
          </button>
        </div>
      )}
      {authState === false && (
        <div>
          <Stack spacing={2} direction="row">
            <TextField
              name="pw"
              id="standard-password-input"
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handlePasswordChangeState}
            />

            <button
              type="button"
              class="btn btn-dark"
              onClick={setAuthStateChange}
            >
              확인
            </button>
          </Stack>
        </div>
      )}
      {enableDialog && (
        <MuiDialog
          title={"알림"}
          content={"비밀번호가 틀렸습니다. 다시 입력해주세요"}
          result={true}
          page={"login"}
          parentClick={setEnableDialog}
        />
      )}
    </div>
  );
};
export default ModifyUserInfo;
