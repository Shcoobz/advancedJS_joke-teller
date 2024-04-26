import { useState, useRef, useEffect } from 'react';
import JokeButton from './components/JokeButton';
import AnimatedTextDisplay from './components/AnimatedTextDisplay';
import robotGif from '../assets/robot.gif';

function App() {
  const [jokeText, setJokeText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(new Audio());

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
