import {useRef, useEffect, useState} from 'react';
import './styles/ParticleCanvas.css'
import Effect from './Effect.js'
function ParticleCanvas(props){
    const canvasRef = useRef(null);
    const shouldLog = useRef(true);
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])
    const img = new Image();
    img.src = props.image

    useEffect(() =>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', {willReadFrequently: true});
        let effect = new Effect(props.width, img.height, props.number, props.image);

        //Update window size if window is resized
        window.addEventListener('resize', setWindowSize([window.innerWidth, window.innerHeight]));
     
        if(shouldLog.current == true && effect != null){
            effect.init();
            animate();
        }

        function animate(){
            if (effect != null){
                context.clearRect(0,0, effect.width, effect.height)
                effect.render(context);
                requestAnimationFrame(animate);
            }
        }    

        //Garbage collector: delete window EventListener, all particles stored in Effect object, all points in Grid array and the Grid object, and Effect object
        return()=>{
            window.removeEventListener('resize', setWindowSize([window.innerWidth, window.innerHeight]));
            effect.particles.forEach(particle => {
                delete(particle.history)
            })
            delete(effect.particles);
            delete(effect.grid.points);
            delete(effect.grid);
            effect = null; 
        }
    }, [props.number]);
    return(
        <>
            <h1> {props.imageName} </h1>
            <div className='canvas'>
                <canvas className = "particle" ref={canvasRef} width={img.width} height={img.height}/>
            </div>
        </>    
    )
}

export default ParticleCanvas;