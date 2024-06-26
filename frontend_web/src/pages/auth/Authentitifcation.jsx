import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from '../../components/navbar/Navbar';
import Login from "../../formulaires/Login";
import Signin from "../../formulaires/Signin";

export default function Authentification() {
    let params = useParams();

    const [type, setType] = useState("");

    // Verifier le type de page a afficher : connexion ou inscription
    useEffect(() => {
        if(params.type == "connexion" || params.type == "inscription"){
            setType(params.type);
        }else{
            setType("connexion");
        }
    }, [params]);

    return(
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                {/* Choix de la page a afficher */}
                {(type == "connexion") && (
                    <Login />
                )}
                {(type == "inscription") && (
                    <Signin />
                )}
            </div>
        </>
    )
}