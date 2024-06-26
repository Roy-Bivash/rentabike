import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { CustomFetch } from "../../modules/CustomFetch";
import NewVeloForm from "../../formulaires/NewVelo";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";

async function getCurrentUser(){
    const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

async function getMapWithDefectBicycle(){
    const { response, error } = await CustomFetch("/station/mapDefect", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

async function getHistoriqueVeloById(id){
    const { response, error } = await CustomFetch(`/historique/historyVelo/${id}`, { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

export default function Maintenance(){
    const [currentUser, setCurrentUser] = useState(null);
    const [lesStations, setLesStations] = useState([]);
    const [openVeloMenu, setOpenVeloMenu] = useState({ show: false, velo:null });
    const [historiqueVelo, setHistoriqueVelo] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
            // Renvoyer vers la page currentRide s'il utilise un velo
        async function run(){
            const user = await getCurrentUser();
            if(!user.logged){
                navigate("/account");
            }
            setCurrentUser(user);

            // Recuperer les infos des velos defectueux de chaque station
            const mapInfos = await getMapWithDefectBicycle();
            setLesStations(mapInfos);
        }
        run();
    }, []);

    // Recupere l'historique d'un velo
    useEffect(() => {
        async function process(){
            const historyData = await getHistoriqueVeloById(openVeloMenu.velo.id);
            setHistoriqueVelo(historyData);
        }

        if(openVeloMenu.show){
            process();
        }
    }, [openVeloMenu])


    async function rendreFonctionnel(id){
        const  { response, error } = await CustomFetch('/velo/updateFunctionnal', {
            method: 'POST',
            body: JSON.stringify({ id, fonctionnel:true }),
        });
        if(error){
            alert('Error :', error);
            return;
        }
        if(response?.success){
            window.location.reload();
        }
    }

    return(
        <>
            <main className="z-40 mx-[2vw] my-[1vh]">
                <h3 className="text-2xl mb-2">Maintenance</h3>

                <h4 className="text-xl mt-4 mb-2">Liste des vélos defectueux</h4>

                <div className="flex flex-col">
                    {lesStations.map(el => (
                        <button 
                            key={el.id}
                            onClick={() => setOpenVeloMenu({ show:true, velo:el })} 
                            className="transition border-b border-gray-300 hover:bg-gray-200 text-left px-3 py-1"
                        >
                            Vélo numero : {el.id}
                        </button>
                    ))}
                </div>
            </main>
            <Navbar role={currentUser?.type} />
            <Modal
                isOpen={openVeloMenu.show} 
                onClose={() => setOpenVeloMenu({ show:false, velo:null })} 
            >
                { openVeloMenu.show && (
                    <div className="min-w-[30vw]">
                        <p className="">
                            <u>Numero de vélo :</u> {openVeloMenu.velo.id}
                            <br />
                            <u>Type :</u> {openVeloMenu.velo.type}
                            <br />
                            <u>Date de fabrication :</u> {openVeloMenu.velo.date_fabrication}
                            <br />
                            <u>Station :</u> {openVeloMenu.velo.station_nom}
                            <br />
                            <u>Vote : </u> {historiqueVelo?.reduce((acc, { vote }, _, { length }) => acc + vote / length, 0)}/5
                        </p>
                        <div className="mt-3 mb-1 md:flex-row flex-col flex md:gap-0 gap-2">
                            <button type="button" className="w-full transition border border-[#C80036] px-[12px] py-[4px] mx-[2px] hover:bg-[#C80036] hover:text-white rounded-md">Retirer</button>
                            <button type="button" onClick={() => rendreFonctionnel(openVeloMenu.velo.id)} className="w-full transition border border-[#435585] px-[12px] py-[4px] mx-[2px] hover:bg-[#435585] hover:text-white rounded-md">Rendre fonctionnel</button>
                        </div>
                        <h5 className="mt-5 mb-2 text-xl">Historique d'utilisation</h5>
                        <div className="max-h-[40vh] overflow-y-auto border p-2">
                            { historiqueVelo.map((el) => (
                                <div key={el.id} className="odd:bg-white even:bg-gray-50 border-b">
                                    <p>{ (el.date_depart == el.date_arrive) ? el.date_depart : `${el.date_depart} - ${el.date_arrive}` }</p>
                                    <p className="italic text-gray-600">{ el.heure_depart } - { el.heure_arrive }</p>
                                    <p>{ el.commentaire }</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}