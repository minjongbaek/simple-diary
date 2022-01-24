import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import Button from "../components/Button";
import DiaryEditor from "../components/DiaryEditor";
import Header from "../components/Header";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();
  const [searchParamse] = useSearchParams();
  const mode = searchParamse.get("mode");

  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const diary = diaryList.find((diary) => parseInt(diary.id) === parseInt(id));
      if (diary) {
        setData(diary);
      } else {
        alert("잘못된 접근입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  useEffect(() => {
    if (mode) {
      if (mode.indexOf("view") === -1 && mode.indexOf("edit") === -1) {
        alert("잘못된 접근입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [mode, navigate]);

  if (data) {
    if (mode === "view") {
      const emotion = emotionList.find((emotion) => parseInt(emotion.id) === parseInt(data.emotion));
      return (
        <div className="DiaryPage">
          <Header
            text={`${getStringDate(new Date(data.date))} 기록`}
            leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)}></Button>}
            rightChild={<Button text={"수정하기"} onClick={() => navigate(`/diary/${data.id}?mode=edit`)}></Button>}
          ></Header>
          <article>
            <section>
              <h4>오늘의 감정</h4>
              <div className={["diary-img-wrapper", `diary-img-wrapper-${emotion.id}`].join(" ")}>
                <img src={emotion.img} alt={emotion.descript}></img>
                <div className="emotion-desciprt">{emotion.descript}</div>
              </div>
            </section>
            <section>
              <h4>오늘의 일기</h4>
              <div className="diary-content-wrapper">
                <p>{data.content}</p>
              </div>
            </section>
          </article>
        </div>
      );
    } else {
      return <DiaryEditor isEdit={true} data={data}></DiaryEditor>;
    }
  } else {
    return <div className="DiaryPage">... 로딩중입니다.</div>;
  }
};

export default Diary;
