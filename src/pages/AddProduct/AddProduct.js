import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import './AddProduct.css';
import ImageIcon from '@mui/icons-material/Image';
import CircularProgress from '@mui/material/CircularProgress';
import { CategoryContext } from '../../context/categoryContext/categoryContext';
import { addNewCategory, getAllCategories } from '../../context/categoryContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { addNewProduct } from '../../context/productContext/apiCalls';
import { ProductContext } from '../../context/productContext/productContext';


const AddProduct = () => {
    const { admin } = useContext(AuthContext);
    const { dispatch: dispatchProduct, isFetching: fetchingProduct } = useContext(ProductContext);
    const { categories: dbCategories, dispatch: dispatchCategory, isFetching: fetchingCategory } = useContext(CategoryContext);

    // FormData States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [colors, setColors] = useState('');
    const [sizes, setSizes] = useState('');
    const [stock, setStock] = useState(0);
    const [inStock, setInstock] = useState(true);

    // Category States
    const [category, setCategory] = useState('');
    const [allCategory, setAllCategory] = useState([...dbCategories]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    // Thumbnail and Gallery States
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);


    const catListRef = useRef();
    const bottomRef = useRef();
    const history = useHistory();



    const galleryObj = [];
    const galleryBlobArray = [];
    const galleryFileArray = [];

    const handleAddNewCategory = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                token: admin.accessToken
            }
        }

        if (category !== '') {
            addNewCategory(dispatchCategory, { title: category.toLowerCase() }, config)
            getAllCategories(dispatchCategory);
            setAllCategory(dbCategories);
            setCategory('');
        }
    }

    const handleSelectCategory = (e) => {
        e.target.classList.toggle('selected');
        if (!selectedCategory.includes(e.target.innerText)) {
            setSelectedCategory([...selectedCategory, e.target.innerText]);
        } else {
            const filteredCat = selectedCategory.filter(cat => cat !== e.target.innerText);
            setSelectedCategory(filteredCat);
        }
    }

    const handleThumbnailChange = (e) => {
        setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
        setThumbnail(e.target.files[0]);
    }

    const handleGalleryChange = (e) => {
        galleryObj.push(e.target.files)

        for (let i = 0; i < galleryObj[0].length; i++) {
            galleryBlobArray.push(URL.createObjectURL(galleryObj[0][i]))
            galleryFileArray.push(galleryObj[0][i])
        }
        setGalleryImages(galleryBlobArray);
        setGallery(galleryFileArray)
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('colors', colors.toLowerCase());
    formData.append('sizes', sizes.toLowerCase());
    formData.append('categories', selectedCategory);
    formData.append('regularPrice', regularPrice);
    formData.append('salePrice', salePrice);
    formData.append('stock', stock);
    formData.append('inStock', inStock);
    formData.append('thumbnail', thumbnail);
    for (const item of gallery) {
        formData.append('gallery', item) // appending every file to formData
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: admin.accessToken
            }
        }

        console.log(selectedCategory)

        addNewProduct(dispatchProduct, formData, config, history);

    }


    useEffect(() => {
        setAllCategory(dbCategories)
    }, [dbCategories]);

    // const scrollToBottom = () => {
    //     bottomRef.current.scrollIntoView({
    //         behavior: "smooth",
    //         block: "start",
    //     });
    // };

    return (
        <>
            <Box
                component="div"
                className="page add_new"
            >
                <Box
                    component="div"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <h4 className="page_title">Add New Product</h4>
                </Box>


                <form
                    className="add_new_form"
                    onSubmit={handleSubmit}
                >
                    <Box
                        component={Paper}
                        className="add_new_wrapper"
                        sx={{
                            padding: '30px 20px'
                        }}
                    >
                        <Grid container spacing={4}>
                            <Grid
                                item
                                lg={8}
                                md={8}
                                sm={12}
                                xs={12}
                            >
                                <div className="form_group">
                                    <label htmlFor="productTitle">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="add_input"
                                        id="productTitle"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="productDesc">Description</label>
                                    <textarea
                                        name="description"
                                        className="add_input"
                                        id="productDesc"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>




                                <Grid container spacing={3}>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                    >
                                        <div className="form_group">
                                            <label htmlFor="colors">Colors</label>
                                            <input
                                                type="text"
                                                name="colors"
                                                className="add_input"
                                                id="colors"
                                                placeholder="red,green,blue"
                                                value={colors}
                                                onChange={(e) => setColors(e.target.value)}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                    >
                                        <div className="form_group">
                                            <label htmlFor="sizes">Sizes</label>
                                            <input
                                                type="text"
                                                name="sizes"
                                                className="add_input"
                                                id="sizes"
                                                placeholder="xxl,xl,l"
                                                value={sizes}
                                                onChange={(e) => setSizes(e.target.value)}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={6}
                                        xs={12}
                                    >
                                        <div className="form_group">
                                            <label htmlFor="regularPrice">Regular Price*</label>
                                            <input
                                                type="number"
                                                name="regularPrice"
                                                className="add_input"
                                                id="regularPrice"
                                                value={regularPrice}
                                                onChange={(e) => setRegularPrice(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </Grid>

                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={6}
                                        xs={12}
                                    >
                                        <div className="form_group">
                                            <label htmlFor="salePrice">Sale Price</label>
                                            <input
                                                type="number"
                                                name="salePrice"
                                                className="add_input"
                                                id="salePrice"
                                                value={salePrice}
                                                onChange={(e) => setSalePrice(e.target.value)}

                                            />
                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid
                                    container
                                    spacing={3}
                                    sx={{
                                        alignItems: 'center'
                                    }}
                                >
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        sm={6}
                                        xs={6}
                                    >
                                        <div className="form_group form_checkbox">
                                            <input
                                                type="checkbox"
                                                name="inStock"
                                                className="add_input"
                                                id="inStock"
                                                checked={inStock}
                                                onChange={() => setInstock(!inStock)}
                                            />
                                            <label htmlFor="inStock">In Stock?</label>
                                        </div>
                                    </Grid>

                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        sm={6}
                                        xs={6}
                                    >
                                        <div className="form_group">
                                            <label htmlFor="stock">Stock</label>
                                            <input
                                                type="number"
                                                name="stock"
                                                className="add_input"
                                                id="stock"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                min="1"
                                            />

                                        </div>
                                    </Grid>
                                </Grid>

                                <div className="form_group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary" style={{
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        {fetchingProduct ? <CircularProgress color="inherit" sx={{ width: '20px !important', height: '20px !important' }} /> : 'Publish'}
                                    </button>
                                </div>

                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                            >
                                <div className="form_group">
                                    <p className="add_label">Category</p>
                                    <div className="category_box">
                                        <ul className="category_list" ref={catListRef}>
                                            {allCategory.length < 1 && !fetchingCategory ? (
                                                <div className="empty_cats">
                                                    <h3>No Categories Found</h3>
                                                </div>
                                            ) : (
                                                <>
                                                    {fetchingCategory ? (
                                                        <div className="fetching_component">
                                                            <CircularProgress color="inherit" />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {allCategory.sort((a, b) => a.title?.localeCompare(b.title)).map((cat, ind) => (
                                                                <li key={ind}>
                                                                    <span onClick={handleSelectCategory}>{cat.title}</span>
                                                                </li>
                                                            ))}
                                                            <li ref={bottomRef}></li>
                                                        </>
                                                    )}
                                                </>
                                            )}

                                        </ul>


                                        <div className="category_input_box">
                                            <input
                                                type="text"
                                                className="category_input"
                                                placeholder="Add New Category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            />
                                            <button className="add_cat_btn" onClick={handleAddNewCategory}>
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className="form_group">
                                    {/* <p className="add_label">Thumbnail</p> */}
                                    <div className="thumbnail_box">
                                        {thumbnailPreview && (
                                            <div className="thumbnail_preview">
                                                <img src={thumbnailPreview} alt="Thumbnail" />
                                            </div>
                                        )}
                                        <div className="thumbnail_input_box">
                                            <label
                                                htmlFor="thumbnail"
                                                className="thumbnail_label btn-primary"
                                            >
                                                <ImageIcon
                                                    sx={{
                                                        marginRight: '5px'
                                                    }}
                                                />
                                                <span> Thumbnail</span>
                                            </label>
                                            <input type="file" name="thumbnail" id="thumbnail" hidden
                                                onChange={handleThumbnailChange} />
                                        </div>
                                    </div>
                                </div>


                                <div className="form_group">
                                    {/* <p className="add_label">Gallery</p> */}
                                    <div className="thumbnail_box">
                                        {/* {gallery && gallery.map((item , ind)=>(
                                        <p key={ind} className="thumbnail_name">{item}</p>
                                    ))} */}
                                        {galleryImages.length > 0 && (
                                            <div className="gallery_preview">
                                                <Grid container spacing={2}
                                                >
                                                    {galleryImages.map((image, ind) => (
                                                        <Grid key={ind}
                                                            item
                                                            lg={6}
                                                            md={6}
                                                            sm={3}
                                                            xs={6}
                                                        >
                                                            <img src={image} alt="Gallery" />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </div>
                                        )}


                                        <div className="thumbnail_input_box">
                                            <label
                                                htmlFor="gallery"
                                                className="thumbnail_label btn-primary"
                                            >
                                                <ImageIcon
                                                    sx={{
                                                        marginRight: '5px'
                                                    }}
                                                />
                                                <span> Gallery</span>
                                            </label>
                                            <input type="file" name="gallery" id="gallery" multiple hidden onChange={handleGalleryChange} />
                                        </div>
                                    </div>
                                </div>





                            </Grid>
                        </Grid>
                    </Box>

                </form>


            </Box >
        </>
    );
};

export default AddProduct;