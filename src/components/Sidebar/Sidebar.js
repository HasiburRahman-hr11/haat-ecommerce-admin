import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import './Sidebar.css';
import Section from './Section';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Dashboard, Analytics, BusinessCenter, Person, ShoppingCart, AddShoppingCart, Category, PeopleAlt, Logout, Storefront, Menu, ArrowRightAlt } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/apiCalls';


const Sidebar = () => {
    const history = useHistory()
    const { dispatch } = useContext(AuthContext);

    const [activeMenu, setActiveMenu] = useState(false)

    const handleLogout = () => {
        logout(dispatch);
        history.push('/login')
    }



    return (
        <>
            <Menu className="open_menu" onClick={() => setActiveMenu(true)} />
            <div className={activeMenu ? 'sidebar_overlay active' : 'sidebar_overlay'} onClick={() => setActiveMenu(false)}></div>
            <Box
                components="div"
                className={activeMenu ? 'sidebar active' : 'sidebar'}
                sx={{
                    width: '250px',
                    height: 'auto',
                    minHeight: '100vh',
                    backgroundColor: '#fff',
                }}
            >

                <Box
                    components="div"
                    className="sidebar_header"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '60px',
                        marginBottom: '20px',
                        backgroundColor: '#F4F6F8',
                        position: 'relative'
                    }}
                    onClick={() => setActiveMenu(false)}
                >
                    <h2 className="sidebar_logo"><Link to="/">My Website</Link></h2>
                    <ArrowRightAlt className="close_menu"/>
                </Box>


                <Box
                    components="div"
                    className="sidebar_menu_wrapper"
                >
                    <Section title="General">
                        <ul className="sidebr_nav" onClick={() => setActiveMenu(false)}>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <Dashboard className="menu_icon" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/analytics"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <Analytics className="menu_icon" />
                                    Analytics
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item">
                                <Link
                                    to="#"
                                    className="nav_link">
                                    <BusinessCenter className="menu_icon" />
                                    Finance
                                </Link>
                            </li>
                            <li className="sidebar_nav_item">
                                <Link
                                    to="#"
                                    className="nav_link">
                                    <Person className="menu_icon" />
                                    Account
                                </Link>
                            </li>
                            <li className="sidebar_nav_item">
                                <span
                                    onClick={handleLogout}
                                    className="nav_link"
                                >
                                    <Logout className="menu_icon" />
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </Section>

                    <Section title="Management">
                        <ul className="sidebr_list" onClick={() => setActiveMenu(false)}>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/admin/products"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <ShoppingCart className="menu_icon" />
                                    Products
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/admin/products/add"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <AddShoppingCart className="menu_icon" />
                                    Add Product
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/admin/categories"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <Category className="menu_icon" />
                                    Categories
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/admin/users"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <PeopleAlt className="menu_icon" />
                                    Users
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item">
                                <NavLink
                                    exact to="/admin/orders"
                                    activeClassName="active"
                                    className="nav_link"
                                >
                                    <Storefront className="menu_icon" />
                                    Orders
                                </NavLink>
                            </li>

                        </ul>
                    </Section>

                </Box>
            </Box>
        </>
    );
};

export default Sidebar;