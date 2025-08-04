import "./navbar.scss";
import { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkMode";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
    };

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span>SocialHub</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? <WbSunnyOutlinedIcon style={{cursor: "pointer"}} onClick={toggle}/> : <DarkModeOutlinedIcon style={{cursor: "pointer"}} onClick={toggle} />}
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div 
                    className="user"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <img 
                        src={currentUser.profilePic}
                        alt="Profile" 
                    />
                    <span>{currentUser.username}</span>
                    <ExpandMoreIcon className="dropdown-arrow" />
                    
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <Link 
                                to={`/profile/${currentUser.id}`} 
                                className="dropdown-item"
                                onClick={() => setShowDropdown(false)}
                            >
                                <PersonOutlinedIcon />
                                <span>My Profile</span>
                            </Link>
                            <div className="dropdown-divider"></div>
                            <div 
                                className="dropdown-item logout-item" 
                                onClick={handleLogout}
                            >
                                <LogoutOutlinedIcon />
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;