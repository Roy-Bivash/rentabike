import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { CustomFetch } from "../modules/CustomFetch";

function verifyInput(email, password){
    let validity = true;
    let error = "";

    if(email === ""){
        validity = false;
        error = "Le champ email est vide";
    }
    if(password === ""){
        validity = false;
        error = "Le champ mot de passe est vide";
    }

    return { validity, errorMessage: error };
}

// Cette page est le formulaire de connexion à l'application
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();
    const navigateTo = (route) => navigate(route);

    async function SubmitLogin(e){
        e.preventDefault();
        setIsLoading(true);

        const { validity, errorMessage } = verifyInput(email, password);
        if(!validity){
            return alert(errorMessage);
        }

        // Prevent multiple clicks
        if (isLoading) {
            return;
        }
        const  { response, error } = await CustomFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if(error){
            console.error('Error logging in:', error);
            alert('Error logging in:', error);
            return;
        }
        if(response?.success){
            navigateTo('/account');
        } else{
            alert("Incorect password, try again");
            console.error('Error logging in:', response?.message);
        }
        setIsLoading(false);

    }


    
    return(
        <form onSubmit={SubmitLogin} className="flex flex-col border px-[16px] py-[14px] shadow-md rounded-lg">
            <h1 className="text-3xl text-center mb-8">Connexion</h1>
            <p>Email</p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border px-[12px] py-[4px] mb-[12px] mt-[2px] w-[90vw] md:w-[30vw]" placeholder="Email" required />
            <p>Mot de passe</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border px-[12px] py-[4px] mt-[2px] w-[90vw] md:w-[30vw]" placeholder="Mot de passe" required />
            <div className="text-end p-0 m-0 mb-3">
                <a href="#" className="transition text-sm italic text-gray-500 hover:underline hover:text-black">Mot de passe oublié ?</a>
            </div>
            <button type="submit" className="transition w-[100%] border border-[#435585] px-[12px] py-[4px] mx-[2px] hover:bg-[#435585] hover:text-white rounded-md">Connexion</button>
            <div className="text-end p-0 m-0">
                <a type="button" onClick={() => navigateTo("/authentification/inscription")} className="transition text-sm italic text-gray-500 hover:underline hover:text-black">Vous n'avez pas de compte ?</a>
            </div>
        </form>
    )
}