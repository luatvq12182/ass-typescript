import React, { useEffect, useReducer } from "react";
import { Comment } from "../interfaces";

type Props = {
  data: Comment;
};

const Comment = ({ data }: Props) => {
  const [, forceUpdate] = useReducer((state: number) => state + 1, 0);

  const deviant = Date.now() - data.createdAt;
  console.log("force update");

  const timeConvert: string = (() => {
    if (deviant > 31536000000) {
      const value = Math.floor(deviant / 1000 / 60 / 60 / 24 / 365);
      return `${value} ${value > 1 ? "years" : "year"} ago`;
    } else if (deviant > 2592000000) {
      const value = Math.floor(deviant / 1000 / 60 / 60 / 24 / 30);
      return `${value} ${value > 1 ? "months" : "month"} ago`;
    } else if (deviant > 604800000) {
      const value = Math.floor(deviant / 1000 / 60 / 60 / 24 / 7);
      return `${value} ${value > 1 ? "weeks" : "week"} ago`;
    } else if (deviant > 86400000) {
      const value = Math.floor(deviant / 1000 / 60 / 60 / 24);
      return `${value} ${value > 1 ? "days" : "day"} ago`;
    } else if (deviant > 3600000) {
      const value = Math.floor(deviant / 1000 / 60 / 60);
      return `${value} ${value > 1 ? "hours" : "hour"} ago`;
    } else if (deviant > 60000) {
      const value = Math.floor(deviant / 1000 / 60);
      setTimeout(() => forceUpdate(), 60000);
      return `${value} ${value > 1 ? "minutes" : "minute"} ago`;
    } else {
      const value = Math.floor(deviant / 1000);
      setTimeout(() => forceUpdate(), 10000);
      return `${value} ${value > 1 ? "seconds" : "second"} ago`;
    }
  })();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (deviant > 60000) {
      timerId = setTimeout(() => forceUpdate(), 60000);
    } else {
      timerId = setTimeout(() => forceUpdate(), 10000);
    }

    return () => {
      clearTimeout(timerId);
    };
  });

  return (
    <div className="bg-[#2e3038] rounded-[26px] p-[20px] mb-4">
      <div className="flex justify-between">
        <h4 className="text-[#e7a007] text-[22px] font-[500]">{data.name}</h4>
        <span className="text-white italic">{timeConvert}</span>
      </div>

      <p className="text-white font-[19px] mt-4">{data.content}</p>
    </div>
  );
};

export default Comment;
