import React from "react";

//Input: liked: boolean
//Output: onClick
const Like = (props) => {
  let classes = "fa fa-heart-o";
  if (props.liked === false) classes = "fa fa-heart";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
