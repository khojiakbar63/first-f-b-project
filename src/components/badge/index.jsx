import React from "react";

const index = ({ style, discount }) => {
  return (
    <div className={`absolute top-4 right-4 ${style}`}>
      <div className="badge badge-success gap-2 text-white">
        %
        {discount}
      </div>
    </div>
  );
};

export default index;
