import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import UsersTable from '../../components/Table/UsersTable';
import { UserContext } from '../../context/userContext/userContext';
import Loading from '../../components/Loading/Loading';

const thead = ['Name', 'Email', 'Joined'];

const Users = () => {
    const { users, isFetching } = useContext(UserContext);
    const customers = users.filter(user => !user.isAdmin);
    const sortedCustomers = customers.sort((a, b) => a.firstName.localeCompare(b.firstName))
    return (
        <>
            {isFetching ? <Loading /> : (
                <Box
                    component="div"
                    className="page users"
                >
                    <Box
                        component="div"
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <h4 className="page_title">Users</h4>
                    </Box>

                    <UsersTable thead={thead} data={sortedCustomers} />

                </Box>
            )}
        </>
    );
};

export default Users;