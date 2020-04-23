import { useState, useEffect } from "react";
const colors = ["#90ee901f", "#2dc8e13b", "#e7e4941c", "#ffb6c147"];

export const useBg = (tasks) => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    setColorIndex((x) => (x > 2 ? 0 : x + 1));
  }, [tasks.length]);

  return [colors[colorIndex]];
};

export const getFromStorage = (name = "") => {
  const data = localStorage.getItem(name);

  if (data) return JSON.parse(data);
  return [];
};

export const useLocalStorage = (name = "", tasks) => {
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(tasks));
  }, [tasks, name]);
};
