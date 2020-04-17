import { useState, useEffect } from "react";
const colors = ["#90ee901f", "#2dc8e13b", "#e7e4941c", "#ffb6c147"];
// export const useEditedTask = (tasks = []) => {
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   setTaskToEdit(tasks.filter((task) => task.edit));
//   const [taskEdit] = taskToEdit;

//   return taskEdit;
// };

export const useBg = (tasks) => {
  const [colorIndex, setColorIndex] = useState(0);
  const updateColor = () => {
    colorIndex > 2 ? setColorIndex(0) : setColorIndex(colorIndex + 1);
  };
  useEffect(() => {
    updateColor();
  }, [tasks.length]);

  return [colors[colorIndex]];
};
