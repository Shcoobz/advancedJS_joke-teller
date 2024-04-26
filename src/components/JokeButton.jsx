import { useState } from 'react';
import PropTypes from 'prop-types';
import { getJoke } from '../api/jokeService';
import VoiceRSS from '../api/voiceService';

function JokeButton({ setJokeText }) {
  const [disabled, setDisabled] = useState(false);

  const handleJoke = async () => {
    setDisabled(true);
    const jokeResponse = await getJoke();

    if (jokeResponse) {
      const jokeText = jokeResponse.audioSrc;

      console.log('Tell me a joke:', jokeText);
      setJokeText(jokeText);

      VoiceRSS.speech({
        text: jokeText,
        callback: (audioUrl) => {
          const audioElement = new Audio(audioUrl);
          audioElement
            .play()
            .then(() => {
              audioElement.onended = () => setDisabled(false);
            })
            .catch((error) => {
              console.error('Error playing the audio:', error);
              setDisabled(false);
            });
        },
      });
    } else {
      setDisabled(false);
    }
  };

  return (
    <>
      <button id='button' disabled={disabled} onClick={handleJoke}>
        Tell Me A Joke
      </button>
    </>
  );
}

JokeButton.propTypes = {
  setJokeText: PropTypes.func.isRequired,
};

export default JokeButton;
