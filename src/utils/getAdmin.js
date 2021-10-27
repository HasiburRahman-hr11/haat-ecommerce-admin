const getAdmin = () =>{
    const admin = JSON.parse(localStorage.getItem('admin'));
    return admin;
}
export default getAdmin;