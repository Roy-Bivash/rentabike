import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import FormContact from "../../formulaires/Contact";
import { useEffect, useState } from "react";

async function getCurrentUser(){
    const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

export default function Contact(){
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        async function run(){
            // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
            // Renvoyer vers la page currentRide s'il utilise un velo
            const user = await getCurrentUser();
            setCurrentUser(user);
            if(user.cours.used){
                navigate('/currentRide');
            }
        }
        run();
    }, []);
    return(
        <>
            <Navbar role="" />

            <div className="md:grid grid-cols-2 lg:px-[10vw] min-h-[80vh] mb-[80px] place-content-center">
                <div className="px-[40px] md:pl-[40px] md:pr-[100px]">
                    <h3 className="text-2xl font-bold">Passez par le formulaire en ligne !</h3>
                    <p className="mb-[15px] italic text-gray-600">Vous pouvez nous contacter en remplissant le formulaire en ligne. Nous vous répondrons dans les plus brefs délais.</p>
                    <FormContact />
                </div>
                <div className="px-[40px]">
                    <h3 className="text-2xl font-bold mt-6">Information de Contact</h3>
                    <p className="my-2">
                        03 rue Conté <br />
                        75003 Paris <br />
                        France <br />
                    </p>
                    <p className="my-2">Appelez nous :+33 1 00 00 00 00 </p>
                    <h3 className="text-2xl font-bold mt-6">Suivez nous</h3>
                    <div className="flex gap-4">
                        <p className="transition my-2 font-bold hover:text-[#8E7AB5] cursor-pointer">Facebook</p>
                        <p className="transition my-2 font-bold hover:text-[#8E7AB5] cursor-pointer">Instagram</p>
                        <p className="transition my-2 font-bold hover:text-[#8E7AB5] cursor-pointer">X (Twitter)</p>
                    </div>
                </div>

            </div>

        </>
    )
}