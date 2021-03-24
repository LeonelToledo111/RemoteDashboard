import React from "react";

const Space = ({ n = 1 }) => {
  const spaces = Array(n).join("\u00a0");
  return <span>{spaces}</span>;
};

export default Space;