import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedTextDisplay = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  const intervalRef = useRef(null); // Reference to store the interval ID

  useEffect(() => {
    // Function to start the text animation
    const startAnimation = () => {
      clearInterval(intervalRef.current); // Clear any existing interval
      setDisplayedText(''); // Reset the displayed text
      index.current = 0; // Reset index to start from the beginning of the new text

      intervalRef.current = setInterval(() => {
        if (index.current < text.length) {
          const nextChar = text.charAt(index.current);
          setDisplayedText((displayedText) => displayedText + nextChar);
          index.current++;
        } else {
          clearInterval(intervalRef.current);
        }
      }, speed);
    };

    startAnimation();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return <div className='animated-text'>{displayedText}</div>;
};

AnimatedTextDisplay.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

export default AnimatedTextDisplay;
