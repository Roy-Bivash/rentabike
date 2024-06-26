import Navbar from '../../components/navbar/Navbar';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';

import { CustomFetch } from '../../modules/CustomFetch';

// Test data
import station_information from '../../test_data/station_information.json';
import station_status from '../../test_data/station_status.json';

import righ_arrow from '../../assets/icons/right-arrow.png';
import search_icon from '../../assets/icons/search.png';

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

export default function Map(){
    // const positionParis = [48.8566, 2.3522];
    const [focuse, setFocuse] = useState([48.8566, 2.3522]);
    const [zoom, setZoom] = useState(15);

    const [lesStations, setLesStations] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [mapKey, setMapKey] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    
    useEffect(() => {
        // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
        // Renvoyer vers la page currentRide s'il utilise un velo
        async function run(){
            const mapInfos = await getMap();
            setLesStations(mapInfos);

            const user = await getCurrentUser();
            setCurrentUser(user);
            setLoggedIn(user.logged);
            if(user.cours.used){
                navigate('/currentRide');
            }
        }
        run();
    }, []);


    // Recherche d'adresse :
    // Utilise l'API du gouvernement api-adresse.data.gouv.fr
    async function searchSubmit(e){
        e.preventDefault();

        let toSearch = searchInput + ' Paris';
        toSearch = toSearch.replace(' ', '+');
        const data = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${toSearch}&limit=1`)
        const response = await data.json();

        setFocuse([response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]]);
        setZoom(16);

        setMapKey(prevKey => prevKey + 1); // Pour forcer le rechargement de la map
    }

    // Reservation d'un velo s'il est connecté
    function btnReserver(id){
        if(loggedIn){
            navigate(`/reservation/${id}`)
        }else{
            alert("Vous n'etes pas connecté")
        }
    }

    function selectStation(station){
        const nb_total_velo = parseInt(station.nb_electrique)  + parseInt(station.nb_mecanique);
        
        return(
            <Marker key={station.id} position={[station.latitude, station.longitude]}>
                <Popup className=''>
                    <h4 className='text-lg'>{station.nom}</h4>
                    {/* <h6 className='text-md mb-2 italic'>{station.is_installed ? "Station ouverte" : "Station fermée"}</h6> */}
                    <ul className="list-inside list-disc">
                        <li>Vélo desponible : { nb_total_velo }</li>
                        <ul className="list-inside list-disc ml-5">
                            <li>Mécanique : {station.nb_mecanique}</li>
                            <li>Electrique : {station.nb_electrique}</li>
                        </ul>
                        <li className='mt-1'>Places disponible : {station.nb_max - nb_total_velo}</li>
                    </ul>
                    <div id="link" className='flex justify-end mt-1'>
                        {nb_total_velo > 0 && (
                            <button onClick={() => btnReserver(station.id)} className='flex items-center'>Reserver <img src={righ_arrow} className='h-3 ml-1' /></button>
                        )}
                    </div>
                </Popup>
            </Marker>
        )
    }


    return(
        <>
            <Navbar role={currentUser?.type} />
            <div className='h-[75vh] mt-1'>
                <MapContainer center={focuse} zoom={zoom} scrollWheelZoom={false} key={mapKey}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {lesStations.map((el) => selectStation(el))}
                </MapContainer>

                <form onSubmit={(e) => searchSubmit(e)} className='flex items-center justify-center mt-2'>
                    <div className='flex border-2 rounded-full px-[13px] border-gray-300 shadow-md'>
                        <input 
                            name='searchInput'
                            type="text" 
                            value={searchInput} 
                            onChange={(e) => setSearchInput(e.target.value)} 
                            placeholder="Rechercher une station"
                            className='w-[60vw] px-[8px] py-[3px] focus:outline-none'
                        />
                        <button type="submit" className='p-1'>
                            <img src={search_icon} className='h-[25px]'/>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}