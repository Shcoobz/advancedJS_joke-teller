import { useState } from 'react';
import { getJoke } from '../api/jokeService';

function JokeButton() {
  const [audioSrc, setAudioSrc] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleJoke = async () => {
    setDisabled(true);
    const joke = await getJoke();

    if (joke) {
      const audio = new Audio(joke.audioSrc);
      setAudioSrc(joke.audioSrc);
      audio.play();
      audio.onended = () => setDisabled(false);
    }
  };

  return (
    <>
      <button id='button' disabled={disabled} onClick={handleJoke}>
        Tell Me A Joke
      </button>
      <audio id='audio' controls hidden src={audioSrc}></audio>
    </>
  );
}

export default JokeButton;
