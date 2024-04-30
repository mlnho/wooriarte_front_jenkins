// 추후 useEffect로 초기 설정하기
import { useEffect } from "react";
import image1 from "../assets/image 1.png";
import mainAdBanner from "../assets/mainAdBanner.png";
import PosterItem from "../components/PosterItem";
import "../styles/MainUser.css";

import * as React from "react";

// api
import { ongetAllExhibitsHandler } from "../apis/servicehandeler/AdminApiHandler";

// 사진
import author from "../assets/author.png";
// 레이아웃
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// 상위 3개 노출
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// 사진움직이기
import CustomCarouselForMain from "../libs/CustomeCarouselForMain";
import { mainCarouselImage } from "../util/Images";

// 작가 사업자 로그인하러 가기 카드이미지
import ParticipateCard from "../libs/ParticipateCard";
import { cardImg } from "../util/Images";

// 전시 보이기
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import PosterForMain from "../components/PosterForMain";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockData = [
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
// stack 배치 사용
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const itemData = [
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
];

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

// 추후 무한 스크롤로 변경
const MainUser = () => {
  const [mockData, setMockData] = useState([{}]); // 받는 형식이 배열 안 객체라
  const nav = useNavigate();

  // 아이템 상세 보기 api
  const handleItemInfo = (exhibitId) => {
    console.log("exhibitId" + exhibitId);
    nav(`/exhibititeminfo/${exhibitId}`, { state: { exhibitId } });
  };

  useEffect(() => {
    ongetAllExhibitsHandler((response) => {
      if (Array.isArray(response.data)) {
        setMockData(response.data);
      } else {
        console.error("응답 데이터가 배열이 아닙니다.");
      }
    });
  }, []);

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="100%">
          <CustomCarouselForMain>
            {mainCarouselImage.map((image, index) => {
              return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
            })}
          </CustomCarouselForMain>
        </Container>
        <Container maxWidth="80%">
          <Box sx={{ bgcolor: "#00000000", height: "100%", marginTop: 7 }}>
            {/* 추천 리스트 */}
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
                      whatType={"user"}
                    />
                  );
                })}
              </ImageList>
            </Stack> */}

            {/* 모든리스트 */}
            <Stack
              justifyContent="center" // 가로 방향으로 중앙 정렬
              alignItems="center" // 세로 방향으로 중앙 정렬
              style={{ marginTop: 50 }}
            >
              <ImageList
                sx={{ maxWidth: 1000, height: "auto", overflowY: "hidden" }}
                cols={4}
                gap={20} // 이미지 사이의 간격 설정
              >
                {mockData.map((item) => (
                  <ImageListItem
                    key={item.exhibitId}
                    onClick={() => handleItemInfo(item.exhibitId)}
                  >
                    <img
                      srcSet={`${author}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${author}?w=248&fit=crop&auto=format`}
                      alt={item.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }} // 모든 이미지가 동일한 가로 길이를 가지도록 가로 너비를 100%로 설정
                    />
                    <ImageListItemBar
                      title={item.name + " " + item.city}
                      subtitle={
                        <div>
                          <span>{item.artistName}</span>
                          <div />
                          <span>{item.startDate + "~" + item.endDate}</span>
                        </div>
                      }
                      position="below"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Stack>
            <div class="gray-line" style={{ marginBottom: 10 }}></div>
            {/* 문구배너  */}
            <img
              src={mainAdBanner}
              style={{ width: "100% ", height: "80%", display: "block" }}
              alt="Responsive image"
            />
          </Box>
        </Container>
      </React.Fragment>

      {/* {mockData.map((item) => (
        <PosterItem
          key={item.id}
          {...item}
          date={item.createdDate}
          whatType={"user"}
          isVisible={false}
        />
      ))} */}
    </div>
  );
};
export default MainUser;
