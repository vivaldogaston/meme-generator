import logo from './logo.svg';
import './App.css';
import React, {useState} from "react"

function App() {
  const [topText,setTopText]= useState("")
  const [bottomText,setBottomText]= useState("")
  const [randomImg,setRandomImg]= useState("http://i.imgflip.com/1bij.jpg")
  const [alt,setAlt]= useState("")
  const [allMemeImgs,setAllMemeImgs]=useState([])
  fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes}=response.data
        setAllMemeImgs(memes)
  })
  const generate=(event)=>{
    event.preventDefault();
    const img= Math.floor(Math.random()*allMemeImgs.length)
      setRandomImg(allMemeImgs[img].url);
      setAlt(allMemeImgs[img].name);
  }

  return(
      <div>
        <h1>Meme Generator</h1>
        <form onSubmit={(event)=>generate(event)}>
          <input type="text" placeholder="Top text" name="topText" value={topText} onChange={(event)=>setTopText(event.target.value)}></input>
          <input type="text" placeholder="Bottom text" name="bottomText" value={bottomText} onChange={(event)=>setBottomText(event.target.value)}></input>
          <button type="submit">Generate</button>
        </form>
        <div className="meme">
          <img src={randomImg} alt={alt} width="600" height="500" />
          <label className="topText">{topText}</label>
          <label className="bottomText">{bottomText}</label>
        </div>
      </div>
  )
}

export default App;
