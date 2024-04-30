import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Exhibits from "../../components/Exhibits";

import ModifyAuthorInfo from "../../pages/mypage/ModifyAuthorInfo";
import Matching from "../../components/business/Matching";
// import MyPosterForBusiness from "../../components/business/MyPosterForBusiness";
import WithDrawalUser from "../../components/user/Withdrawal";
import { Business } from "@mui/icons-material";
import BusinessItem from "../../components/business/BusinessItem";
import BusinessItemList from "../../components/business/BusinessItemList";

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

const AuthorMyPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab label="회원정보 수정" {...a11yProps(0)} />
          <Tab label="아이템 관리" {...a11yProps(1)} />
          <Tab label="매칭 신청 현황" {...a11yProps(2)} />
          <Tab label="회원탈퇴" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={1}>
          {/*todo 사업자용 만들기 아이템관리  */}
          <h2>아이템 정보</h2>
          {/* <MyPosterForBusiness whatType={"author"} /> */}
          <BusinessItemList whatType={"author"} />

          {/* 개인정보 수정 */}
        </TabPanel>
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
          <ModifyAuthorInfo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Matching />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <WithDrawalUser />
        </TabPanel>
      </Box>
    </div>
  );
};
export default AuthorMyPage;
