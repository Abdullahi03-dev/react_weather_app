import '../styles/index.css';
import weathericon from '../assets/image/weathericon.png'
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';


const index=()=>{
  const navigate=useNavigate();
    const [input,setInput]=useState('')
    const [error,setError]=useState('')

    const handleInput=(event)=>{
        setInput(event.target.value)
    }
    const handleBtn=()=>{
      if(input){
        localStorage.setItem('defaultCity',input);
        navigate('/home')
      }
      else{
        setError('FILL IN THE INPUT')
      }
    }
    return (
    <>
    <section className="landing">
      <div>
        <img src={weathericon}/>
        <h3>Daily Weather</h3>
        <p>Get to know your weather maps and rader precipitation forecast</p>
        <div className="utils">
          <input type="text" name="" id="city-input"placeholder="CHOOSE CITY" value={input} onChange={handleInput}/>
              <button onClick={handleBtn}>Get Started</button>
        </div>
         
      </div>
    </section>
    </>)
}

export default index