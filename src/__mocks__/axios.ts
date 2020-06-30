// Mocks the axios get function to support isolated testing
const get = (url: string) => {
  if (url === 'https://no-json.com') {
    // Response does not return valid JSON
    return Promise.resolve({ data: `This is not JSON ${url}` });
  }
  // Returns valid JSON
  return Promise.resolve({ data: `{"data": "${url}"}` });
};
exports.get = get;
