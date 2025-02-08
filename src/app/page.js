"use client"
import { useState } from 'react'
import FallingHearts from './fallingHearts'


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
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 z-50">
        <div></div>
        <FallingHearts />
          <div className="bg-pink-100 m-5 p-8 rounded-2xl shadow-xl border-4 border-pink-300 text-center">
            <h1 className="text-3xl font-bold mb-4 text-pink-700">
              Yay! pta tha tum maan jaogi! 💐
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
    <div className={"min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 p-4"}>
      <div className={accepted? "hidden" : "bg-white m-5 p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4"}>
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
    </div>
  )
}
