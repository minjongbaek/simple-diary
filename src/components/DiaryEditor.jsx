import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

import { DiaryDispatchContext } from "../App";

import { getStringDate } from "../util/date";

import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, data }) => {
  const navigate = useNavigate();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(data.date))));
      setContent(data.content);
      setEmotion(data.emotion);
    }
  }, [isEdit, data]);

  
  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleRemove = () => {
    if (window.confirm("일기를 삭제합니다.")) {
      onRemove(data.id);
      navigate("/", { replace: true });
    }
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정합니다." : "새로운 일기를 작성합니다.")) {
      if (isEdit) {
        onEdit(data.id, date, content, emotion);
      } else {
        onCreate(date, content, emotion);
      }
    } else {
    }
    navigate(-1, { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <Header
        text={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)}></Button>}
        rightChild={isEdit && <Button text={"삭제하기"} type={"negative"} onClick={handleRemove}></Button>}
      ></Header>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input className="input-date" type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input-box emotion-list-wrapper">
            {emotionList.map((_emotion) => (
              <EmotionItem key={_emotion.id} {..._emotion} onClick={handleClickEmotion} isSelected={_emotion.id === emotion}></EmotionItem>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input-box text-wrapper">
            <textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="오늘은 어땠나요?"></textarea>
          </div>
        </section>
        <section>
          <div className="control-box">
            <Button text="취소하기" onClick={() => navigate(-1)}></Button>
            <Button text="작성완료" type="positive" onClick={handleSubmit}></Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
