import axios from "axios";

const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    const response = await axios.get(apiUrl);

    // Handle the response from the external API as needed
    const searchData = response.data;

    res.status(200).json({ message: "Search successful", data: searchData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { searchProducts };
