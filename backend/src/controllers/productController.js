import axios from "axios";

const PRODUCTS_URL = "https://dummyjson.com/products";

const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const searchUrl = `${PRODUCTS_URL}/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    // `https://dummyjson.com/products/search?q=${encodeURIComponent(
    //   searchTerm
    // )}`;
    const response = await axios.get(searchUrl);

    // Handle the response from the external API as needed
    const searchData = response.data;

    res.status(200).json({ message: "Search successful", data: searchData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await axios.get(PRODUCTS_URL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = await axios.get(
      `${PRODUCTS_URL}/${encodeURIComponent(productId)}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: `Error fetching product by id: ${req.params.productId}`,
      });
  }
};

export { searchProducts, getAllProducts, getProductById };
