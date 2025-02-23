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
import toast  from "react-hot-toast"

const Search=()=>{
    const [temp,setTemp]=useState('')
  const [humidityDatum,setHumidity]=useState('')
  const [error,setError]=useState('')
  const [city,setCity]=useState('')
  const [showDate,setShowDate]=useState('')
  const [removeNav,setRemoveNav]=useState(false);
  const [history,setHistory]=useState(()=>{
        const gottenSavedData=JSON.parse(localStorage.getItem('searchHistory'))
    return gottenSavedData?gottenSavedData:[]
  })
  useEffect(()=>{
    let date=new Date();
    let daymonth=date.getDate();
    let day=date.toLocaleString('en-US',{weekday:'long'})
    let month=date.toLocaleString('en-US',{month:'long'})

    const formatted=`${day},${daymonth}  ${month}`
    setShowDate(formatted)
    })

    const removeSidebar=()=>{
      setRemoveNav(!removeNav)
    }
    const handleinput=(event)=>{
        setCity(event.target.value)
    }
    const deleteHistory=()=>{
      toast.success("Successfully Deleted")
      localStorage.removeItem('searchHistory')
      setHistory([])
    }
    const fetchData=async ()=>{
      if(city==''){
        toast.error('WRITE A CITY NAME')
      }
        if(city){
      const apiKey = 'bec2caaeeb1f2422770f48f49e975a86';
      const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; 
      const url = `${apiUrl}?q=${city}&appid=${apiKey}`;
      try{
        const response=await fetch(url)
        const data=await response.json();
        console.log(data)
        setHumidity(data.main.humidity);
        setTemp(data.main.temp);
        
        setHistory((prev)=>{
          if(!prev.includes(city)){
            const updatedHisotry=[...prev,city];
            localStorage.setItem('searchHistory',JSON.stringify(updatedHisotry));
            return updatedHisotry
          }
           
            return prev;
        })
        setCity('')
      }
      catch(error){
                setError(error)
                toast.error(error)
            } 
        }
    }
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
      <div>
        <span>
          <h5>History</h5>
          <img src={deleteBtn} onClick={deleteHistory}/>
        </span>
        <ul>
            {history.map((datum)=>(
                <li>{datum}</li>
            ))}
        </ul>
      </div>
    </div>
    </div>

    <div className="bottom_nav">
      <div>
        <Link to="/home"><img src={home}/></Link>
        <a href="#"><img src={searchpic}/></a>
        <a href="#"><img src={profilepic} /></a>
      </div>
    </div>
    <section className="landing2">
      <div>
        <div className="landing2_div">
          <img src={searchbtn} id="btn" className="searchCityBtn" onClick={fetchData}/>
          <input type="text" name="" id="city-input" placeholder="SEARCH CITY" className="searchCity" value={city} onChange={handleinput}/>
        </div>
        <h2 id="location"></h2>
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

    
</>)
}

export default Search;