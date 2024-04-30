import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

import Matching from "../../components/business/Matching";
import ModifySpaceInfo from "../mypage/ModifySpaceInfo";

// 공간 보이기
import { useContext } from "react";
import image1 from "../../assets/image 1.png";
import BusinessItemList from "../../components/business/BusinessItemList";
import WithDrawalUser from "../../components/user/Withdrawal";

import { loginContext } from "../../App";

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

const SpaceMyPage = () => {
  const [value, setValue] = React.useState(0);

  const setIsLoginStateState = useContext(loginContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let mockData2 = [];
  // 메인별 목데이터

  mockData2 = [
    {
      id: 1,
      postName: "전시1",
      location: "서울시 마포구",
      imageurl: image1,
      createdDate: new Date("2024-04-19").getTime(),
    },
    {
      id: 2,
      postName: "전시2",
      location: "서울시 마포구",
      imageurl: image1,
      createdDate: new Date("2024-04-19").getTime(),
    },
    {
      id: 3,
      postName: "전시3",
      location: "서울시 마포구",
      imageurl: image1,
      createdDate: new Date("2024-04-19").getTime(),
    },
  ];

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
          {/* <Stack
            justifyContent="center" // 가로 방향으로 중앙 정렬
            alignItems="center" // 세로 방향으로 중앙 정렬
            style={{ height: "100vh" }}
          >
            <ImageList
              sx={{ maxWidth: 1000, height: 500, overflowY: "hidden" }}
              cols={3}
            >
              {mockData2.map((item) => {
                return (
                  <PosterForMain
                    key={item.id}
                    {...item}
                    date={item.createdDate}
                    whatType={"space"}
                  />
                );
              })}
            </ImageList>
          </Stack> */}

          <BusinessItemList whatType={"space"} />

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
          <ModifySpaceInfo />
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
export default SpaceMyPage;
