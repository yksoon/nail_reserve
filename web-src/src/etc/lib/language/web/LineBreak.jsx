import React from "react";

const LineBreak = (text) => {
    return text.split("\n").map((line, idx) => <div key={idx}>{line}</div>);
};

export default LineBreak;
