import Form from "react-bootstrap/Form";
import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";

import BootModalForAdmin from "../../libs/BootModalForAdmin";
import { useState } from "react";
import { useEffect } from "react";

// 어이콘
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import IconButton from "@mui/material/IconButton";

// api
import { onUpdateMatchingForAdminHandler } from "../../apis/servicehandeler/AdminApiHandler";
import { useNavigate } from "react-router-dom";

//?--- matchingId: 관리자가 매칭 상태 수정 및 생성 시 쓰임
const AdminMatchingItem = ({
  text,
  matchingId,
  setUpdateCount,
  status,
  id,
  userType,
}) => {
  const [modalShow, setModalShow] = useState(false); // 드랍다운 숫자 저장

  const [selectedStatus, setSelectedStatus] = useState(status); // 선택된 상태를 저장하기 위한 state

  const nav = useNavigate();

  // 드롭다운에서 선택된 값을 state에 저장
  const handleSelectChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  // 매칭 상태 변경 api
  const updateState = (matchingId) => {
    onUpdateMatchingForAdminHandler(
      { matchingId, matchingStatus: selectedStatus },
      () => {
        console.log("매칭 상태 변경 callback");
        setUpdateCount((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);

  // 전시 생성하기 -> 모달 나옴
  const addExhibit = () => {
    // myposterForBusiness. js 참고
    setModalShow(true);
  };

  const goItemInfo = (id) => {
    if (userType === "author") {
      nav(`/businessiteminfo/${id}`, {
        state: { userType: "space", posterId: id },
      });
    } else {
      nav(`/businessiteminfo/${id}`, {
        state: { userType: "author", posterId: id },
      });
    }
  };

  return (
    <>
      <Stack spacing={1} direction="row">
        <>{text}</>
        <div />
        <Form.Select
          aria-label="Default select example"
          value={selectedStatus}
          onChange={handleSelectChange}
          style={{ width: "auto" }}
        >
          <option value="0">현재 상태</option>
          <option value="REQUESTWAITING">매칭수락대기중 </option>
          <option value="CANCEL">매칭취소</option>
          <option value="FINISH">매칭완료</option>
          <option value="WAITING">전시준비대기중</option>
          <option value="PREPARING">전시준비중</option>
        </Form.Select>
        <Button variant="primary" onClick={() => updateState(matchingId)}>
          상태 변경
        </Button>{" "}
        <Button variant="outline-dark" onClick={() => addExhibit()}>
          전시생성
        </Button>{" "}
        <IconButton
          color="inherit"
          aria-label="add an alarm"
          style={{ marginLeft: 30 }}
          onClick={() => goItemInfo(id)}
        >
          <ContentPasteSearchIcon />
        </IconButton>
      </Stack>
      <BootModalForAdmin
        show={modalShow}
        onHide={() => setModalShow(false)}
        type={"create"}
        id={matchingId}
      />
    </>
  );
};

export default AdminMatchingItem;
