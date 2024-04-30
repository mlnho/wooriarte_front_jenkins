import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import TicketHistory from "./TicketHistory";
import ModifyUserInfo from "./ModifyUserInfo";
import "../styles/MypageUser.css";
import { onDeleteUserHandler } from "../apis/servicehandeler/ApiHandler"; // api
import { useNavigate } from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WithDrawalUser from "../components/user/Withdrawal";

// 탭관련함수
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MypageUser = () => {
  const [componentState, setState] = useState("modify");
  const nav = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // id, pw 입력이 달라지면 상태 감지
  const handleChangeState = (value) => {
    console.log(value);
    // console.log(e.target.value);
    setState(value);
  };

  const withDrawalUser = () => {
    console.log("유저 탈퇴하기 눌림");
    const id = localStorage.getItem("userId");
    onDeleteUserHandler({ id }, () => {
      // 성공시 콜백
      // todo 확인필요
      console.log("탈퇴 successful, navigating back");
      nav(`/mainuser`);
    });
  };

  // 세로 탭
  const [widthValue, setWidthValue] = React.useState(0);

  const widthHandleChange = (event, newValue) => {
    setWidthValue(newValue);
  };

  return (
    <div
      className="parentContainer"
      style={{
        width: "100%",
        marginBottom: 40,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            width: "150px", // Tabs 너비 고정
            minWidth: "150px", // 최소 너비 설정
          }}
        >
          <Tab label="개인정보수정" {...a11yProps(0)} />
          <Tab label="예매내역 " {...a11yProps(1)} />
          <Tab label="탈퇴하기" {...a11yProps(2)} />
        </Tabs>
        {/* 개인정보수정 */}
        <TabPanel
          value={value}
          index={0}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 180,
            marginTop: 10,
            height: "100%", // 필요한 높이 지정
            width: "100%", // 필요한 너비 지정
          }}
        >
          <ModifyUserInfo />
        </TabPanel>
        {/* 예매내역 */}
        <TabPanel value={value} index={1}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs
              value={widthValue}
              onChange={widthHandleChange}
              centered
              style={{ marginBottom: 14 }}
            >
              <Tab label="관람예정" />
              <Tab label="관람완료" />
            </Tabs>

            <TicketHistory whatTab={widthValue} />
          </Box>
        </TabPanel>
        {/* 탈퇴하기 */}
        <TabPanel value={value} index={2}>
          <WithDrawalUser />
        </TabPanel>
      </Box>
    </div>
  );
};
export default MypageUser;
