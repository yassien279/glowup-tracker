import axios from "axios";

// Store your API Key here (don't share it publicly!)
const API_KEY = "af619cec63mshcf5149b662b2a21p1e6135jsn90fa630ed05f"; // Replace with your key!

// Search Amazon products
export async function amazonSearch(searchTerm, country = "AE", page = 1) {
  try {
    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search',
      params: {
        query: searchTerm,
        country,
        page,
        // Don't include category_id or sort_by if you don't need them!
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    // RapidAPI returns data inside response.data.data.products
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data.products)
    ) {
      return response.data.data.products;
    } else {
      return [];
    }
  } catch (error) {
    console.error("API fetch error:", error.response?.data || error.message);
    throw error;
  }
}
