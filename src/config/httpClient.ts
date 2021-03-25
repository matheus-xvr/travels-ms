export default () => {
  const {
    TRAVEL_URL,
    TRAVEL_PATH,
    PRE_REQUEST_TIMEOUT,
  } = process.env;

  return {
    httpClient: {
      timeout: +PRE_REQUEST_TIMEOUT || 10000,
      travelService: {
        url: {
          base: TRAVEL_URL,
          path: TRAVEL_PATH,
        },
      },
    },
  };
};
