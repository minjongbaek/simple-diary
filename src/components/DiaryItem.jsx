import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, content, emotion, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}?mode=view`);
  };

  const goEdit = () => {
    navigate(`/diary/${id}?mode=edit`)
  }

  return (
    <div className="DiaryItem">
      <div className={["emotion-img-wrapper", `emotion-img-wrapper-${emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt=""></img>
      </div>
      <div className="info-wrapper" onClick={goDetail}>
        <div className="date">{strDate}</div>
        <div className="content-preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn-wrapper">
        <Button text={"수정하기"} type={"default"} onClick={goEdit}></Button>
      </div>
    </div>
  );
};

export default DiaryItem;
