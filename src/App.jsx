/**
 * Main component of the application responsible for rendering UI and managing state.
 * @module App
 */

import { useState, useRef, useEffect } from 'react';
import JokeButton from './components/JokeButton';
import AnimatedTextDisplay from './components/AnimatedTextDisplay';
import robotGif from '../assets/robot.gif';

/**
 * Main function component representing the entire application.
 * @returns {JSX.Element} - JSX element representing the application UI.
 */
function App() {
  /**
   * State hook for storing the current joke text.
   * @const {string} jokeText - The current joke text.
   * @function setJokeText - Function to update the joke text state.
   */
  const [jokeText, setJokeText] = useState('');

  /**
   * State hook for storing the current audio URL.
   * @const {string} audioUrl - The current audio URL.
   * @function setAudioUrl - Function to update the audio URL state.
   */
  const [audioUrl, setAudioUrl] = useState('');

  /**
   * Reference to the audio element for playing audio.
   * @const {object} audioRef - Reference object for the audio element.
   */
  const audioRef = useRef(new Audio());

  /**
   * Effect hook to handle changes in the audio URL.
   */
  useEffect(() => {
    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current
        .play()
        .catch((error) => console.error('Error playing the audio:', error));
    }
  }, [audioUrl]);

  return (
    <div className='container' style={{ backgroundImage: `url(${robotGif})` }}>
      <JokeButton setJokeText={setJokeText} setAudioUrl={setAudioUrl} />
      {jokeText && (
        <AnimatedTextDisplay text={jokeText} audioElement={audioRef.current} />
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
}

export default App;
