function fetch_mock (api_endpoint: string, requestOptions: any) {
  switch (api_endpoint) {
    case "/getTickList":
      return Promise.resolve({})
    case "/getTickDetail":
      return Promise.resolve({})
    default:
      return Promise.reject("404")
  }
}

export default fetch_mock
