import JokeButton from './components/JokeButton';
import robotGif from '../assets/robot.gif';

function App() {
  return (
    <div className='container' style={{ backgroundImage: `url(${robotGif})` }}>
      <JokeButton />
    </div>
  );
}

export default App;
