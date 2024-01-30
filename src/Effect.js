import Particle from './Particle.js'
import Grid from './Grid.js'


class Effect{
    constructor(width,height, numParticles, imageSource){
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numParticles = numParticles;
        this.grid = new Grid(this,10);
        this.pixels = null;
        this.imageSource = imageSource;
    }

    drawImage(context){
        const img = new Image();
        img.src = this.imageSource;
        context.drawImage(img, 0, 0)
       
        if(this.grid.flag == 0){
            this.pixels = context.getImageData(0,0,this.width,this.height).data;
            this.grid.draw(this.pixels)
        }
    }

    init(){
        for(let i = 0; i < this.numParticles; i++){
            this.particles.push(new Particle(this));
        }
    }

    render(context){
        if(this.grid.flag == 0){
            this.drawImage(context);
        }
        if(this.grid.flag == 1){
            this.particles.forEach(particle => {
                particle.draw(context,this.grid);
                particle.update(this.grid);
            })
        }
    }
}
export default Effect;
