// 사업자 메인
import * as React from "react";

import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Exhibits from "../../components/Exhibits";
import "../../styles/MainBusiness.css";
import DatePickerOpenTo, { SelectSizesExample } from "../../libs/Open";

// img
import noResult from "../../assets/noResult.png";

// 레이아웃
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// 전시 보이기
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

// 아이콘 클릭
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import ButtonBoot from "react-bootstrap/Button";

// 배지
import Badge from "@mui/material/Badge";
import { useEffect } from "react";

//api
import {
  onGetAllSpaceItemHandler,
  onGetSpaceItemInfoHandler,
  onGetSearchSpaceProjectHandler,
} from "../../apis/servicehandeler/SpaceApiHandler";
import {
  onAllAuthorProjectHandler,
  onGetAuthorItemInfoHandler,
  onGetSearchAuthorProjectHandler,
} from "../../apis/servicehandeler/AuthorApiHandler";
import { useNavigate } from "react-router-dom";
import { DataSaverOnTwoTone } from "@mui/icons-material";

const MainBusiness = () => {
  const [projectButtonType, setProjectButtonType] = useState("bold");
  const [spaceButtonType, setSpaceButtonType] = useState("thin");
  const [exhibitsType, setExhibitsType] = useState("author");
  const [data, setData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const [enableDialog, setEnableDialog] = useState(false); // 검색결과가 없을때 띄울이미자
  // todo 달력에 디폴트값 널기
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");

  //?-------------------------달력
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    // startDate.format("YYYY-MM-DD")
    console.log("시작월" + startDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    console.log("끝월" + endDate);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    console.log("위치" + address);
  };

  //!------------------------검색
  // 검색 버튼 눌러서 조회 api
  const goSearch = (exhibitsType) => {
    if (exhibitsType == "author") {
      // todo s3
      onGetSearchAuthorProjectHandler(
        { startDate, endDate, city: address },
        (response) => {
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else {
            const emptyList = [];

            setData(emptyList);
            console.error("응답 데이터가 배열이 아닙니다.");
          }
        }
      );
    } else if (exhibitsType == "space") {
      // todo s3
      onGetSearchSpaceProjectHandler(
        { startDate, endDate, city: address },
        (response) => {
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else {
            const emptyList = [];

            setData(emptyList);
            console.error("응답 데이터가 배열이 아닙니다.");
          }
        }
      );
    } else {
      console.log("비즈니스 메인 아이템 조회 잘못된 접근");
    }
  };
  // const [month, setMonth] = useState({
  //   startCalendar : false,
  //   endCalendar : false,
  // });
  // // 시작 월 클릭눌렸을때
  // const selectStartMonth = () => {
  //   setCalendarPresence({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });

  // };
  // // 끝월 클릭눌렸을때
  // const selectEndMonth = () => {};

  // 프로젝트 눌렸을때
  const getProjectItems = () => {
    setSpaceButtonType("thin");
    setProjectButtonType("bold");
    setExhibitsType("author");
  };

  // 공간 눌렸을 때
  const getSpaceItems = () => {
    setSpaceButtonType("bold");
    setProjectButtonType("thin"); // 프로젝트 버튼을 thin으로 설정, 필요에 따라 조정
    setExhibitsType("space");
  };

  const images = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      author: "@nolanissac",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      author: "@hjrc33",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      author: "@tjdragotta",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      author: "@katie_wasserman",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      author: "@silverdalex",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      author: "@peterlaster",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
    },
  ];

  const nav = useNavigate();

  useEffect(() => {
    if (exhibitsType == "author") {
      // todo s3
      onAllAuthorProjectHandler((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else if (exhibitsType == "space") {
      // todo s3
      onGetAllSpaceItemHandler((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      });
    } else {
      console.log("비즈니스 메인 아이템 조회 잘못된 접근");
    }
  }, [exhibitsType]); // businessInfoState 객체의 모든 변경에 반응

  // 조회 결과 없음 표시 => 작가 프로젝트 눌렀을 때
  useEffect(() => {
    if (data.length > 0) {
      setEnableDialog(false);
    } else {
      setEnableDialog(true);
    }
  }, [data]);

  const getItemInfo = ({ id, exhibitsType }) => {
    const whatUser = localStorage.getItem("userType");
    nav(`/businessiteminfo/${id}`, {
      state: { userType: whatUser, posterId: id, exhibitsType },
    });
  };

  return (
    <div className="MainBusiness">
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="80%"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" }, // 각 텍스트 필드의 마진과 너비 설정
              width: "80%", // 박스 너비를 50%로 설정하여 더 작게 만듦
              display: "flex", // flexbox 디스플레이 설정
              justifyContent: "center", // 가로 중앙 정렬
              flexDirection: "column", // 요소들을 세로 방향으로 배열
              alignItems: "center", // 요소들을 가로 중앙에 위치시킴
              marginTop: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2} direction="row" style={{ marginBottom: 15 }}>
              {exhibitsType === "author" ? (
                <Badge color="info" badgeContent=" " variant="dot">
                  <Button color="info" size="large" onClick={getProjectItems}>
                    프로젝트
                  </Button>
                </Badge>
              ) : (
                <Button color="inherit" size="large" onClick={getProjectItems}>
                  프로젝트
                </Button>
              )}
              {exhibitsType === "space" ? (
                <Badge color="info" badgeContent=" " variant="dot">
                  <Button color="info" size="large" onClick={getSpaceItems}>
                    공간
                  </Button>
                </Badge>
              ) : (
                <Button color="inherit" size="large" onClick={getSpaceItems}>
                  공간
                </Button>
              )}
            </Stack>

            <Stack spacing={2} direction="row" className="filterContainer">
              <>
                <DatePickerOpenTo
                  calendarType={"startDate"}
                  onDateChange={handleStartDateChange}
                />
                <DatePickerOpenTo
                  calendarType={"endDate"}
                  onDateChange={handleEndDateChange}
                />

                <SelectSizesExample
                  name="address"
                  size={"default"}
                  type={"location"}
                  selectedLocation={address}
                  onLocationChange={handleAddressChange}
                />
                {/* 검색 아이콘 */}
                <Tooltip title="Search">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    style={{
                      backgroundColor: "black", // 배경색을 검정색으로 설정
                      color: "white", // 아이콘 색상을 흰색으로 설정
                      marginLeft: 15,
                    }}
                    onClick={() => goSearch(exhibitsType)}
                  >
                    <SearchIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </>
            </Stack>
          </Box>
        </Container>
        {/* 구분선 */}

        {/* 비어있을때 값  */}
        <div class="gray-line"></div>
        <Stack
          justifyContent="center" // 가로 방향으로 중앙 정렬
          alignItems="center" // 세로 방향으로 중앙 정렬
          style={{ marginTop: 50 }}
        >
          {enableDialog && (
            <img src={noResult} style={{ width: 300, marginBottom: 30 }} />
          )}
          {!enableDialog && (
            <ImageList
              sx={{ maxWidth: 1000, height: "auto", overflowY: "hidden" }}
              cols={3}
              gap={8} // 이미지 사이의 간격 설정
            >
              {data.map((item) => (
                <ImageListItem
                  key={
                    exhibitsType === "author"
                      ? item.projectItemId
                      : item.spaceItemId
                  }
                  onClick={() => {
                    exhibitsType === "author"
                      ? getItemInfo({
                          id: item.projectItemId,
                          exhibitsType: "author",
                        })
                      : getItemInfo({
                          id: item.spaceItemId,
                          exhibitsType: "space",
                        });
                  }}
                >
                  <img
                    srcSet={`https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=248&fit=crop&auto=format?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=248&fit=crop&auto=format`}
                    alt={item.intro}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }} // 모든 이미지가 동일한 가로 길이를 가지도록 가로 너비를 100%로 설정
                  />
                  {/* <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }} // 모든 이미지가 동일한 가로 길이를 가지도록 가로 너비를 100%로 설정
                /> */}
                  <ImageListItemBar
                    title={
                      { item } && item.intro
                        ? item.intro.slice(0, 10)
                        : "Loading..."
                    }
                    subtitle={
                      <div>
                        <span>희망기간 :</span>
                        <span>
                          {item.startDate}~{item.endDate}
                        </span>
                      </div>
                    }
                    position="below"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          {/* <ButtonBoot
            variant="dark"
            size="lg"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            continue
          </ButtonBoot> */}
        </Stack>

        <div>
          {/* <Exhibits
            className="exhibits"
            type={exhibitsType}
            cancelBtnVisible={false}
          /> */}
        </div>
      </React.Fragment>
    </div>
  );
};

export default MainBusiness;
