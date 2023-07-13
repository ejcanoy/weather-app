/* eslint-disable no-alert */
// calls giphy api

async function getGiphy(weather) {
  const img = document.querySelector("img");
  let url;
  if (weather === "") {
    alert("Gonna Generate an Image with CATS!!!!");
    url =
      "https://api.giphy.com/v1/gifs/translate?api_key=GEpdyjLE0E10lCL1jkNj7enLQNvbS7ta&s=cats";
  } else {
    url = `https://api.giphy.com/v1/gifs/translate?api_key=GEpdyjLE0E10lCL1jkNj7enLQNvbS7ta&s=${weather}`;
  }
  try {
    const response = await fetch(url, { mode: "cors" });
    const jsonResponse = await response.json();
    img.src = jsonResponse.data.images.original.url;
  } catch {
    alert("Failed to find a gif for that word!");
  }
  // catch
}
