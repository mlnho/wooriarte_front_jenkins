// 이미지 라이브러리
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import author from "../../assets/author.png";

import BootModalForAdmin from "../../libs/BootModalForAdmin";
import { useState } from "react";
import MyVerticallyCenteredModal from "../../libs/BootModal";
import BootModalForGetitem from "../../libs/BootModalForGetitem";

const BusinessItem = ({
  whatType,
  itemId,
  artistName,
  intro,
  phone,
  startDate,
  endDate,
  city,
  setUpdateCount,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const handleItemInfo = () => {
    setModalShow(true);
  };

  console.log("businessitem.js 유저 타입 " + whatType + itemId);

  return (
    <>
      <ImageListItem key={itemId} onClick={() => handleItemInfo()}>
        <img src={author} />
        <hr style={{ margin: "5px 0" }} />{" "}
        <ImageListItemBar
          title={String(intro).slice(0, 15)}
          subtitle={
            <div>
              <span>
                {String(startDate).slice(0, 10) +
                  "~" +
                  String(endDate).slice(0, 10)}
              </span>
            </div>
          }
          position="below"
        />
      </ImageListItem>
      {/* 단건조회 */}
      {modalShow && (
        <BootModalForGetitem
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={itemId}
          type={whatType}
          setUpdateCount={setUpdateCount}
        />
      )}
    </>
  );
};

export default BusinessItem;
