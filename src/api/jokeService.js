export async function getJoke() {
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      return { audioSrc: `${data.setup} ... ${data.delivery}` };
    } else {
      return { audioSrc: data.joke };
    }
  } catch (error) {
    console.error('Failed to fetch joke:', error);
    return null;
  }
}
