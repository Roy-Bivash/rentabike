import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { CustomFetch } from "../../modules/CustomFetch";

async function getCurrentUser(){
    const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

// Recuper les message des utilisateurs
async function getAllMessage(){
    const { response, error } = await CustomFetch("/message", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

// Supprimer un message
async function deleteMessage(id){
    const { response, error } = await CustomFetch(`/message/${id}`, { method: 'DELETE' });
    if(error){
        return alert(error.message);
    }
    if(response.success){
        window.location.reload();
    }
}

export default function Support(){
    const [currentUser, setCurrentUser] = useState(null);
    const [lesMessages, setLesMessage] = useState([]);

    // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
    // Renvoyer vers la page currentRide s'il utilise un velo
    useEffect(() => {
        async function run(){
            const user = await getCurrentUser();
            setCurrentUser(user);

            const responseMessage = await getAllMessage();
            setLesMessage(responseMessage);
        }
        run();
    }, []);

    return(
        <>
            <Navbar role={currentUser?.type} />
            <main className="mx-[2vw] my-[1vh] pb-[60px]">
                <h3 className="text-2xl mb-5">Meesage reçu</h3>

                {lesMessages.map((el) => (
                    <div key={el.id} className="border border-[#6295A2] rounded-xl my-2 px-3 py-2 shadow-lg">
                        <p className="text-gray-600 text-xl">{ el.raison }</p>
                        <p className="max-h-[80px] overflow-y-auto border bg-gray-200/30 p-1 my-2">{ el.content }</p>
                        <p className="mb-3">
                            <u>Contact</u> : 
                            <a href={`mailto:$${el.mail}`} className="hover:underline hover:text-blue-600"> { el.mail }</a>
                        </p>
                        <button type="button" onClick={() => deleteMessage(el.id)} className="w-full transition border border-[#C80036] px-[12px] py-[4px] mx-[2px] hover:bg-[#C80036] hover:text-white rounded-md">Supprimer</button>
                    </div>
                ))}
            </main>

        </>
    )
}
