import React, {useEffect, useState} from "react";
import {Button, IconButton, Paper, TextField, Typography} from "@mui/material";
import './index.css';
import {Add, Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {createProduct} from "../Products/service";
import {useNavigate} from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    images: [''],
    thumbnail: '',
    id: Math.floor(100000 + Math.random() * 900000),
    sellerId: ''
  });

  useEffect(() => {
    if (currentUser) {
      setNewProduct({...newProduct, sellerId: currentUser._id});
    }
  }, [currentUser]);

  const [imagesField, setImagesField] = useState(['']);

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
    const response = await createProduct(newProduct);
    console.log(response);
    navigate('/Home');
  }

  return (
      <div className={'m-3'}>
        <Paper elevation={3} className={'p-3 w-50'}>
          <div className={'pt-1 pe-3 ps-3 pb-3'}>
            <div className={'fs-1 d-flex justify-content-center pt-0 mb-2'}>Add
              a new Product
            </div>
            <TextField label="Title" variant={'outlined'}
                       onChange={(e) => setNewProduct(
                           {...newProduct, title: e.target.value})}/>
            <textarea className={'form-control mt-3'}
                      placeholder={'Description'} rows={3}
                      onChange={(e) => setNewProduct(
                          {...newProduct, description: e.target.value})}/>
            <TextField label="Price $" variant={'outlined'} type={'number'}
                       className={'mt-3 d-block'}
                       onChange={(e) => setNewProduct(
                           {...newProduct, price: e.target.value})}/>
            <TextField label="Brand" variant={'outlined'}
                       className={'mt-3 d-block'}
                       onChange={(e) => setNewProduct(
                           {...newProduct, brand: e.target.value})}/>
            <TextField label="Category" variant={'outlined'}
                       className={'mt-3 d-block'}
                       onChange={(e) => setNewProduct(
                           {...newProduct, category: e.target.value})}/>
            {imagesField.map((image, index) => (
                <TextField fullWidth label="Image URL" variant={'outlined'} key={index}
                           className={'mt-3'}
                           onChange={(e) => setImageToProductObject(index,
                               e.target.value)}
                           InputProps={{
                             endAdornment: <>{index === (imagesField.length - 1)
                                 && <AddButton/>}{(index !== 0 && imagesField.length > 1) &&
                                 <DeleteButton/>}</>
                           }}/>
            ))}
            <Typography sx={{fontsize: 14}} mt={1}
                        color="text.secondary">
              Add at least one image by providing its URL. You can use <a
                href={'https://picsum.photos/'}>Lorem Picsum</a> for dummy
              images.
            </Typography>
            <Button variant="contained" className={'mt-3'} onClick={addProduct}>Add
              Product</Button>
          </div>
        </Paper>
      </div>
  )
}

export default AddProduct;