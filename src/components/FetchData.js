export const setup = async (domainName) => {
  console.log(`${process.env.REACT_APP_API_URL}/login`)
  const token_response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        `${process.env.REACT_APP_USERNAME}-${process.env.REACT_APP_PASSWORD}`,
    },
  });
  const token = await token_response.json();

  const setup_response = await fetch(`${process.env.REACT_APP_API_URL}/setup`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
    body: JSON.stringify({
      domainName: domainName,
    }),
  });

  const setup_data = await setup_response.json();
  return [setup_data.url, token];
};

export const FetchData = async (token) => {
  const [seoResponse, usablityResponse, performanceResponse, socialResponse] =
    await Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/getOnPageSEOReport`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
      }),

      fetch(`${process.env.REACT_APP_API_URL}/getUsabilityReport`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
      }),

      fetch(`${process.env.REACT_APP_API_URL}/getPerformanceReport`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
      }),

      fetch(`${process.env.REACT_APP_API_URL}/getSocialReport`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
      }),
    ]);

  const [seoData, usablityData, performanceData, socialData] =
    await Promise.all([
      seoResponse.json(),
      usablityResponse.json(),
      performanceResponse.json(),
      socialResponse.json(),
    ]);
  return [seoData, usablityData, performanceData, socialData];
};
