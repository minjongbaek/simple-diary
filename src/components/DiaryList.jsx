import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diatyList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compareCallback = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const tmpList = JSON.parse(JSON.stringify(diatyList));

    const filterdList = filter === "all" ? tmpList : tmpList.filter((item) => filterCallback(item));

    const sortedList = filterdList.sort(compareCallback);
    return sortedList;
  };

  return (
    <div>
      <div className="menu-wrapper">
        <div className="left-col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}></ControlMenu>
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList}></ControlMenu>
        </div>
        <div className="right-col">
          <Button type={"positive"} text={"새 일기 쓰기"} onClick={() => navigate("/diary")}></Button>
        </div>
      </div>
      {getProcessedDiaryList().map((diary) => (
        <DiaryItem key={diary.id} {...diary}></DiaryItem>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
