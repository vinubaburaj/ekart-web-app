import ProductCard from "../Products/product-card";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as service from "../Products/service";
import {setSellerProducts} from "./sellerProductsReducer";
import {useEffect} from "react";

function SellerProductsList() {
  const {searchTerm} = useParams();
  const dispatch = useDispatch();
  const products = useSelector(
      (state) => state.sellerProductsReducer.sellerProducts);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const fetchSellerProducts = async () => {
    const fetchedProducts = await service.getProductsBySeller();
    console.log(fetchedProducts);
    dispatch(setSellerProducts(fetchedProducts));
  }

  const searchSellerProducts = async (searchTerm) => {
    const fetchedProducts = await service.searchSellerProductsByTitle(
        currentUser?._id, searchTerm);
    dispatch(setSellerProducts(fetchedProducts));
  }

  useEffect(() => {
    if (currentUser) {
      if (searchTerm) {
        searchSellerProducts(searchTerm);
      } else {
        fetchSellerProducts();
      }
    }
  }, [searchTerm, currentUser]);

  return (
      <>
        {products.length === 0 && (
            <div className={'fs-2 m-2 p-2'}>No products found for
              "{searchTerm}"</div>
        )}
        {products.length > 0 && (<>
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

export default SellerProductsList;