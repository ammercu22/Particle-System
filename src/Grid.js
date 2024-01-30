

class Grid{
    constructor(effect, cellSize){
        this.effect = effect;
        this.points = []
        this.cellSize = cellSize;
        this.time = 0;
        this.rows;
        this.cols;
        this.maxWidth = Math.floor(this.effect.width/this.cellSize)* this.cellSize;
        this.maxHeight = Math.floor(this.effect.height/this.cellSize)* this.cellSize;
        this.flag = 0;
    }

    draw(pixels){
        if(this.flag == 0){
            this.rows = Math.floor(this.effect.height/this.cellSize);
            this.cols = Math.floor(this.effect.width/this.cellSize); 
            for (let y = 0; y < this.effect.height; y += this.cellSize){
                for(let x = 0; x < this.effect.width; x += this.cellSize){
                    const index = (y * this.effect.width + x) * 4
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const grayscale = (red + green + blue)/3;
                    const colorAngle = ((grayscale/255) * 6.28).toFixed(2);
                    if(colorAngle > 0){
                        this.flag = 1;
                    }
                    let angle = {
                        colorAngle: colorAngle,
                        red: red,
                        green: green,
                        blue: blue,
                        alpha: alpha
                    }
                   this.points.push(angle);   
                }
            } 
            if(this.flag == 0){
                this.points = []
            } 
        }
    }
}

export default Grid
