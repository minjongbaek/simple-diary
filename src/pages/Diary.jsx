import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Diary = () => {
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();
  const [searchParamse, setSearchParams] = useSearchParams();
  const mode = searchParamse.get("mode");

  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const diary = diaryList.find((diary) => parseInt(diary.id) === parseInt(id));
      console.log(diary);
      if (diary) {
        setData(diary);
      } else {
        alert("잘못된 접근입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  console.log(data)

  return <div>{data && <DiaryEditor isEdit={true} data={data}></DiaryEditor>}</div>;
};

export default Diary;
