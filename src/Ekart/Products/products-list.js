import ProductCard from "./product-card";
import * as service from "./service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as wishlistService from "../Wishlist/wishlistService";
import {useAuth} from "../../AuthContext";

function ProductsList() {
  const {user} = useAuth();
  const [products, setProducts] = useState([]);
  const {searchTerm} = useParams();
  const [wishlistItems, setWishlistItems] = useState([]);

  const searchProducts = async (searchTerm) => {
    const fetchedProducts = await service.searchProductsByTitle(searchTerm);
    setProducts(fetchedProducts);
  }

  const fetchAllProducts = async () => {
    const fetchedProducts = await service.findAllProducts();
    setProducts(fetchedProducts);
  }

  const fetchWishlistItems = async () => {
    const response = await wishlistService.getWishlist();
    setWishlistItems(response);
  }

  console.log(wishlistItems);

  useEffect(() => {
    if (searchTerm) {
      searchProducts(searchTerm);
    } else {
      fetchAllProducts();
    }
    if (user) {
      fetchWishlistItems();
    }
  }, [searchTerm, user]);

  return (
      <>
        {products?.length === 0 && (
            <div className={'fs-2 m-2 p-2'}>No products found for
              "{searchTerm}"</div>
        )}
        {products?.length > 0 && (<>
              {searchTerm && <div className={'fs-2 m-2 p-2'}>Search results for
                for "{searchTerm}"</div>}
              <div className="row">
                {products.map((product) => (
                    <div
                        className="col col-sm-6 col-md-4 col-lg-3 mb-3"
                        key={product.id}
                    >
                      <ProductCard product={product}/>
                    </div>
                ))}
              </div>
            </>
        )}
      </>
  );
}

export default ProductsList;

