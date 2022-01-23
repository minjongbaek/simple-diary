import React from "react";

const EmotionItem = ({ id, img, descript, onClick, isSelected }) => {
  return (
    <div className={["EmotionItem", isSelected ? `emotion-item-on-${id}` : `emotion-item-off`].join(" ")} onClick={() => onClick(id)}>
      <img src={img} alt={descript}></img>
      <span>{descript}</span>
    </div>
  );
};

export default EmotionItem;
