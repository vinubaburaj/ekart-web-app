import {useSelector} from "react-redux";
import {Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import './index.css';

function SellerHome() {
  const user = useSelector((state) => state.userReducer.currentUser);
  console.log(user);
  return (
      <div className={'m-3'}>
        <div
            className={'fs-1 d-flex justify-content-center'}>Welcome, {user?.firstName}!
        </div>
        <div className={'fs-3 d-flex justify-content-center'}>What would you
          like to do today?
        </div>
        <div className={'d-none d-sm-block row mt-4'}>
          <div className={'d-flex justify-content-evenly'}>
            <Link to={'/Products'}>
              <Card sx={{maxWidth: 275, boxShadow: 3}}
                    className={'wd-min-card-width'}>
                <CardContent>
                  <Typography sx={{fontSize: 20, color: 'primary.main'}}
                              color="text.primary"
                              className={'d-flex justify-content-center'}>View
                    your Products</Typography>
                  <Typography sx={{fontsize: 14, fontStyle: "italic"}}
                              className={'d-flex justify-content-center'}
                              color="text.secondary">Added
                    by you</Typography>
                  <Typography sx={{fontsize: 16}} variant="body2" mt={2}>
                    Browse through the products you have added to the market.
                    Check the reviews and ratings to see how they are doing! You
                    can edit or delete them as you wish.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            <Link to={'/AddProduct'}>
              <Card sx={{maxWidth: 275, boxShadow: 3}}
                    className={'wd-min-card-width'}>
                <CardContent>
                  <Typography sx={{fontSize: 20, color: 'primary.main'}}
                              color="text.primary"
                              className={'d-flex justify-content-center'}>Add a
                    new Product</Typography>
                  <Typography sx={{fontsize: 14, fontStyle: "italic"}}
                              className={'d-flex justify-content-center'}
                              color="text.secondary">Added
                    by you</Typography>
                  <Typography sx={{fontsize: 16}} variant="body2" mt={2}>
                    Have something new to sell? Add it to the market and see how
                    it does! You can always edit or delete it later.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        <div className={'d-block d-sm-none row mt-4'}>
          <div className={'col'}>
            <Link to={'/Products'} className={'d-flex justify-content-center'}>
              <Card sx={{maxWidth: 275, boxShadow: 3}}
                    className={'wd-min-card-width'}>
                <CardContent>
                  <Typography sx={{fontSize: 20, color: 'primary.main'}}
                              color="text.primary"
                              className={'d-flex justify-content-center'}>View
                    your Products</Typography>
                  <Typography sx={{fontsize: 14, fontStyle: "italic"}}
                              className={'d-flex justify-content-center'}
                              color="text.secondary">Added
                    by you</Typography>
                  <Typography sx={{fontsize: 16}} variant="body2" mt={2}>
                    Browse through the products you have added to the market.
                    Check the reviews and ratings to see how they are doing! You
                    can edit or delete them as you wish.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className={'col mt-3'}>
            <Link to={'/AddProduct'} className={'d-flex justify-content-center'}>
              <Card sx={{maxWidth: 275, boxShadow: 3}}
                    className={'wd-min-card-width'}>
                <CardContent>
                  <Typography sx={{fontSize: 20, color: 'primary.main'}}
                              color="text.primary"
                              className={'d-flex justify-content-center'}>Add a
                    new Product</Typography>
                  <Typography sx={{fontsize: 14, fontStyle: "italic"}}
                              className={'d-flex justify-content-center'}
                              color="text.secondary">Added
                    by you</Typography>
                  <Typography sx={{fontsize: 16}} variant="body2" mt={2}>
                    Have something new to sell? Add it to the market and see how
                    it does! You can always edit or delete it later.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default SellerHome;