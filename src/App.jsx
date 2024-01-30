import './styles/style.css';
import {useState} from 'react';
import ParticleCanvas from './ParticleCanvas';
import monaLisa from './assets/mona_lisa.jpg';
import wanderer from './assets/sea3.jpeg';
import scream from './assets/scream3.webp'
import pearl from './assets/pearl.jpg'
import man from './assets/man.webp'

function App() {
  const [state,setState] = useState(1000);
  const [componentState, setComponentState] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(monaLisa);
  const [selectedName, setSelectedName] = useState("Mona Lisa")

  function handleClick(){
    
    setComponentState(true);
  }
  function Form(){
      return(
        <div>   
        <h1>Image Particle System</h1>
        <div className='form'>
          <div className = "form_info"> 
            <label>Enter Number of Particles:</label><br/><br/>
            <input id={'numParticles'}
              type={"number" }
              value={state} 
              placeholder={"Number of Particles"}
              onChange = {event => {setState(event.target.value);}}
            />
            <br/><br/>
            <label>Choose Image to Render:</label><br/><br/>
            <button  className="button" role="button" onClick={()=>{setSelectedPhoto(monaLisa); setSelectedName("Mona Lisa by Leonardo da Vinci")}}>Mona Lisa</button>
            <button  className="button" role="button" onClick={()=>{setSelectedPhoto(wanderer); setSelectedName(" Wanderer above the Sea of Fog")}}>Wanderer</button>
            <button  className="button" role="button" onClick={()=>{setSelectedPhoto(scream); setSelectedName("The Scream by Edvard Munch")}}>The Scream</button>
            <button  className="button" role="button" onClick={()=>{setSelectedPhoto(pearl); setSelectedName("Girl with a Pearl Earring by Johannes Vermeer")}}>Pearl Earring</button>
            <button  className="button" role="button" onClick={()=>{setSelectedPhoto(man); setSelectedName("The Son of Man by Rene Magritte")}}>Son of Man</button>
            <button  className="submit" role="button" onClick={()=>{handleClick()}}>Submit</button><br/><br/>
          </div>
          <div>
            <img width={400} height={400} src={selectedPhoto}/>
          </div>
        </div>
        </div>
      )
  }
  return (
    <>
    {componentState?<ParticleCanvas width = {1000} height = {800} number={state} image = {selectedPhoto} imageName = {selectedName}/>: Form()}
    {componentState?<button  className="reset" role="button" onClick={()=>{setComponentState(false)}}>Reset</button>:<></>}
    </>
  ) 
}
export default App
