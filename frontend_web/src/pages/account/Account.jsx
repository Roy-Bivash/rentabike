import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom"
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/Modal";
import { CustomFetch } from "../../modules/CustomFetch";

import BoyIcon from "../../assets/icons/boy.png";
import { useEffect, useRef, useState } from "react";


// Page Account
export default function Account(){
    const [isLoading, setIsLoading] = useState(true); // TODO : mettre a true une fois l'auth fini
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ show:false, message:"" });
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmNewPasswordRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    let navigate = useNavigate();



    // Verifier si l'utilisateur est connecter
    // s'il ne l'est pas alors il sera rediriger vers la page d'authentification
    useEffect(() => {
        async function verifyUserLogin(){
            const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
            if(error){
                return setErrorMessage({ show:true, message:error.message });
            }
            if(!response.logged){
                navigate('/authentification/loggin')
            }
            if(response.cours.used){
                navigate('/currentRide');
            }
            setCurrentUser(response);
            setIsLoading(false);
        }
        verifyUserLogin();
    }, []);


    // Fonctionnalité de changement de mots de passe
    // Cette fonctionnalité n'est pas fini
    async function changePassword(e){
        e.preventDefault();

        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmNewPassword = confirmNewPasswordRef.current.value;

        if(newPassword != confirmNewPassword){
            setIsPasswordModalOpen(false);
            setErrorMessage({ show:true, message: "Les mots de passe ne sont pas identique" });
            return;
        }

        // TODO
        // const { response, error } = await CustomFetch(
        //     "/user/changePassword", 
        //     { 
        //         method: 'POST',
        //         body: JSON.stringify({oldPassword, newPassword, confirmNewPassword})
        //     }
        // );


    }

    // Fonction de deconnexion :
    async function logout(){
        const { response, error } = await CustomFetch("/auth/logout", { method: 'GET' });
        if(error){
            return setErrorMessage({ show:true, message:error.message });
        }

        document.location.reload();
    }

    return(
        <>
            <Navbar role={currentUser?.type} />
            {isLoading && (<Loader />)}

            <main className="min-h-[90vh] flex flex-col justify-center">
                {/* Affichage des infoirmations de l'utilisateur */}
                <div className="mt-6 flex justify-center items-center flex-col">
                    <img src={BoyIcon} alt="" className="w-[70vw] md:w-[20vw]" />
                    <h4 className="mt-5 mb-1 text-2xl font-bold">{ currentUser?.infos.nom } { currentUser?.infos.prenom }</h4>
                    <p className="text-center">
                        <span className="italic">{ currentUser?.type }</span>
                        <br />
                        { currentUser?.infos.email }
                        <br />
                        { currentUser?.infos.tel }
                    </p>
                </div>

                {/* Affichage des bouttons d'action */}
                <div className="flex flex-col mt-8 md:mx-[25vw] lg:mx-[35vw] ">
                    {/* Affciher ces bouttons sous condition */}
                    {currentUser?.type != "admin" && currentUser?.type != "reparateur" && (
                        <>
                            <Link to='/historique' type="button" className="transition text-center border-b border-t border-black py-2 hover:bg-gray-400/30">Historique de course</Link>
                            <Link to='/contact' type="button" className="transition text-center border-b border-black py-2 hover:bg-gray-400/30">Service client</Link>
                        </>
                    )}
                    <button type="button" onClick={() => setIsPasswordModalOpen(true)} className="transition text-center border-b border-black py-2 hover:bg-gray-400/30">Changer de mot de passe</button>
                    <button type="button" onClick={() => logout()} className="transition text-center border-b border-black py-2 hover:bg-orange-400/30">Se Deconnecter</button>
                </div>
            </main>


            {/* Popup de changement de mot de passe */}
            {isPasswordModalOpen && (
                <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
                    <form onSubmit={changePassword} className="flex flex-col">
                        <p>Votre ancien mot de passe</p>
                        <input className="border px-[6px] py-[3px] " type="text" ref={oldPasswordRef} />
                        <p>Votre nouveau mot de passe</p>
                        <input className="border px-[6px] py-[3px] " type="text" ref={newPasswordRef} />
                        <p>Confirmer votre nouveau mot de passe</p>
                        <input className="border px-[6px] py-[3px] " type="text" ref={confirmNewPasswordRef} />
                        <div className="flex">
                            <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="border-[2px] border-[#C80036] bg-white hover:bg-[#C80036] hover:text-white w-full py-[3px] mr-1 my-1">Annuler</button>
                            <button type="submit" className="border-[2px] border-[#0C1844] bg-white hover:bg-[#0C1844] hover:text-white w-full py-[3px] ml-1 my-1">Changer</button>
                        </div>
                    </form>
                </Modal>
            )}
            {/* Popup d'erreur */}
            {errorMessage.show && (
                <Modal isOpen={errorMessage.show} onClose={() => setErrorMessage({ show:false, message:"" })}>
                    <div>
                        <h5 className="text-xl my-4">{errorMessage.message}</h5>
                        <button type="button" onClick={() => setErrorMessage({ show:false, message:"" })} className="border-[2px] border-[#0C1844] bg-white hover:bg-[#0C1844] hover:text-white w-full py-[3px] ml-1 my-1">Fermer</button>
                    </div>
                </Modal>
            )}
        </>
    )
}