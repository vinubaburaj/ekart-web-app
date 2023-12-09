import React, {useEffect, useState} from "react";
import {Button, IconButton, Paper, TextField, Typography} from "@mui/material";
import './index.css';
import {Add, Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {
  createProduct,
  findProductById,
  updateProduct
} from "../Products/service";
import {useNavigate, useParams} from "react-router-dom";
import {Roles} from "../../Constants/roles";

function AddProduct() {
  const navigate = useNavigate();
  const productToEditId = useParams().productId;
  const [editMode, setEditMode] = useState(!!productToEditId);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const role = useSelector((state) => state.userReducer.role);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    images: [''],
    thumbnail: '',
    id: Math.floor(100000 + Math.random() * 900000),
    sellerId: '',
    rating: 0,
  });

  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [brandErr, setBrandErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [imagesErr, setImagesErr] = useState(false);
  const [titleErrMsg, setTitleErrMsg] = useState('');
  const [descriptionErrMsg, setDescriptionErrMsg] = useState('');
  const [priceErrMsg, setPriceErrMsg] = useState('');
  const [brandErrMsg, setBrandErrMsg] = useState('');
  const [categoryErrMsg, setCategoryErrMsg] = useState('');
  const [imagesErrMsg, setImagesErrMsg] = useState('');
  const [imagesField, setImagesField] = useState(['']);
  const addHeading = "Add a new Product";
  const editHeading = "Edit Product";
  console.log(editMode);

  useEffect(() => {
    if (role !== Roles.SELLER) {
      navigate('/Unauthorized');
    }
    if (currentUser) {
      setNewProduct({...newProduct, sellerId: currentUser._id});
    }
    if (editMode) {
      fetchProductToEdit();
    }
  }, [currentUser, editMode]);

  const fetchProductToEdit = async () => {
    console.log(productToEditId);
    const product = await findProductById(productToEditId);
    setImageFieldsArray(product);
    setNewProduct(product);
  }

  const setImageFieldsArray = (product) => {
    let imagesFields = [];
    for (let i = 0; i < product.images.length; i++) {
      imagesFields.push('');
    }
    setImagesField(imagesFields);
  }

  const addImageField = () => {
    setImagesField([...imagesField, '']);
  }

  const removeImageField = (index) => {
    let images = [...newProduct.images];
    images.splice(index, 1);
    setNewProduct({...newProduct, images: images});
    let imagesFields = [...imagesField];
    imagesFields.splice(index, 1);
    setImagesField(imagesFields);
  }

  const setImageToProductObject = (index, value) => {
    let images = [...newProduct.images];
    images[index] = value;
    setNewProduct({...newProduct, images: images});
  }

  const AddButton = () => (
      <IconButton onClick={addImageField} color="primary.main">
        <Add/>
      </IconButton>
  );

  const DeleteButton = () => (
      <IconButton onClick={removeImageField} color={'error'}>
        <Delete/>
      </IconButton>
  );

  const addProduct = async () => {
    setNewProduct({...newProduct, thumbnail: newProduct.images[0]});
    if (!validateFields()) {
      return;
    }
    const response = await createProduct(newProduct);
    console.log(response);
    navigate('/Home');
  }

  const editProduct = async () => {
    const response = await updateProduct(productToEditId, newProduct);
    if (response.status) {
      // TODO show error
    }
    navigate('/Products');
    console.log(response);
  }

  const validateFields = () => {
    if (newProduct.title === '' || newProduct.category === ''
        || newProduct.description === ''
        || newProduct.brand === '' || newProduct.price === ''
        || (newProduct.images.length === 1 && newProduct.images[0] === '')) {
      if (newProduct.title === '') {
        setTitleErrMsg('Enter title');
        setTitleErr(true);
      }
      if (newProduct.description === '') {
        setDescriptionErrMsg('Enter description');
        setDescriptionErr(true);
      }
      if (newProduct.category === '') {
        setCategoryErrMsg('Enter category');
        setCategoryErr(true);
      }
      if (newProduct.brand === '') {
        setBrandErrMsg('Enter brand');
        setBrandErr(true);
      }
      if (newProduct.price === '') {
        setPriceErrMsg('Enter price');
        setPriceErr(true);
      }
      if (newProduct.images.length === 1 && newProduct.images[0] === '') {
        setImagesErrMsg('Add at least one image');
        setImagesErr(true);
      }
      return false;
    }
    return true;
  }

  return (
      <div className={'m-3'}>
        <div className={'row'}>
          <div className={'col-12 col-md-6'}>
            <Paper elevation={3} className={'p-3'}>
              <div className={'pt-1 pe-3 ps-3 pb-3'}>
                <div className={'fs-1 d-flex justify-content-center pt-0 mb-2'}>
                  {!editMode && addHeading}
                  {editMode && editHeading}
                </div>
                <TextField label="Title" variant={'outlined'}
                           id={'title'}
                           value={newProduct.title}
                           error={titleErr}
                           helperText={titleErr ? titleErrMsg : ''}
                           onFocus={() => {
                             setTitleErr(false)
                           }}
                           InputLabelProps={{shrink: newProduct.title !== ''}}
                           onChange={(e) => setNewProduct(
                               {...newProduct, title: e.target.value})}/>
                <TextField label={'Description'} multiline minRows={3}
                           maxRows={5}
                           error={descriptionErr}
                           helperText={descriptionErr ? descriptionErrMsg : ''}
                           InputLabelProps={{
                             shrink: newProduct.description !== ''
                           }}
                           onFocus={() => {
                             setDescriptionErr(false)
                           }}
                           className={'form-control mt-3'}
                           value={newProduct.description}
                           placeholder={'Description'}
                           onChange={(e) => setNewProduct(
                               {...newProduct, description: e.target.value})}/>
                <TextField label="Price $" variant={'outlined'} type={'number'}
                           value={newProduct.price}
                           error={priceErr}
                           helperText={priceErr ? priceErrMsg : ''}
                           onFocus={() => {
                             setPriceErr(false)
                           }}
                           InputLabelProps={{shrink: newProduct.price !== ''}}
                           className={'mt-3 d-block'}
                           onChange={(e) => setNewProduct(
                               {...newProduct, price: e.target.value})}/>
                <TextField label="Brand" variant={'outlined'}
                           value={newProduct.brand}
                           error={brandErr}
                           helperText={brandErr ? brandErrMsg : ''}
                           InputLabelProps={{shrink: newProduct.brand !== ''}}
                           onFocus={() => {
                             setBrandErr(false)
                           }}
                           className={'mt-3 d-block'}
                           onChange={(e) => setNewProduct(
                               {...newProduct, brand: e.target.value})}/>
                <TextField label="Category" variant={'outlined'}
                           value={newProduct.category}
                           error={categoryErr}
                           InputLabelProps={{
                             shrink: newProduct.category !== ''
                           }}
                           helperText={categoryErr ? categoryErrMsg : ''}
                           onFocus={() => {
                             setCategoryErr(false)
                           }}
                           className={'mt-3 d-block'}
                           onChange={(e) => setNewProduct(
                               {...newProduct, category: e.target.value})}/>
                {imagesField.map((image, index) => (
                    <TextField fullWidth label="Image URL" variant={'outlined'}
                               InputLabelProps={{
                                 shrink: newProduct.images[index] !== ''
                               }}
                               value={newProduct.images[index]}
                               error={imagesErr}
                               helperText={imagesErr ? imagesErrMsg : ''}
                               onFocus={() => {
                                 setImagesErr(false)
                               }}
                               key={index}
                               className={'mt-3'}
                               onChange={(e) => setImageToProductObject(index,
                                   e.target.value)}
                               InputProps={{
                                 endAdornment: <>{index === (imagesField.length
                                         - 1)
                                     && <AddButton/>}{(index !== 0
                                         && imagesField.length > 1) &&
                                     <DeleteButton/>}</>
                               }}/>
                ))}
                <Typography sx={{fontsize: 14}} mt={1}
                            color="text.secondary">
                  Add at least one image by providing its URL. You can use <a
                    href={'https://picsum.photos/'}>Lorem Picsum</a> for dummy
                  images.
                </Typography>
                {!editMode && <Button variant="contained" className={'mt-3'}
                                      onClick={addProduct}>Add
                  Product</Button>}
                {editMode && <Button variant="contained" className={'mt-3'}
                                     onClick={editProduct}>Update
                  Product</Button>}
              </div>
            </Paper>
          </div>
          <div className={'d-sm-none d-md-block col-md-6'}>
            <div
                className={'d-flex flex-column justify-content-center align-items-center'}>
              <div className={'fs-4 p-5 mt-3'}>Every detail counts! Dive into
                the
                specifics of your product, and let's make sure it stands out in
                the crowded online marketplace.
              </div>
              <img
                  src={'https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_1280.jpg'}
                  className={'m-3'}
                  width={'700px'}
                  height={'400px'}
                  alt={'store-img'}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddProduct;