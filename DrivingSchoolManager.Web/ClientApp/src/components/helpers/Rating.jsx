import React from "react";

import ReactStars from "react-stars";

const Rating = ({ editable, value, size = 25, valueChangeHandler, half }) => (
  <div className="rating">
    <ReactStars
      value={value}
      count={5}
      color1="#333333"
      color2="#DAA520"
      size={size}
      edit={editable}
      half={half === null ? true : half}
      onChange={valueChangeHandler}
    />
  </div>
);

export default Rating;
