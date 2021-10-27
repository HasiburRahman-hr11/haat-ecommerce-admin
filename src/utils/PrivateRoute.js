import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    let {admin} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            admin.isAdmin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;