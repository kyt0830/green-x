import { NavLink } from "react-router";

const Menu = () => {
    return (

        <nav className="navbar bg-body-tertiary justify-content-start gap-3 p-3">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/Profile" className="nav-link">Profile</NavLink>
        </nav>

    )
}

export default Menu;