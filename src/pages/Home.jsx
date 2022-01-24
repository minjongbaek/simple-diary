import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const text = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      setData(diaryList.filter((diary) => diary.date >= firstDate && diary.date <= lastDate));
    }
  }, [diaryList, currentDate]);

  const increaseMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  const decreaseMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  return (
    <div className="DiaryList">
      <Header
        text={text}
        leftChild={<Button text={"<"} onClick={decreaseMonth}></Button>}
        rightChild={<Button text={">"} onClick={increaseMonth}></Button>}
      ></Header>
      <DiaryList diatyList={data}></DiaryList>
    </div>
  );
};

export default Home;
