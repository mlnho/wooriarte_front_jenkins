import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBoot from "react-bootstrap/Button";
// 스크롤다이어로그
import ScrollDialog from "../libs/ScrollDialog";
import AuthorEditItem from "../pages/mypage/AuthorEditItem";

// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
// 메인에 띄어지는 각 아이템 컴포넌트
// isVisible은 마이페이지 = true , 메인이면 false로
// whatType은 유저, 작가, 공간대여자 나누는거 \
// id 는 posterid
// isDialog는 작가 공간대여자가 신청할 때 자기 물건 자세히 보기 정도에 쓰임

import image1 from "../assets/image 1.png";
const PosterItem = ({
  ticketId,
  exhibitId,
  amount,
  ticketNo,
  whatType,
  isVisible,
  isDialog,
  isEditable,
}) => {
  console.log("ExhibitsItem 유저 타입" + whatType);
  const nav = useNavigate();
  const cancelTicket = () => {
    if (window.confirm("취소하시겠습니까?")) {
      console.log("취소o");
    } else {
      console.log("취소x.");
    }
  };

  return (
    <div
      onClick={() => {
        // isEditable = true => 마이페이지인 경우
        if (!isEditable) {
          if (isDialog) {
            console.log("PosterItem _isDialog" + isDialog);
          } else {
            // 메인에서 아이템 클릭 시 아이템 상세보기로 이동
            switch (whatType) {
              case "space":
              case "author":
                if (!isVisible)
                  nav(`/businessiteminfo/${exhibitId}`, {
                    state: {
                      posterId: exhibitId,
                      userType: whatType,
                    },
                  }); // 메인엔 예매취소 버튼 보이면 x
                return;

              default: {
                // 유저 경우
                if (!isVisible) nav(`/exhibititeminfo/${exhibitId}`); // 메인엔 예매취소 버튼 보이면 x
                return;
              }
            }
          }
        } else {
          // 작가 공간대여자 마이페이지 수정
          switch (whatType) {
            case "space":
              return;
            case "author":
              // 작가 id도 보내야함
              // nav(`/authoredititem/${id}`); // 메인엔 예매취소 버튼 보이면 x
              return <AuthorEditItem />;
            // case "author":
            //   // 작가 id도 보내야함
            //   nav(`/authoredititem/${id}`, {
            //     state: {
            //       posterId: id,
            //       userType: whatType,
            //     },
            //   }); // 메인엔 예매취소 버튼 보이면 x
            //   return;

            default: {
              return;
            }
          }
        }
      }}
    >
      <div>
        <ImageListItem key={ticketId}>
          <img src={image1} />
          <ImageListItemBar
            title={ticketId}
            subtitle={
              <span>
                {
                  <div>
                    <span> 예매수{amount}</span>
                    <ButtonBoot variant="outline-danger" onClick={cancelTicket}>
                      예매취소
                    </ButtonBoot>{" "}
                  </div>
                }
              </span>
            }
            position="below"
          />
          {/* {isDialog && <ScrollDialog />}  */}
        </ImageListItem>
      </div>
    </div>
  );
};
export default PosterItem;
