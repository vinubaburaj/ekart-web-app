import * as userDao from '../dao/userDao.js'

export const addToWishlist = async (req, res) => {
  try {
    const product = req.body;
    const userId = req.session['currentUser']._id;
    const user = await userDao.findUserById(userId);
    if (user.wishlist.find((p) => p.id === product.id)) {
      return res.status(400).json({message: "Product already in wishlist"});
    }
    user.wishlist.push(product);
    await userDao.updateUser(userId, user);
    res.status(200).json(
        {message: 'Added to wishlist successfully', wishlist: user.wishlist});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    let userId = req.session['currentUser']._id;
    const user = await userDao.findUserById(userId);
    user.wishlist = user.wishlist.filter((p) => p.id !== productId);
    await userDao.updateUser(userId, user);
    res.status(200).json(
        {message: 'Removed from wishlist', wishlist: user.wishlist});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const getWishlist = async (req, res) => {
  try {
    const userId = req.session['currentUser']._id;
    const user = await userDao.findUserById(userId);
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const clearWishlist = async (req, res) => {
  try {
    const userId = req.session['currentUser']._id;
    const user = await userDao.findUserById(userId);
    user.wishlist = [];
    await userDao.updateUser(userId, user);
    res.status(200).json(
        {message: 'Wishlist cleared', wishlist: user.wishlist});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const moveToCart = async (req, res) => {
  try {
    const product = req.body;
    const userId = req.session['currentUser']._id;
    let user = await userDao.findUserById(userId);
    user = {
      ...user,
      wishlist: user.wishlist.filter((p) => p.id !== product.id),
    };
    user = addFromWishlistToCart(user, product);
    await userDao.updateUser(userId, user);
    res.status(200).json({
      message: 'Product moved to cart successfully',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const moveAllToCart = async (req, res) => {
  try {
    let userId = req.session['currentUser']._id;
    let user = await userDao.findUserById(userId);
    for (const product of user.wishlist) {
      user = addFromWishlistToCart(user, product);
    }
    user = {
      ...user,
      wishlist: []
    };
    await userDao.updateUser(userId, user);
    res.status(200).json(
        {message: 'Moved all to cart', wishlist: user.wishlist});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

const addFromWishlistToCart = (user, product) => {
  if (!user.cart.find((p) => p.id === product.id)) {
    user = {...user, cart: [...user.cart, product]};
  } else {
    user = {
      ...user,
      cart: user.cart.map((p) => {
        if (p.id === product.id) {
          return {...p, quantity: Math.min(p.quantity + 1, 4)};
        }
        return p;
      }),
    };
  }
  return user;
}


