import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import { CustomFetch } from "../../modules/CustomFetch";
import bikeGif from "../../assets/gif/bike.gif";
import righ_arrow from '../../assets/icons/right-arrow.png';
import Modal from "../../components/modal/Modal";


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

async function deposerVelo(station_id, commentaire, vote, fonctionnel){
    const { response, error } = await CustomFetch(
        "/reservation/deposer", 
        { 
            method: 'POST',
            body: JSON.stringify({station_id, commentaire, vote, fonctionnel})
        }
    );
    if(error){
        return alert(error.message);
    }
    return response;
} 

export default function CurrentRide(){
    const [currentUser, setCurrentUser] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [focuse, setFocuse] = useState([48.8566, 2.3522]);
    const [zoom, setZoom] = useState(15);
    const [lesStations, setLesStations] = useState([]);
    const [mapKey, setMapKey] = useState(0);
    const [openFinCoursModal, setOpenFinCoursModal] = useState({ show:false, stationid:null });
    const [rating, setRating] = useState(null);
    const [inputCommentaire, setInputCommentaire] = useState("");
    const [inputFonctionnel, setInputFonctionnel] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function run(){ 
            const user = await getCurrentUser();
            if(!user.logged || !user.cours.used){
                navigate("/accueil");
            }
            setCurrentUser(user);

            const mapInfos = await getMap();
            setLesStations(mapInfos);
        }
        run();
    }, []);


    async function submitFinDeCours(e){
        e.preventDefault();

        // Faire une copie de l'id de la station ou sera deposé le velo :
        const station_fin = openFinCoursModal.stationid;

        // Fermer le modal :
        setOpenFinCoursModal({ show:false, stationid:null, confirmation:false })

        // Faire le depot avec l'api :
        const response = await deposerVelo(station_fin, inputCommentaire, rating, inputFonctionnel);
        if(response.success){
            navigate("/historique");
        }else{
            alert("Une erreur c'est produite");
        }
    }


    function selectStation(station){
        const placeDispo = station.nb_max - (parseInt(station.nb_electrique)  + parseInt(station.nb_mecanique));

        return(
            <Marker key={station.id} position={[station.latitude, station.longitude]}>
                <Popup className=''>
                    <h4 className='text-lg'>{station.name}</h4>
                    <p>Places disponible : {placeDispo}</p>
                    {placeDispo && (
                        <div className='flex justify-end mt-1'>
                            <button onClick={() => {setShowMap(false);setOpenFinCoursModal({ show:true, stationid:station.id })}} className='flex items-center'>Deposer <img src={righ_arrow} className='h-3 ml-1' /></button>
                        </div>
                    )}
                </Popup>
            </Marker>
        )
    }

    const handleToggleChange = () => {
        setInputFonctionnel(!inputFonctionnel);
    };

    return(
        <div className="flex min-h-[95vh] flex-col items-center justify-center">
            <img src={bikeGif} alt="" className="w-[95vw]" />
            <h2 className="text-3xl text-center">Course en cours</h2>
            <p className="text-center">
                Type de velo : {currentUser?.cours.velo.type_velo}
                <br />
                <span className="italic text-gray-600">Depart à {currentUser?.cours.velo.start.time} le {currentUser?.cours.velo.start.date} </span>
            </p>
            <div className="text-center mt-8">
                <button type="button" onClick={() => setShowMap(true)} className="transition border-2 border-black px-3 py-2 rounded-xl hover:bg-black hover:text-white">Déposer mon vélo</button>
            </div>


            {showMap && (
                <div className="bg-gray-500 h-[90vh] w-full mt-5">
                    <MapContainer center={focuse} zoom={zoom} scrollWheelZoom={false} key={mapKey}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {lesStations.map((el) => selectStation(el))}
                    </MapContainer>
                </div>
            )}

            <Modal isOpen={openFinCoursModal.show} onClose={() => {setShowMap(false); setOpenFinCoursModal({ show:false, stationid:null }); }}>
                <form onSubmit={submitFinDeCours}>
                    <h5 className="text-xl mb-2">Commentaire</h5>
                    <input type="text" value={inputCommentaire} onChange={(e) => setInputCommentaire(e.target.value)} className="min-w-[35vw] border border-gray-600 px-3 py-1" required/>
                    <h5 className="text-xl mt-4 mb-2">Vote</h5>
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} className="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                className="hidden"
                                onChange={() => setRating(star)}
                            />
                            <svg
                                className={`w-8 h-8 cursor-pointer fill-current ${
                                    rating >= star ? 'text-yellow-400' : 'text-gray-400'
                                }`}
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 15l-5.39 2.83 1.03-6.03-4.38-4.27 6.07-.88L10 1l2.67 5.42 6.07.88-4.38 4.27 1.03 6.03L10 15z" />
                            </svg>
                            </label>
                        ))}
                    </div>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={inputFonctionnel}
                            onChange={handleToggleChange}
                        />
                        <div className="relative w-11 h-6 bg-red-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        <span className="ms-3 text-sm font-medium text-black">{inputFonctionnel ? "Le vélo fonctionne bien" : "Le vélo ne fonctionne pas"}</span>
                    </label>

                    <button type="button" onClick={() => setOpenFinCoursModal({ show:false, stationid:null })} className="border-[2px] border-[#0C1844] bg-white hover:bg-[#0C1844] hover:text-white w-full py-[3px] ml-1 my-1">Annuler</button>
                    <button type="submit" className="border-[2px] border-[#0C1844] bg-white hover:bg-[#0C1844] hover:text-white w-full py-[3px] ml-1 my-1">Deposer</button>
                </form>
            </Modal>
        </div>
    )
}