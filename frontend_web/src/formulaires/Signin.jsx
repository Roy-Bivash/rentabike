import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { CustomFetch } from "../modules/CustomFetch";


// Verifier la saisie
function verifyInput(email, password, password2){
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
    if(password != password2){
        validity= false;
        error = "Les deux mot de passe ne correspondent pas";
    }
    return { validity, errorMessage: error };
}


async function createUser(nom, prenom, password, tel, mail){
    const  { response, error } = await CustomFetch('/user/newUser', {
        method: 'POST',
        body: JSON.stringify({ nom, prenom, password, tel, mail }),
    });
    if(error){
        console.error('Error logging in:', error);
        alert('Error logging in:', error);
        return;
    }
    return response;
}


// Formulaire de creation d'utilisateur
export default function Signin(){
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');



    async function submitForm(e){
        console.log("oui")
        e.preventDefault();
        setIsLoading(true);

        const { validity, errorMessage } = verifyInput(mail, password, password2);
        if(!validity){
            return alert(errorMessage);
        }

        // Prevent multiple clicks
        if (isLoading) {
            return;
        }

        const res = await createUser(nom, prenom, password, tel, mail);
        if(res.success){
            alert("Votre compte est créer");
            navigate('/account');
        }else{
            alert('Erreur : Vueillez re essayer plus tard');
        }

        setIsLoading(false);
    }







    return(
        <form onSubmit={submitForm} className="flex flex-col border px-[16px] py-[14px] shadow-md rounded-lg w-[90vw] md:w-[30vw]">
            <h1 className="text-3xl text-center mb-8">Inscription</h1>
            <p>Nom</p>
            <input value={nom} onChange={e => setNom(e.target.value)} type="text" className="border px-[12px] py-[4px] mb-[12px] mt-[2px]" placeholder="Nom" required/>
            <p>Prenom</p>
            <input value={prenom} onChange={e => setPrenom(e.target.value)} type="text" className="border px-[12px] py-[4px] mb-[12px] mt-[2px]" placeholder="Prenom" required/>
            <p>Email</p>
            <input value={mail} onChange={e => setMail(e.target.value)} type="email" className="border px-[12px] py-[4px] mb-[12px] mt-[2px]" placeholder="Email" required/>
            <p>Tel</p>
            <input type="tel" value={tel} onChange={e => setTel(e.target.value)} className="border px-[12px] py-[4px] mb-[12px] mt-[2px]" placeholder="06 00 00 00 00" required />
            <p>Mot de passe</p>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="border px-[12px] py-[4px] mb-[12px] mt-[2px]" placeholder="Mot de passe" required/>
            <p>Confirmez votre Mot de passe</p>
            <input value={password2} onChange={e => setPassword2(e.target.value)} type="password" className="border px-[12px] py-[4px] mt-[2px]" placeholder="Mot de passe" required/>

            <button type="submit" className="mt-4 transition w-[100%] border border-[#435585] px-[12px] py-[4px] mx-[2px] hover:bg-[#435585] hover:text-white rounded-md">Inscription</button>
            <div className="text-end p-0 m-0">
                <button type="button" onClick={() => navigateTo("/authentification/connexion")} className="transition text-sm italic text-gray-500 hover:underline hover:text-black">Vous avez déjà un compte ?</button>
            </div>
        </form>
    )
}