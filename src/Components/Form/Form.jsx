import './Form.css'
// import memesData from '../../memesData'
import { useState, useEffect } from 'react'


export default function Form() {

    const [meme, setMeme] = useState(
        {
            topText: "MUSIC TODAY",
            bottomText: "90s MUSIC",
            randomImage: "https://i.imgflip.com/30b1gx.jpg",
        })
    

    function handleChange(event) {
        event.preventDefault()
        const {value, name} = event.target
        
        setMeme(prevState => {
            return {
                ...prevState,
                topText: name === "topText" ? value : prevState.topText,
                bottomText: name === "bottomText" ? value : prevState.bottomText,
            }
        })
    }


    const [allMemes, setAllMemes] = useState([])
    
    useEffect(() => {
        // console.log("effect ran")
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    
    function getMemeImage(event) {
        event.preventDefault()
        // the line (const memesArray = allMemes.data.memes) is not needed anymore 
        // as the allMemes useState above is accessing the
        // entire object as an array anyway
        // const memesArray = allMemes.data.memes
        const rand = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[rand].url
        setMeme(prevMeme => {
            return {
            ...prevMeme,
            randomImage: url
            }
        }
        )
    }


    return (
        <div>
            <form className="form">
            <div className='input--fields'>
                <input 
                    className="input--field" 
                    type="topText" 
                    name='topText'
                    id="topText"
                    onChange={handleChange}
                    placeholder="Shut up"
                    value={meme.topText}
                />
                <input 
                    className="input--field" 
                    type="text" 
                    name='bottomText' 
                    id="bottomText"
                    onChange={handleChange}
                    placeholder="and take my money"
                    value={meme.bottomText}
                />
            </div>
            <div className="submit-btn-div">
                <button 
                    className="submit-btn" 
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼️</button>
            </div>
        </form>
        <div className='meme'>
            <img src={meme.randomImage} alt="image here" />
            <h2 className='meme--text top'>{meme.topText}</h2>
            <h2 className='meme--text bottom'>{meme.bottomText}</h2>
        </div>
        </div>
    )   
}
