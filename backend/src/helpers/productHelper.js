export const mergeAndFilterProducts = (dbProducts, apiProducts) => {
  // If either array is empty, return the non-empty array
  if (dbProducts.length === 0) {
    return apiProducts;
  }

  if (apiProducts.length === 0) {
    return dbProducts;
  }

  const mergedProducts = [...dbProducts];

  for (const apiProduct of apiProducts) {
    // Check if the product title already exists in the merged products
    const isDuplicate = mergedProducts.some(
      (dbProduct) => dbProduct.title === apiProduct.title
    );

    // If not a duplicate, add it to the merged products
    if (!isDuplicate) {
      mergedProducts.push(apiProduct);
    }
  }

  return mergedProducts;
};
