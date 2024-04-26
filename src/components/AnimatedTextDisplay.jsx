import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedTextDisplay = ({ text, audioElement }) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
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

    const handleLoadedMetadata = () => {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

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
