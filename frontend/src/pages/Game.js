import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";

export function Game() {
  const [ballManager, setBallManager] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(canvasRef.current);
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  const addBallHandler = async () => {
    try {
      const response = await axios.post(`${baseURL}/game`, {
        data: 1,
      });
      console.log(response.data.multiplier);
      if (ballManager) {
        ballManager.addBall(response.data.point);
      }
      const inputNumber = parseInt(inputValue);
      if (!isNaN(inputNumber)) {
        const newScore = Math.round(inputNumber * response.data.multiplier);
        setScore(newScore);
      }
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.textContent);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action of Enter key
      addBallHandler();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <div>
        <Button
          className="px-10 mb-4"
          style={{ width: "300px" }}
          onClick={addBallHandler}
        >
          Add ball
        </Button>
      </div>
      <div>
      <div
        contentEditable="true"
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a number"
        className="mb-4 p-2"
        style={{
          minWidth: "200px",
          textAlign: "center",
          marginLeft: "100px",
          backgroundColor: "rgb(34,197,94)",
          outline: "none",
          borderRadius: "4px",
          fontSize: "20px",
        }}
      ></div>

      {score !== null && (
        <div
          className="mb-4 p-2"
          style={{
            minWidth: "200px",
            textAlign: "center",
            marginLeft: "100px",
            backgroundColor: "rgb(59,130,246)",
            color: "white",
            borderRadius: "4px",
            fontSize: "20px",
          }}
        >
          Your Score: {score}
        </div>
      )}
      </div>
    </div>
  );
}
