/* eslint-disable no-alert */
// calls giphy api

export default async function getGiphy(weather) {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=GEpdyjLE0E10lCL1jkNj7enLQNvbS7ta&s=${weather}`;
  try {
    const response = await fetch(url, { mode: "cors" });
    const jsonResponse = await response.json();
    return jsonResponse.data.images.original.url;
  } catch {
    return "";
  }
}
