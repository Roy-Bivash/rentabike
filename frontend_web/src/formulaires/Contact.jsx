import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomFetch } from "../modules/CustomFetch";

async function sendMessage(raison, mail, content){
    const { response, error } = await CustomFetch(
        "/message", 
        { 
            method: 'POST',
            body: JSON.stringify({raison, mail, content})
        }
    );
    if(error){
        return alert(error.message);
    }
    return response;
}
// Cette page est un formulaire, c'est le formulaire de contact
export default function Contact(){
    const [raison, setRaison] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showAutreRaison, setShowAutreRaison] = useState(false);
    const [autreRaison, setAutreRaison] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(raison != "Autre"){
            setShowAutreRaison(false);
        }else {
            setShowAutreRaison(true);
        }
    }, [raison])

    async function onSubmit(e){
        e.preventDefault();
        console.log(email, message);

        const laRaison = (showAutreRaison) ? autreRaison : raison;

        const res = await sendMessage(laRaison, email, message);
        if(res.success){
            alert('Votre message à été envoyé');
            navigate('/account');
        }else{
            alert('Erreur : vueillez re essayer plus tard');
        }



    }

    return(
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col">

            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Raison</label>
            <select onChange={(e) => setRaison(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option disabled selected>Raison de votre message</option>
                <option value="Compte en ligne">Votre compte en ligne</option>
                <option value="Course">Votre course</option>
                <option value="Application">Votre application</option>
                <option value="Autre">Autre</option>
            </select>
            {showAutreRaison && (
                <input 
                    type="text" 
                    placeholder="Autre raison" 
                    value={autreRaison} 
                    onChange={(e) => setAutreRaison(e.target.value)} 
                    className="my-[8px] px-[12px] py-[4px] border bg-gray-50 border border-gray-300 rounded-md hover:outline outline-1 outline-[#8E7AB5] focus:ring-blue-500 focus:border-blue-500 "
                    required
                />
            
            )}
            <input 
                type="email" 
                placeholder="Email *" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="my-[8px] px-[12px] py-[4px] border bg-gray-50 border border-gray-300 rounded-md hover:outline outline-1 outline-[#8E7AB5] focus:ring-blue-500 focus:border-blue-500 "
                required
            />
            <textarea 
                placeholder="Message *" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="my-[8px] px-[12px] py-[4px] min-h-[100px] border bg-gray-50 border border-gray-300 rounded-md hover:outline outline-1 outline-[#8E7AB5] focus:ring-blue-500 focus:border-blue-500 "
                required
            />
            <button type="submit" className="transition px-[12px] mt-[6px] py-[4px] border border-gray-600 rounded-md hover:bg-[#8E7AB5] hover:border-[#8E7AB5] hover:text-white">Envoyer</button>
            <p className="mt-1 text-sm italic text-gray-600">Les champs marqués d'un * sont obligatoires</p>
        </form>
    )
}