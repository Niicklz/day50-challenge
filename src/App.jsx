import React, { useEffect, useRef, useState } from "react";
import { Insect } from "./assets/components/Insect/Insect";
import "./styles.css";

export const App = () => {
  const [current, setCurrent] = useState("menu");
  const [selected, setSelected] = useState("");
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(10);
  const [rotate, setRotate] = useState(0)

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === "playing") {
        setTime((prevTime) => {
          if (prevTime < 1) {
            clearInterval(interval);

            return prevTime;
          } else {
            return prevTime - 1;
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [current]);

  const startGame = (img) => {
    setCount(0);
    setTime(59);
    setSelected(img);
    setCurrent("playing");
  };

  const handleClicked = () => {
    setClicked((clicked) => !clicked);
    setCount((count) => count + 1);
    setTimeout(() => {
      setTop(Math.floor(Math.random() * (70 - 20 + 1)) + 20);
      setLeft(Math.floor(Math.random() * (70 - 20 + 1)) + 20);
      setRotate(Math.floor(Math.random() * (100 - 0 + 1)) + 100)
      setClicked((clicked) => !clicked);
    }, 500);
  };

  return (
    <div className="container">
      {current === "menu" && (
        <div className="start-container">
          <h1>Catch The Insect!</h1>
          <button onClick={() => setCurrent("selection")}>Play Game</button>
        </div>
      )}
      {current === "selection" && (
        <div className="selection-container">
          <h2>what is your "favorite" insect?</h2>
          <div className="options-container">
            <Insect
              select={startGame}
              urlImg="https://pngimg.com/uploads/fly/fly_PNG3946.png"
              name="Fly"
            />
            <Insect
              select={startGame}
              urlImg="https://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
              name="Mosquito"
            />
            <Insect
              select={startGame}
              urlImg="https://pngimg.com/uploads/spider/spider_PNG12.png"
              name="Spider"
            />
            <Insect
              select={startGame}
              urlImg="https://pngimg.com/uploads/roach/roach_PNG12163.png"
              name="Roach"
            />
          </div>
        </div>
      )}

      {current === "playing" && (
        <div className="game-container">
          {current === "playing" && time === 0 && (
            <div className="modal">
              <h3>Your Score: {count}</h3>{" "}
              <button onClick={() => setCurrent("selection")}>
                Go Selection
              </button>
            </div>
          )}
          <p className="counter">Score: {count}</p>
          <p className="time">Time: {time}</p>
          <figure
            style={{ top: `${top}%`, left: `${left}%`, transform:`rotate(${rotate}deg)` }}
            className={`selected-img ${clicked ? "active" : ""}`}
            onClick={handleClicked}
          >
            <img src={selected} alt="" />
          </figure>
        </div>
      )}
    </div>
  );
};
