import { Link } from "react-router-dom";

const Header = () => {
    let isAuth = false;
    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            <use xlinkHref="#bootstrap"></use></svg>
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                        <li><Link to="/features" className="nav-link px-2 text-white">Features</Link></li>
                        <li><Link to="/pricing" className="nav-link px-2 text-white">Pricing</Link></li>
                        <li><Link to="/faqs" className="nav-link px-2 text-white">FAQs</Link></li>
                        <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
                    </ul>

                    { isAuth ? 
                       (
                        <div className="dropdown">
                            <a href="#" className="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                        )
                        : 
                        (
                            <div className="text-end">
                                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                                <Link to="/signup" className="btn btn-warning">Sign-up</Link>
                            </div>
                        ) 
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;