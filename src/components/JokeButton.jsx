/**
 * Component representing a button to fetch and display jokes.
 * @module JokeButton
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { getJoke } from '../api/jokeService';
import VoiceRSS from '../api/voiceService';

/**
 * Function component representing the joke button.
 * @param {Object} props - Component props.
 * @param {Function} props.setJokeText - Function to set the joke text.
 * @param {Function} props.setAudioUrl - Function to set the audio URL.
 * @returns {JSX.Element} - JSX element representing the joke button.
 */
function JokeButton({ setJokeText, setAudioUrl }) {
  /**
   * State hook for button disable state.
   * @const {boolean} disabled - Flag indicating if the button is disabled.
   * @function setDisabled - Function to update the disabled state.
   */
  const [disabled, setDisabled] = useState(false);

  /**
   * Asynchronous function to handle fetching and displaying a joke.
   * @async
   */
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
