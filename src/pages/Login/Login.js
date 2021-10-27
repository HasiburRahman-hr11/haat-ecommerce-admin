import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const [formData, setFormData] = useState({});
    const { dispatch, isFetching , error } = useContext(AuthContext)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(dispatch, formData);
    }

    return (
        <Box
            component="div"
            className="login_page"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <Box component="div" sx={{ width: '100%' }} >
                <Box component="div"
                    sx={{
                        maxWidth: '400px',
                        padding: '30px',
                        margin: '0 auto',
                        backgroundColor: '#f1f1f1'
                    }}
                >
                    <Box component="h2"
                        sx={{
                            fontSize: '23px',
                            textAlign: 'center',
                            marginBottom: '20px',
                            color: '#666'
                        }}
                    >Login</Box>
                    <form action="" onSubmit={handleSubmit}>
                        <Box component="div" className="form_group">
                            <input
                                type="email"
                                name="email"
                                className="add_input"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                        </Box>
                        <Box component="div" className="form_group">
                            <input
                                type="password"
                                name="password"
                                className="add_input"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </Box>
                        <Box component="div"
                            sx={{
                                textAlign: 'center'
                            }}
                        >
                            <button className="btn btn-primary" type="submit" style={{maxHeight:'40px'}}>
                                {isFetching ? <CircularProgress color="inherit" sx={{width:'20px !important' , height:'20px !important'}} /> : "Login"}
                            </button>
                        </Box>
                        {error && <p style={{
                            fontSize:'15px',
                            color:'red',
                            marginTop:'15px',
                            textAlign:'center'
                        }}>Wrong Information Provided</p>}
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;