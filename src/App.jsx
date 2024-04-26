import { useState } from 'react';
import JokeButton from './components/JokeButton';
import AnimatedTextDisplay from './components/AnimatedTextDisplay';
import robotGif from '../assets/robot.gif';

function App() {
  const [jokeText, setJokeText] = useState('');

  return (
    <div className='container' style={{ backgroundImage: `url(${robotGif})` }}>
      <JokeButton setJokeText={setJokeText} />
      {jokeText && <AnimatedTextDisplay text={jokeText} speed={50} />}
    </div>
  );
}

export default App;
