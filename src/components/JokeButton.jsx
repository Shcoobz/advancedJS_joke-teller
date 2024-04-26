import { useState } from 'react';
import PropTypes from 'prop-types';
import { getJoke } from '../api/jokeService';
import VoiceRSS from '../api/voiceService';

function JokeButton({ setJokeText, setAudioUrl }) {
  const [disabled, setDisabled] = useState(false);

  const handleJoke = async () => {
    setDisabled(true);
    const jokeResponse = await getJoke();

    if (jokeResponse) {
      const jokeText = jokeResponse.audioSrc;

      setJokeText(jokeText);

      VoiceRSS.speech({
        text: jokeText,
        callback: (audioUrl) => {
          setAudioUrl(audioUrl);
          setDisabled(false);
        },
      });
    } else {
      setDisabled(false);
    }
  };

  return (
    <button id='button' disabled={disabled} onClick={handleJoke}>
      Tell Me A Joke
    </button>
  );
}

JokeButton.propTypes = {
  setJokeText: PropTypes.func.isRequired,
  setAudioUrl: PropTypes.func.isRequired,
};

export default JokeButton;
