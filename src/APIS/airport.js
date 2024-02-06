async function airport(airport) {
  console.log(airport);
  const url = `https://airports15.p.rapidapi.com/airports?iataCode=${airport}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_AIRPORT_HOST,
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
