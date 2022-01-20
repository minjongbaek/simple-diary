import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Diary = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParamse, setSearchParams] = useSearchParams();
  const mode = searchParamse.get("mode");

  return (
    <div>
      <h1>Diary</h1>
      <p>상세 페이지</p>
      <button onClick={() => setSearchParams({ mode: "edit" })}>수정</button>
      <button onClick={() => navigate("/home")}>홈</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default Diary;
