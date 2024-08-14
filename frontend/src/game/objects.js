import { HEIGHT,WIDTH, NUM_SINKS, obstacleRadius, sinkWidth } from "./constants";
import { pad } from "./padding";

const MULTIPLIERS = {
    1: 16,
    2: 9,
    3: 2,
    4: 1.6,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.6,
    15: 2,
    16: 9,
    17: 16
}

export const createObstacles = () => {
    const obstacles = [];
    const rows = 18;
    for (let row = 2; row < rows; row++) {
        //Number of obstacles at each row.Starts from 3 in first row
        const numObstacles = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;
        for (let col = 0; col < numObstacles; col++) {
            //x coordinate of obstacles
            //Obstacle remain constant even after the ball moves
            const x = WIDTH / 2 - spacing * (row / 2 - col);
            obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
        }
    }
    return obstacles;
};

export const createSinks = () => {
    const sinks = [];
    //SPACING is done to give the padding required (margin-padding)
    const SPACING = obstacleRadius * 2;

    for (let i = 0; i < NUM_SINKS; i++) {
        //It should be in the middle of the 2 ball above it
        const x = WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS / 2)) - SPACING * 1.5;
        //Height is constant
        const y = HEIGHT - 170;
        const width = sinkWidth;
        const height = width;
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i + 1] });
    }
    
    return sinks;
};
