import React, { useState , useEffect } from 'react'
import './navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.jpeg'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'

const Navbar = ({setsidebar}) => {
  //to set the search string
  const [search_string,setsearch_string] = useState("");
  //for setting user data
  const [userdata,setuserdata] = useState([]);
  const fetchdata = async () =>{
    const user_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCm5XuLizI7rU--xzKJI7CuQ&key=${API_KEY}`;
    await fetch(user_url)
    .then(response => response.json())
    .then(data=>setuserdata(data.items))
  }

  useEffect(()=>{
  fetchdata(); 
  })

  let setsearchstring = (event) =>{
    setsearch_string(event.target.value);
  }

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        {/* 
          adding the functionality of expanding and contracting the sidebar on clicking 
          of the menu-icon 
        */}
        <img className='menu-icon' onClick={()=>setsidebar(prev=>prev===false?true:false)} src={menu_icon} alt="" />
        <Link to="/"><img className='logo' src={logo} alt="" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder='Search' name="search" value={search_string} onChange={setsearchstring}/>
          <Link to={search_string===""?`/`:`/searched/${search_string}`}><img src={search_icon} alt="" /></Link>
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img className='user-icon' src={userdata?(userdata.length===1?userdata[0].snippet.thumbnails.default.url:profile_icon):profile_icon} alt="" />
      </div>
    </nav>
  )
}

export default Navbar
