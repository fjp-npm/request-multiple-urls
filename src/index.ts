import axios, {AxiosResponse} from 'axios';

/**
 * This function will asynchronously fetch JSON data from a collection of urls that are provided as input.
 * Only valid JSON responses from individual urls are added to the returned array.
 *
 * @param urls Urls for endpoints where JSON data is expected to be returned
 * @returns JSON data from the url endpoints
 */
export default async function requestMultipleUrls(urls: string[]): Promise<Object[]> {
  return new Promise<Object[]>(async function (resolve, reject) {
    try {
      const result: Object[] = [];
      for (const url of urls) {
        // The transformResponse config allows the raw response to be returned instead of the default 'JSONified' value
        const response: AxiosResponse = await axios.get(url, {transformResponse: []});
        try {
          // Add data to array only if valid JSON is returned
          result.push(JSON.parse(response.data));
        } catch {
          // Merely log when response is not valid JSON because this is considered expected behaviour
          console.debug(`Unable to get valid JSON data from ${url}`);
        }
      }
      resolve(result);
    } catch (err) {
      reject(new Error(`There was an error processing the urls \n ${err}`));
    }
  });
}


