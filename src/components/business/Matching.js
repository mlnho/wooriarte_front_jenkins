import * as React from "react";

// 레이아웃
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { MapsUgcTwoTone } from "@mui/icons-material";
import MatchingItem from "../matching/MathingItem";
import WaitingMatchingList from "../matching/WaitingMatchingList";
import ReceivedMatchingList from "../matching/ReceivedMatchingList";
import AcceptedMatchingList from "../matching/AcceptedMatchingList";
import { useState } from "react";

const Matching = () => {
  // 매칭 성사되면 재로딩
  const [updateCount, setUpdateCount] = useState(0);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="80%">
        <Box sx={{ bgcolor: "#00000000", width: "100%" }}>
          <h2>신청현황</h2>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "gray",
              marginBottom: 20,
              display: "flex", // flexbox 디스플레이 설정
              justifyContent: "center", // 가로 중앙 정렬
            }}
          />
          <div />
          <Stack
            alignItems="center" // 세로 방향으로 중앙 정렬
            spacing={2}
            style={{ marginBottom: 20 }}
          >
            {/* 대기 매칭 리스트  */}
            <WaitingMatchingList />
          </Stack>

          <h2>제안</h2>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "gray",
              marginBottom: 20,
            }}
          />
          <Stack
            alignItems="center" // 세로 방향으로 중앙 정렬
            spacing={2}
            style={{ marginBottom: 20 }}
            // 요소들을 가로 방향으로 배치
          >
            <ReceivedMatchingList
              setUpdateCount={setUpdateCount}
              updateCount={updateCount}
            />
          </Stack>
          <h2>성사된 매칭</h2>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "gray",
              marginBottom: 20,
            }}
          />
          <Stack
            alignItems="center" // 세로 방향으로 중앙 정렬
            spacing={2}
            style={{ marginBottom: 20 }}
            // 요소들을 가로 방향으로 배치
          >
            <AcceptedMatchingList updateCount={updateCount} />
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default Matching;
