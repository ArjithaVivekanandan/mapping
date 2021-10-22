import { useEffect, useState } from 'react';
import ReactMapGL ,{Marker,Popup} from 'react-map-gl';
import {Room,Star} from '@material-ui/icons';
import './App.css';
import axios from "axios";
import {format} from "timeago.js"
import Register from './components/Register';
import Login from './components/login';

function App() {

  const myStorage = window.localStorage;
  const [currentUser,setCurrentUser] = useState(null);
  const [pins,setPins]=useState([])
  const [currentPlaceId,setCurrentPlaceId] = useState(null);
  const [newPlace,setNewPlace] = useState(null);

  const [title,setTitle] = useState(null);

  const [desc,setDesc] = useState(null);

  const [rating,setRating] = useState(0);
  const [showRegister,setShowRegister]= useState(false);
  const [showLogin,setShowLogin]=useState(false);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

useEffect(()=>{
const getPins  = async ()=>{
  try{

    const res = await axios.get("pins");
    
    setPins(res.data)
  
  }
  catch(err){
    console.log(err)
    
  }
}
getPins();
},[])


const handleMarkerClick = (id,lat,long)=>{
  setCurrentPlaceId(id)
  setViewport({...viewport,latitude:lat,longitude:long})
}

const handleAddClick = (e)=>{
  const [long,lat]=e.lngLat;
  setNewPlace({
    lat,long
  })
  
}

const handleLogout = () =>{
  myStorage.removeItem("user");
  setCurrentUser(null)
}


const handleSubmit =async (e)=>{
  e.preventDefault();
  const newPin = {
    username:currentUser,
    title,
    desc,
    rating,
    lat:newPlace.lat,
    long:newPlace.long
  }
try{
  const res = await axios.post("pins",newPin)
  console.log(res)
  setPins([...pins,res.data])
  setNewPlace(null)
}
catch(err){
console.log(err)
}
}
  return (
    <div className="App">
    <ReactMapGL
      {...viewport}
     
      mapboxApiAccessToken = 'pk.eyJ1IjoiYXJqaXRoYSIsImEiOiJja3VjZzJ5MzQwd3k5MnFteGF0YTZib3ZqIn0.FQKmUfHv_3vld-6Q52B68w'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/arjitha/ckuci2nwc3jau18mr7m1fuus4"
      onDblClick = {handleAddClick}
      transitionDuration="200"
    >
      {
      pins.map((p)=>{
  return <>    
      <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom*7} offsetTop={-viewport.zoom*3.5}>

      <Room style={{fontSize:viewport.zoom*10,color: p.username===currentUser ? "tomato" : "slateblue", cursor:"pointer"}}
       onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}/>

      </Marker>
      
      {
      p._id=== currentPlaceId && (
      <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left" 
          onClose={()=>setCurrentPlaceId(null)}
          >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            
            <label>Review</label>
            <p className="desc">{p.desc}</p>

            <label>Rating</label>
            <div className="stars">
            {Array(p.rating).fill(<Star className="star"/>)}
            </div>

            <label>Information</label>
            <span className="username">Created By<b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>
           
          </div>
   </Popup> )}
    </>
      })}
{newPlace &&(
<Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left" 
          onClose={()=>setNewPlace(null)}
          ><div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title"
               onChange={(e)=>setTitle(e.target.value)}/>
              <label>Review</label>
              <textarea placeholder="Say us something about this place"
              onChange={(e)=>setDesc(e.target.value)}></textarea>
              <label>Rating</label>
              <select onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>

                <option value="3">3</option>

                <option value="4">4</option>

                <option value="5">5</option>

              </select>
              <button className="submitButton" type="submit">Add Pin</button>
            </form>
            
            </div></Popup>)}
            {currentUser? (<button  className="button logout" onClick={handleLogout}>Logout</button>): ( 
            <div className="buttons">
            <button className="button login" onClick={()=>setShowLogin(true)}>Login</button>

            <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
            </div>)}
           {showRegister &&
<Register setShowRegister={setShowRegister}/>}
{showLogin && <Login setShowLogin={setShowLogin} 
setCurrentUser={setCurrentUser}
myStorage={myStorage}/>}
</ReactMapGL>
    </div>
  );
}

export default App;
