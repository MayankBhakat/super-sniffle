import { gravity, horizontalFriction, verticalFriction } from "../constants";
import { pad, unpad } from "../padding";
import { Obstacle, Sink } from "../objects";

//ctx is the canvas object that we are using tocreate the graphics
export class Ball {
    constructor(x, y, radius, color, ctx, obstacles, sinks, onFinish) {
        //this keyword is an instance of the object
        //this.x means x is a member of the object

        //co-ordinates
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        //velocity
        this.vx = 0;
        this.vy = 0;

        //canvax instance
        this.ctx = ctx;

        //objects
        this.obstacles = obstacles;
        this.sinks = sinks;

        this.onFinish = onFinish;
    }

    draw() {
        //starts a new path.Call it when u wanna create a new shape
        this.ctx.beginPath();

        //draws a circle with given radius of angle from 0 to 2pi
        this.ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);

        //fills color
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

        //closes the circle
        this.ctx.closePath();
    }


    //The game loop will call the update function
    //This will be running at 30fps.
    //That is 30 times per second this update function would be running
    update() {

        //we dont take time into consideration here.We run the loop 
        //v = u + gt
        this.vy += gravity;

        //x = x + vt
        this.x += this.vx;
        this.y += this.vy;

        // Collision with obstacles
        //Assume collision angle is 0 for less complication
        this.obstacles.forEach((obstacle) => {

            //Hypot is to calculate the hypotenous
            const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
            if (dist < pad(this.radius + obstacle.radius)) {
                // Calculate collision angle
                const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
                // Reflect velocity
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                this.vx = Math.cos(angle) * speed * horizontalFriction;
                this.vy = Math.sin(angle) * speed * verticalFriction;

                // Adjust position to prevent sticking
                const overlap = this.radius + obstacle.radius - unpad(dist);
                this.x += pad(Math.cos(angle) * overlap);
                this.y += pad(Math.sin(angle) * overlap);
            }
        });

        // Collision with sinks
        // Mainly to vanish the ball after hitting the sink
        for (let i = 0; i < this.sinks.length; i++) {
            const sink = this.sinks[i];
            if (
                unpad(this.x) > sink.x - sink.width / 2 &&
                unpad(this.x) < sink.x + sink.width / 2 &&
                unpad(this.y) + this.radius > sink.y - sink.height / 2
            ) {
                this.vx = 0;
                this.vy = 0;
                this.onFinish(i);
                break;
            }
        }
    }
}
