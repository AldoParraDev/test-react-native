const API_KEY = "c09c2a5662b345b5a71fbf11a904c4d7";

export async function getLatestGames() {
  const LATEST_GAMES = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic`;

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json();

  const { results } = json;

  return results.map((item) => {
    const {
      name: description,
      slug,
      released: releaseDate,
      background_image: image,
      rating: score,
      name: title,
    } = item;

    return {
      description,
      releaseDate,
      score,
      slug,
      title,
      image,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://api.rawg.io/api/games/${slug}?key=${API_KEY}`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const {
    name: title,
    background_image: img,
    description,
    rating: score,
  } = json;

  return {
    img,
    title,
    slug,
    description,
    score,
  };
}
