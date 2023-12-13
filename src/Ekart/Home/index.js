import {useSelector} from "react-redux";
import {useAuth} from "../../AuthContext";
import SellerHome from "../Seller/sellerHome";
import AdminHome from "../Admin/adminHome";
import {Roles} from "../../Constants/roles";
import {findRandomProducts, searchProductsByTitle} from "../Products/service";
import React, {useEffect, useState} from "react";
import ProductCard from "../Products/product-card";
import Carousel from "react-material-ui-carousel";
import {Link, useNavigate} from "react-router-dom";
import {Button, Card, CardActionArea} from "@mui/material";

function Home() {
  const {user} = useAuth();
  const role = useSelector((state) => state.userReducer.role);
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const searchTerm = useSelector((state) => state.userReducer.currentUser?.prevSearch);
  const navigate = useNavigate();

  const getProductsByPrevSearch = async () => {
    if (!searchTerm) {
      return;
    }
    const response = await searchProductsByTitle(searchTerm);
    setProducts(response);
  }

  const getRandomProducts = async () => {
    const response = await findRandomProducts(navigate);
    setRandomProducts(response);
  }

  useEffect(() => {
    if (role !== Roles.SELLER) {
      getRandomProducts();
    }
    if (user && role === Roles.BUYER) {
      getProductsByPrevSearch();
    }
  }, [user, role]);

  return (
      <>
        {user && role === Roles.SELLER && <SellerHome/>}
        {user && role === Roles.ADMIN && <AdminHome/>}
        {role !== Roles.SELLER && (
            <div className={'mt-4'}>
              <div className={"fs-1 d-flex justify-content-center"}>Welcome
                to <div className={'wd-primary-color ms-1'}> E-kart!</div>
              </div>
              <div className={'m-2 p-2'}>
                <div className={'d-flex flex-row align-items-center'}>
                  <div className={'fs-3'}>Check out these latest deals or</div>
                  <Link to={'/Products'}>
                    <Button variant={'contained'} className={'mx-3'}
                            color={'primary'}>
                      View All Products
                    </Button>
                  </Link>
                </div>
                <hr/>
                {randomProducts && <div className={'row mx-3'}>
                  <Card className={'p-2'}>
                    <Carousel swipe={true} animation={"slide"}
                              interval={6000}>
                      {randomProducts.map((product) => (
                          <Link key={product.id}
                                to={`/Products/${product.id}`}
                                style={{textDecoration: "none"}}>
                            <CardActionArea
                                className="d-flex flex-column justify-content-center">
                              <div className={'fs-4'}>{product.title}</div>
                              <img
                                  style={{height: "400px", width: "600px"}}
                                  key={product.id}
                                  srcSet={`${product.thumbnail}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                  src={`${product.thumbnail}?w=248&fit=crop&auto=format`}
                                  alt={product.title}
                                  loading="lazy"
                              />
                            </CardActionArea>
                          </Link>
                      ))}
                    </Carousel>
                  </Card>
                </div>}
              </div>
            </div>
        )}
        {user &&
            (role === Roles.BUYER && (
                <div className={'mt-5 p-3'}>
                  {products.length > 0 && (
                      <div className={'m-2 p-2'}>
                        <div className={'fs-3'}>Still searching? Continue where
                          you left off!
                        </div>
                        <hr/>
                        <div className={'row'}>
                          {products.map((product) => (
                              <div
                                  className="col col-sm-6 col-md-4 col-lg-3 mb-3"
                                  key={product.id}
                              >
                                <ProductCard product={product}/>
                              </div>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
            ))}
      </>
  );
}

export default Home;