import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext';
import { UserContext } from '../../context/userContext/userContext';
import { CircularProgress } from '@mui/material';
import Loading from '../../components/Loading/Loading';
import { updateUser } from '../../context/userContext/apiCalls';

const EditUser = () => {
    const params = useParams();
    const { admin } = useContext(AuthContext);
    const { dispatch, isFetching } = useContext(UserContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            firstName,
            lastName,
            email
        }

        updateUser(dispatch , params.userId , userData , admin.accessToken);
    }

    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/users/${params.userId}`, {
                    headers: {
                        token: admin.accessToken
                    }
                });
                setInitialValue(data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchUser();

        const setInitialValue = (data) => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);

        }
    }, [params.userId, admin.accessToken]);



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Box component="div" className="page edit_order">
                    <Box
                        component="div"
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <h4 className="page_title">Edit User's Information</h4>
                    </Box>

                    <form action="" onSubmit={handleSubmit}>
                        <Box
                            component={Paper}
                            className="add_new_wrapper"
                            sx={{
                                padding: '30px 20px'
                            }}
                        >

                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12}>
                                    <div className="form_group">
                                        <label htmlFor="userName">First name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="add_input"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <div className="form_group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="add_input"
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="form_group">
                                <label htmlFor="lastName">Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="add_input"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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

                        </Box>
                    </form>
                </Box>
            )}
        </>
    );
};

export default EditUser;