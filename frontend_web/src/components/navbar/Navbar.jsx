import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import HomeIcon from "../../assets/icons/home.png";
import infoIcon from "../../assets/icons/info.png";
import emplacementIcon from "../../assets/icons/emplacement.png";
import profilIcon from "../../assets/icons/profil.png";
import dangerIcon from "../../assets/icons/danger.png";
import supportIcon from "../../assets/icons/support.png";
import ListContactIcon from "../../assets/icons/listContact.png";
import BikeIcon from "../../assets/icons/bike.png";

function clientPaths(){
    return (
        <>
            <Link to='/'>
                <img src={HomeIcon} className="h-[30px]" alt="home" />
            </Link>
            <Link to='/map'>
                <img src={emplacementIcon} className="h-[30px]" alt="map" />
            </Link>
            <Link to='/account'>
                <img src={profilIcon} className="h-[30px]" alt="account" />
            </Link>
            {/* <Link to='/authentification/connexion'>
                <img src={profilIcon} className="h-[30px]" alt="profile" />
            </Link> */}
        </>
    )
}

function reparateurPaths(){
    return (
        <>
            <Link to='/'>
                <img src={HomeIcon} className="h-[30px]" alt="home" />
            </Link>
            <Link to='/materiel'>
                <img src={BikeIcon} className="h-[30px]" alt="maintenance" />
            </Link>
            <Link to='/maintenance'>
                <img src={dangerIcon} className="h-[30px]" alt="maintenance" />
            </Link>
            <Link to='/account'>
                <img src={profilIcon} className="h-[30px]" alt="account" />
            </Link>
        </>
    )
}

function adminPaths(){
    return (
        <>
            <Link to='/'>
                <img src={HomeIcon} className="h-[30px]" alt="home" />
            </Link>
            <Link to='/support'>
                <img src={ListContactIcon} className="h-[30px]" alt="support" />
            </Link>
            <Link to='/account'>
                <img src={profilIcon} className="h-[30px]" alt="account" />
            </Link>
        </>
    )
}


export default function Navbar({ role }){
    let navigate = useNavigate();

    const [userRole, setUserRole] = useState('client');

    useEffect(() => {
        if(role == "admin" || role == "reparateur"){
            setUserRole(role);
        }
    }, [role]);
    


    return(
        <div className="fixed z-80 bottom-0 left-0 bg-gray-200 w-full flex justify-around gap-2 py-3">
            {userRole === "admin" && (adminPaths())}
            {userRole === "reparateur" && (reparateurPaths())}
            {userRole === "client" && (clientPaths())}
        </div>
    )
}