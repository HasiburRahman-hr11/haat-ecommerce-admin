import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect , useHistory } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { AuthContext } from './context/authContext/AuthContext';
import { getAllCategories } from './context/categoryContext/apiCalls';
import { CategoryContext } from './context/categoryContext/categoryContext';
import { getAllOrders } from './context/orderContext/apiCalls';
import { OrderContext } from './context/orderContext/orderContext';
import { getAllProducts } from './context/productContext/apiCalls';
import { getAllUsers } from './context/userContext/apiCalls';
import { ProductContext } from './context/productContext/productContext';
import { UserContext } from './context/userContext/userContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import AddCategory from './pages/AddCategory/AddCategory';
import AddProduct from './pages/AddProduct/AddProduct';
import Analytics from './pages/Analytics/Analytics';
import Categories from './pages/Categories/Categories';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';
import Users from './pages/Users/Users';
import PrivateRoute from './utils/PrivateRoute';
import EditProduct from './pages/EditProduct/EditProduct';
import EditCategory from './pages/EditCategory/EditCategory';
import ViewOrder from './pages/ViewOrder/ViewOrder';
import EditOrder from './pages/EditOrder/EditOrder';
import EditUser from './pages/EditUser/EditUser';
import jwtLogout from './utils/jwtLogout';

const App = () => {

  const { admin } = useContext(AuthContext);
  const { dispatch: dispatchProducts } = useContext(ProductContext);
  const { dispatch: dispatchCategory } = useContext(CategoryContext);
  const { dispatch: dispatchOrder } = useContext(OrderContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  const history = useHistory();
 

  useEffect(() => {
    if (admin.isAdmin) {
      getAllProducts(dispatchProducts);
      getAllCategories(dispatchCategory);
      getAllOrders(dispatchOrder, admin.accessToken);
      getAllUsers(dispatchUser, admin.accessToken);

      // Automatically Logout if Admin Token expired
      jwtLogout(admin?.accessToken , history);
      
    }
  }, [dispatchProducts, dispatchCategory, dispatchOrder, admin, dispatchUser , history]);
  return (
    <Router>
      {/* <Sidebar /> */}
      {admin.isAdmin && <Sidebar />}
      <ToastContainer />
      <Switch>
        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/analytics">
          <Analytics />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/products">
          <Products />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/orders">
          <Orders />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/categories">
          <Categories />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/products/add">
          <AddProduct />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/categories/add">
          <AddCategory />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/orders/:orderId">
          <ViewOrder />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/products/edit/:productId">
          <EditProduct />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/categories/edit/:catId">
          <EditCategory />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/orders/edit/:orderId">
          <EditOrder />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/users/edit/:userId">
          <EditUser />
        </PrivateRoute>
        <Route exact path="/login">
          {!admin.isAdmin ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;