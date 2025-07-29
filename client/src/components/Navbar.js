import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    let isAdmin = localStorage.getItem('userType') === '1' ? true : false;
    let navigate = useNavigate();

    const Logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MegaMart</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/home" className='nav-link'><i className="fa-solid fa-house"></i> Home</Link>
                        </li>
                        {isAdmin ? <li className="nav-item">
                            <Link to='/addProduct' className='nav-link'><i className="fa-solid fa-plus"></i> Add Product</Link>
                        </li> : ''}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/cart' className='nav-link' title='Cart'><i className="fa-solid fa-cart-plus"></i></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu">
                                <Link className="dropdown-item" to='/profile'><i className="fa-solid fa-address-card"></i> Profile</Link>
                                {isAdmin ? <Link className="dropdown-item" to='/userList'><i className="fa-solid fa-user"></i> Users</Link> : ''}
                                <Link className="dropdown-item" to='/order'><i className="fas fa-shopping-bag"></i> Order</Link>
                                <Link className="dropdown-item" to='/help'><i className="fas fa-headset"></i>  24x7 Help</Link>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li><button className="btn btn-outline-danger" onClick={Logout}><i className="fa-solid fa-right-from-bracket"></i> Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;