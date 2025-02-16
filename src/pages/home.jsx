import '../styles/style1.css';
import searchbtn from '../assets/image/search.png'
import menu from '../assets/image/menu.svg'
import home from '../assets/image/home.png'
import searchpic from '../assets/image/search.png'
import profilepic from '../assets/image/play-icon.png'
import weathericon2 from '../assets/image/6126276.png'
import temprature from '../assets/image/temperature.svg'
import rain from '../assets/image/rain1.svg'
import humidity from '../assets/image/humidity.svg'
import cancel from '../assets/image/cancel.svg'
import deleteBtn from '../assets/image/delete.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




const Home=()=>{
  const [temp,setTemp]=useState('')
  const [humidityDatum,setHumidity]=useState('')
  const [error,setError]=useState('')
  const [newCity,setNewCity]=useState('')
  const [showDate,setShowDate]=useState('')
  const [removeNav,setRemoveNav]=useState(false);
  const [trigger,setTrigger]=useState(0)

    const removeSidebar=()=>{
      setRemoveNav(!removeNav)
    }

    useEffect(()=>{
        let date=new Date();
    let daymonth=date.getDate();
    let day=date.toLocaleString('en-US',{weekday:'long'})
    let month=date.toLocaleString('en-US',{month:'long'})

    const formatted=`${day},${daymonth}  ${month}`
    setShowDate(formatted)
    })

    const handleCityInput=(event)=>{
      setNewCity(event.target.value)
    }
    const handleCityChange=()=>{
      
      if(newCity){
        localStorage.setItem('defaultCity',newCity)
        setTrigger((prev)=>prev+1)
        setNewCity('')
      }
    }

useEffect(()=>{
  const ShowWeather=async ()=>{
    const gottenDeafaultCity=localStorage.getItem('defaultCity');
    if(gottenDeafaultCity){
      const apiKey = 'bec2caaeeb1f2422770f48f49e975a86';
      const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; 
      const url = `${apiUrl}?q=${gottenDeafaultCity}&appid=${apiKey}`;
      try{
        const response=await fetch(url)
        const data=await response.json();
        console.log(data)
        setHumidity(data.main.humidity);
        setTemp(data.main.temp);
      }
      catch(error){
        setError(error)
      }
      
    }
  }
  ShowWeather()
},[trigger])
      


    return(
        <>
    <div className='sideBar1'>
      <span className="cancelSpan">
        <img src={ removeNav ? cancel:menu} className="cancelBtn" onClick={removeSidebar}/>
      </span>
      
      <div className={`sideBar  ${removeNav?'active':'notActive'}`} >
        <div className='ctas'>
          <Link to="/home">HOME</Link>
          <Link to="/search">SEARCH</Link>
        </div>
        <div className='changeLocation'>
        <input type='text' placeholder='Change Location' value={newCity} onChange={handleCityInput}/>
        <button onClick={handleCityChange}>CHANGE</button>
        </div>
      {/* <div>
        <span>
          <h5>History</h5>
          <img src={deleteBtn}/>
        </span>
        <ul>
          <li>ADAMAWA</li>
          <li>LAGOS</li>
          <li>NIGER</li>
        </ul>
      </div> */}
    </div>
    </div>

    <div className="bottom_nav">
      <div>
        <Link to=""><img src={home}/></Link>
        <Link to="/search"><img src={searchpic}/></Link>
        <a href="#"><img src={profilepic} /></a>
      </div>
    </div>


    <section className="landing2">
      <div>
        <img src={weathericon2} />
        <h4 id="date">{showDate}</h4>
        <h1 id="temp">{temp}<sup>0</sup>C</h1>
        <div className="props">



          <div>
            <img src={temprature} />
            <h3 id="temp1">{temp}<sup>0</sup>C</h3>
            <p>Temp</p>
          </div>


          <div>
            <img src={humidity} />
            <h3 id="humidity">{humidityDatum}%</h3>
            <p>Humidity</p>
          </div>


          <div>
            <img src={rain} />
            <h3 id="humidity1">{temp}%</h3>
            <p >Rain</p>
          </div>

        </div>
      </div>
    </section>
        </>
    )
}


export default Home