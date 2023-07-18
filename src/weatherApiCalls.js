/* eslint-disable no-alert */
// calls weather
export async function getWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=1993af061892439c967172424231207&q=${location}`;
    try {
        const response = await fetch(url, { mode: "cors" });
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch {
        //   alert("Failed to find a gif for that word!");
        console.log(`Failed to find city ${location}!`);
        return {};
    }
}

export function processWeather(weatherData) {
    if (Object.keys(weatherData).length === 0) {
        return weatherData
    }

    return {
        condition: weatherData.current.condition,
        name: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
        temp_f: weatherData.current.temp_f,
        temp_c: weatherData.current.temp_c,
        feelslike_f: weatherData.current.feelslike_f,
        feelslike_c: weatherData.current.feelslike_c,
        wind_mph: weatherData.current.wind_mph,
        wind_kph: weatherData.current.wind_kph,
        is_day: weatherData.current.is_day,        
    };
}


// console.log(getWeather("can").then((response) => {if (response) console.log(processWeather(response))}));
//