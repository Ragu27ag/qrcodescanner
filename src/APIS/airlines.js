async function airlines(company) {
  console.log(company);
  const url = `https://airlines-by-api-ninjas.p.rapidapi.com/v1/airlines?iata=${company}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "782eb993a4msh1fd1ebb476f0c78p14e337jsnb2b5077a02e2",
      "X-RapidAPI-Host": "airlines-by-api-ninjas.p.rapidapi.com",
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
