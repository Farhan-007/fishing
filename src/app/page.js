"use client"
import { useRef, useState } from 'react'
import FallingHearts from './fallingHearts'
import Image from 'next/image'


// Array of cute GIF URLs for the main card.
const cuteGifs = [
  '/assets/image1.webp',
  '/assets/image2.webp',
  '/assets/image3.webp',
  '/assets/image4.webp',
]

// Playful texts for the No button that cycle on each press.
const noButtonTexts = [
  "Naa!",
  "aaj nahi!",
  "agli baar",
  "Nahi",
  "Bilkul nahi!"
]

// Excited GIF for the popup once she accepts.
const excitedGif = '/assets/won1.webp'

export default function Home() {
  // Whether she accepted (Yes button was pressed)
  const [accepted, setAccepted] = useState(false)
  // Current GIF shown on the main card.
  const [currentGif, setCurrentGif] = useState(cuteGifs[0])
  // Scale for the Yes button (grows on each click)
  const [yesScale, setYesScale] = useState(1)
  // Scale for the No button (shrinks on each click, down to a minimum)
  const [noScale, setNoScale] = useState(1)
  // Index to cycle through the No button texts.
  const [noTextIndex, setNoTextIndex] = useState(0)

  // Change the displayed GIF to a random one from our list.
  const changeGif = () => {
    const randomGif = cuteGifs[Math.floor(Math.random() * cuteGifs.length)]
    setCurrentGif(randomGif)
  }

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Toggle play/pause state of the audio.
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handler for when the Yes button is pressed.
  const handleYesClick = () => {
    changeGif()
    // setYesScale(prev => prev + 0.1)
    // After a short delay, show the popup.
    setTimeout(() => {
      setAccepted(true)
    }, 300)
  }

  // Handler for when the No button is pressed.
  const handleNoClick = () => {
    changeGif()
    setNoScale(prev => {
      const newScale = prev - 0.1
      return newScale < 0.5 ? 0.5 : newScale
    })
    setYesScale(prev => prev + 0.1)
    setNoTextIndex(prev => (prev + 1) % noButtonTexts.length)
  }

  // If accepted is true, render the flowers popup with an excited GIF.
  if (accepted) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 z-50">
          <div></div>
          <FallingHearts />
          <div className=" z-[60] bg-white/20 backdrop-blur-lg  border-opacity-30 m-5 p-6 rounded-2xl shadow-xl border border-white text-center">
            <h1 className="text-3xl font-bold mb-4 text-pink-700">
              Yay! pta tha tum maan jaogi! 💐
              <p>kawaii 🥰</p>
            </h1>
            <img
              src={excitedGif}
              alt="Excited Gif"
              className="w-72 h-72 object-cover mx-auto rounded-xl"
            />
          </div>
        </div>
      </>
    )
  }

  // Main screen with the cute GIF and buttons.
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 overflow-hidden">
      {/* Hidden audio element controlled by React */}
      <audio ref={audioRef} src="/assets/music.mp3" loop />

      {/* Music Control Button */}
      <button
        onClick={handlePlayPause}
        className="absolute top-4 right-4 px-4 py-2  text-black rounded-full shadow-md hover:bg-gray"
      >
        {isPlaying ?
          <Image src="/mute.svg" alt="Example Icon" width={32} height={32} /> :
          <Image src="/unmute.svg" alt="Example Icon" width={24} height={24} />
        }
        {/* <Image src="/mute.svg" alt="Example Icon" width={32} height={32} /> 
        <Image src="/unmute.svg" alt="Example Icon" width={24} height={24} /> */}

      </button>


      {/* Animated Balls Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ball ball-1" />
        <div className="ball ball-2" />
        <div className="ball ball-3" />
        <div className="ball ball-4" />
        <div className="ball ball-5" />
      </div>

      {/* Glass Card */}
      <div
        className={
          accepted
            ? "hidden"
            : "relative z-10 bg-white/20 backdrop-blur-lg border border-white border-opacity-30 m-5 p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-4"
        }
      >
        <h1 className="text-2xl font-bold text-pink-600 text-center">
          movie chalogi mere saath? 🎬
        </h1>
        <img
          src={currentGif}
          alt="Cute Gif"
          className="w-64 h-64 object-cover rounded-xl"
        />
        <div className="flex gap-1">
          <button
            onClick={handleYesClick}
            style={{ transform: `scale(${yesScale})` }}
            className="px-6 py-2 bg-green-400 text-white font-bold rounded-full transition-transform duration-200 shadow-md hover:shadow-lg"
          >
            Yes
          </button>
          <button
            onClick={handleNoClick}
            style={{ transform: `scale(${noScale})` }}
            className="px-6 py-2 bg-red-400 text-white font-bold rounded-full transition-transform duration-200 shadow-md hover:shadow-lg"
          >
            {noButtonTexts[noTextIndex]}
          </button>
        </div>
      </div>

      {/* Custom CSS for the balls background */}
      <style jsx>{`
    .ball {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      animation: float 6s ease-in-out infinite;
    }
    .ball-1 {
      width: 50px;
      height: 50px;
      top: 10%;
      left: 20%;
      animation-delay: 0s;
    }
    .ball-2 {
      width: 80px;
      height: 80px;
      top: 50%;
      left: 70%;
      animation-delay: 1s;
    }
    .ball-3 {
      width: 40px;
      height: 40px;
      top: 80%;
      left: 30%;
      animation-delay: 2s;
    }
    .ball-4 {
      width: 60px;
      height: 60px;
      top: 30%;
      left: 80%;
      animation-delay: 3s;
    }
    .ball-5 {
      width: 100px;
      height: 100px;
      top: 60%;
      left: 10%;
      animation-delay: 4s;
    }
    @keyframes float {
      0% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(20px, -20px);
      }
      100% {
        transform: translate(0, 0);
      }
    }
  `}</style>
    </div>


  )
}
