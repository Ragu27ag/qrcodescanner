async function airport(airport) {
  console.log(airport);
  const url = `https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?iata=${airport}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_AP, // "airports-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    console.log(url);
    const response = await fetch(url, options);
    console.log("res", response);
    const result = await response.json();
    console.log(result);
    return result[0].city;
  } catch (error) {
    console.error(error);
  }
}

export default airport;
