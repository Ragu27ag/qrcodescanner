async function airlines(company) {
  console.log(company);
  const url = `https://airlines-by-api-ninjas.p.rapidapi.com/v1/airlines?iata=${company}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_HOST,
    },
  };

  try {
    console.log(url);
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result[0].name;
  } catch (error) {
    console.error(error);
  }
}

export default airlines;
