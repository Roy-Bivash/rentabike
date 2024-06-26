import config from '../config';

/**
 * Performs a fetch request to a specified URL, automatically appending the server URL from the configuration.
 * This function enriches the request with default headers, including 'Content-Type' set to 'application/json',
 * and, if available, adds an Authorization token from localStorage. It sends credentials with every request to support
 * sessions/cookies with cross-origin requests. The function is designed to handle JSON responses by default.
 *
 * @param {string} url - The endpoint URL to which the fetch request will be made. This URL is appended to the SERVER_URL defined in the application's configuration.
 * @param {Object} options - Optional settings that customize the request. This can include HTTP method (GET, POST, etc.), headers (additional to the default headers), body (for POST/PUT requests), etc.
 * @returns {Promise<Object>} A promise that resolves to an object with two properties:
 * - response: The parsed JSON response from the server if the request was successful and the response was in JSON format; otherwise null.
 * - error: An object containing the error message and status if the request failed; otherwise null. The function assumes the response content type is JSON. If the server responds with a different content type, consider modifying the function to handle such cases accordingly.
*/
export async function CustomFetch(url, options) {
    const headers = {
        "Content-Type": "application/json",
    };

    let responseJson, error = null;

    try {
        const response = await fetch(config.SERVER_URL + url, { 
            ...options, 
            headers: { ...headers, ...options.headers },
            credentials: 'include',
        });

        responseJson = await response.json();
    } catch (err) {
        error = { message: err.message, status: err.status || 'unknown' };
    }

    return { response: responseJson, error };
}