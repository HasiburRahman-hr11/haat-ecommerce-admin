import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CircularProgress, Grid } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CategoryContext } from '../../context/categoryContext/categoryContext';
import { updateCategory } from '../../context/categoryContext/apiCalls';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditCategory = () => {
    const { admin } = useContext(AuthContext);
    const { dispatch, isFetching } = useContext(CategoryContext);
    const params = useParams();

    const [category, setCategory] = useState({});

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    const handleThumbnailChange = (e) => {
        setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
        setThumbnail(e.target.files[0]);
    }


    const formData = new FormData();
    formData.append('title', title.toLowerCase());
    formData.append('description', description);
    formData.append('cat-image', thumbnail);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            token: admin.accessToken
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCategory(dispatch, formData, config, params.catId);
    }

    useEffect(() => {
        const fetchTheCategory = async () => {
            try {
                const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/category/${params.catId}`);
                setCategory(data);
                setDefaultValues(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchTheCategory();

        const setDefaultValues = (category) => {
            setTitle(category.title);
            setDescription(category.description);
            setThumbnailPreview(category.thumbnail);
        }
    }, [params.catId]);

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
                    <h4 className="page_title">Edit Category</h4>
                </Box>


                <form action="" className="add_new_form" onSubmit={handleSubmit}>
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
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
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

                                <div className="form_group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary" style={{
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        {isFetching ? <CircularProgress color="inherit" sx={{ width: '20px !important', height: '20px !important' }} /> : 'Update'}
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
                                    <p className="add_label"></p>
                                    <div className="thumbnail_box">
                                        {thumbnailPreview && (
                                            <div className="thumbnail_preview">
                                                <img src={thumbnailPreview} alt="Thumbnail" />
                                            </div>
                                        )}
                                        <div className="thumbnail_input_box">
                                            <label
                                                htmlFor="cat-image"
                                                className="thumbnail_label btn-primary"
                                            >
                                                <ImageIcon
                                                    sx={{
                                                        marginRight: '5px'
                                                    }}
                                                />
                                                <span> Thumbnail</span>
                                            </label>
                                            <input
                                                type="file"
                                                name="cat-image"
                                                id="cat-image"
                                                hidden
                                                onChange={handleThumbnailChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </form>


            </Box>
        </>
    );
};

export default EditCategory;