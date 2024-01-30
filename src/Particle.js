
class Particle{
    constructor(effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedVal = Math.random() * (6 - 3) + 3;
        this.speedX;
        this.speedY;
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * (0.2 - 0.1) + 0.1 ;
        this.history = [[this.x,this.y]];
        this.maxLength = Math.random() * (70 - 20) + 20 ;
        this.timer = this.maxLength * 2;
        this.color = [255,255,255]
        this.init = 0;
        this.lineWidth = Math.random() * (3 - 1) + 1 ;
    }

    draw(context,grid){
        context.beginPath();
        context.moveTo(this.history[0][0],this.history[0][1]);
        if(this.init == 0){
            this.setColor(grid)
            this.init = 1;
        }
        for(let i = 0; i < this.history.length; i++){
            if (this.history.length == 1 || i == this.history.length - 1){
                continue;
            }
            else{
                context.strokeStyle = `rgb( ${this.color[0]} ${this.color[1]} ${this.color[2]} )`
                context.lineWidth = this.lineWidth;
                context.beginPath();
                context.moveTo(this.history[i][0],this.history[i][1]);
                context.lineTo(this.history[i+1][0],this.history[i+1][1]);
                context.stroke();
            }
        }
    }

    setColor(grid){
        let x = Math.floor(this.x /grid.cellSize);
        let y = Math.floor(this.y/grid.cellSize);
        let r;
        let g;
        let b;
        let index = y * grid.cols + x;
        if(grid.points[index]){
            r = grid.points[index].red
            g = grid.points[index].green
            b = grid.points[index].blue
            this.color = [r,g,b]
        }
    }

    update(grid){
        this.timer--;
        if(this.timer >= 1){
            let x = Math.floor(this.x /grid.cellSize);
            let y = Math.floor(this.y/grid.cellSize)
            let index = y * grid.cols + x;

            if(grid.points[index]){
                this.newAngle = grid.points[index].colorAngle;
                if(this.angle > this.newAngle){
                    this.angle -= this.angleCorrector;
                }else if (this.angle < this.newAngle){
                    this.angle += this.angleCorrector
                }else{
                    this.angle = this.newAngle
                }
            }
            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX;
            this.y += this.speedY;
            this.history.push([this.x, this.y]);
            if(this.history.length > this.maxLength){
                this.history.shift();
            }
        }
        else if(this.history.length > 1){
            this.history.shift();
        }
        else{
            this.reset(grid)
        }
    }

    reset(grid){
        let attempts = 0;
        let resetSuccess = false;

        while(attempts < 5 && !resetSuccess){
            let testX = Math.floor(Math.random() * this.effect.width);
            let testY = Math.floor(Math.random() * this.effect.height);
            let x = Math.floor(testX/grid.cellSize);
            let y = Math.floor(testY/grid.cellSize);
            let testIndex = y * grid.cols + x;
            attempts++;
            if(grid.points[testIndex].colorAngle > 0){
                this.angle = grid.points[testIndex].colorAngle;
                this.x = testX;
                this.y = testY;
                this.history = [[this.x,this.y]]
                this.speedVal = Math.floor(Math.random() * (6 - 3) + 3 );
                this.maxLength = Math.floor(Math.random() * (70 - 20) + 20 );
                resetSuccess = true
                this.timer = this.maxLength * 2
            }
        }
        if(!resetSuccess){
            this.x = Math.floor(Math.random() * this.effect.width);
            this.y = Math.floor(Math.random() * this.effect.height);
            this.history = [[this.x,this.y]]
            this.speedVal = Math.floor(Math.random() * (6 - 3) + 3 );
            this.maxLength = Math.floor(Math.random() * (70 - 20) + 20 );
            this.timer = this.maxLength * 2
            this.angle = 0;
        }
        this.setColor(grid);
    }
}

export default Particle;