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

async function getMap(){
    const { response, error } = await CustomFetch("/station/map", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}



export default function Support(){
    const [currentUser, setCurrentUser] = useState(null);
    const [lesStations, setLesStations] = useState([]);
    const [newVeloForm, setNewVeloForm] = useState({ show:false, station:null });
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
            // Recupere la listes des station
            const mapInfos = await getMap();
            setLesStations(mapInfos);
        }
        run();
    }, []);


    // Recupere la listes des station
    async function updateListStation(){
        const mapInfos = await getMap();
        setLesStations(mapInfos);
    }

    return(
        <>
            <main className="z-40 mx-[2vw] my-[1vh]">
                <h3 className="text-2xl mb-2">Materiels</h3>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Station
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Electrique
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mecanique
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Libre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lesStations.map(el => (
                                <tr key={el.id} className="odd:bg-white even:bg-gray-50 border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        { el.nom }
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        { el.nb_electrique }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        { el.nb_mecanique }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        { el.nb_max - (parseInt(el.nb_electrique) + parseInt(el.nb_mecanique)) }/{ el.nb_max }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        { (el.nb_max - (parseInt(el.nb_electrique) + parseInt(el.nb_mecanique))) > 0 && (
                                            <button 
                                                type="button" 
                                                onClick={() => setNewVeloForm({ show:true, station: el.id })}
                                                className="transition border-2 p-1 rounded-lg hover:border-black hover:text-black"
                                            >
                                                Ajouter
                                            </button>
                                        ) }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Navbar role={currentUser?.type} />

            {newVeloForm.show && (
                <Modal isOpen={newVeloForm.show} onClose={() => setNewVeloForm({ show:false, station: null })}>
                    <NewVeloForm 
                        station={newVeloForm.station}
                        onClose={() => setNewVeloForm({ show:false, station: null })} 
                        update={updateListStation}
                    />
                </Modal>
            )}

        </>
    )
}
