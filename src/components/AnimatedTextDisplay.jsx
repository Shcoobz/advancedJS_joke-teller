/**
 * Component responsible for displaying text in an animated manner synchronized with audio.
 * @module AnimatedTextDisplay
 */

import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Function component representing the animated text display.
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to display.
 * @param {HTMLAudioElement} props.audioElement - The audio element for synchronization.
 * @returns {JSX.Element} - JSX element representing the animated text display.
 */
const AnimatedTextDisplay = ({ text, audioElement }) => {
  /**
   * State hook for storing the currently displayed text.
   * @const {string} displayedText - The currently displayed text.
   * @function setDisplayedText - Function to update the displayed text state.
   */
  const [displayedText, setDisplayedText] = useState('');

  /**
   * Reference to the interval used for updating text display.
   * @const {object} intervalRef - Reference object for the interval.
   */
  const intervalRef = useRef(null);

  /**
   * Effect hook for managing text animation synchronization with audio playback.
   * @function useEffect
   * @param {Function} effect - Function containing the effect logic.
   * @param {Array} deps - Dependency array that triggers effect on change.
   */
  useEffect(() => {
    /**
     * Callback function to handle time updates of the audio element.
     * @callback handleTimeUpdate
     */
    const handleTimeUpdate = () => {
      if (audioElement.duration) {
        const charsPerSecond = text.length / audioElement.duration;
        const intervalDuration = 100;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
          const currentTime = audioElement.currentTime * charsPerSecond;
          const newIndex = Math.min(text.length, Math.floor(currentTime));
          setDisplayedText(text.substring(0, newIndex));
        }, intervalDuration);
      }
    };

    /**
     * Callback function to handle loaded metadata event of the audio element.
     * @callback handleLoadedMetadata
     */
    const handleLoadedMetadata = () => {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    /**
     * Component responsible for displaying text in an animated manner synchronized with audio.
     * @module AnimatedTextDisplay
     */
    return () => {
      clearInterval(intervalRef.current);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioElement, text]);

  return (
    <div className='animated-text-container'>
      <div className='animated-text'>{displayedText}</div>
    </div>
  );
};

AnimatedTextDisplay.propTypes = {
  text: PropTypes.string.isRequired,
  audioElement: PropTypes.instanceOf(HTMLAudioElement).isRequired,
};

export default AnimatedTextDisplay;
