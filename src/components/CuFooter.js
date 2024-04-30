import { grey } from "@mui/material/colors";
import "../styles/Footer.css";

const CuFooter = () => {
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "black",
        padding: 20,
        textAlign: "left",
      }}
    >
      <span>ABOUT US</span>
      <div />
      <span>WOORI ARTE는 누구나 작가가 될 수 있고 어쩌구 신념에서 탄생함</span>

      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "white",
          marginTop: 40,
        }}
      ></div>
      <span style={{ fontSize: 10, color: grey }}>
        서울 마포구 월드컵북로 434 상암 IT Tower
        <div />© 2024 WOORI ARTE. All Rights Reserved. Design by WOORI FISA
      </span>
    </div>
  );
};
export default CuFooter;
