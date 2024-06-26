import { useParams, Link, useNavigate } from "react-router-dom"

import CloseIcone from "../../assets/icons/close.png";
import BackIcone from "../../assets/icons/back.png";
import ArrowIcon from "../../assets/icons/arrow.png";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../modules/CustomFetch";

async function getCurrentUser(){
    const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

// Recupere le nombre de velo et autres informations de la station
async function getInfosStationById(id){
    const { response, error } = await CustomFetch(`/station/${id}`, { method: 'GET' }); 
    if(error){
        return alert(error.message);
    }
    return response;
}

// Cette fonction permet de reserver et d'utiliser un velo
async function faireReservation(station_id, type_velo){
    const { response, error } = await CustomFetch(
        "/reservation/new", 
        { 
            method: 'POST',
            body: JSON.stringify({station_id, type_velo})
        }
    );
    if(error){
        return alert(error.message);
    }
    return response;
}

export default function Reservation(){
    const [stationInfos, setStationInfos] = useState(null);
    const { stationId } = useParams();
    const navigate = useNavigate();

    // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
    // Renvoyer vers la page currentRide s'il utilise un velo
    useEffect(() => {
        async function run(){ 
            const user = await getCurrentUser();
            if(!user.logged){
                navigate("/account");
            }
            if(user.cours.used){
                navigate('/currentRide');
            }
            const data = await getInfosStationById(stationId);
            setStationInfos(data);
        }
        run();
    }, []);
    
    
    // Permet de reserver un velo d'une station selectionné
    async function prendreVelo(type){
        // Process ...
        const result = await faireReservation(stationId, type);

        if(result.success) {
            navigate("/currentRide");
        }else{
            alert("Une erreur c'est produite veuillez ressayer plus tard");
        }


    }




    return(
        <div>
            <div className="border-b bg-gray-150">
                <Link to='/map' className="flex items-center pl-1 pt-1">
                    <img src={BackIcone} className="h-[35px] py-2 px-1" alt="Close" />
                    Retour
                </Link>
            </div>
            {/* <p>Selected station : {stationId} </p> */}

            <main className="mt-5 px-2">
                <h3 className="text-xl">Station : {stationInfos?.nom}</h3>

                <div className="mt-8">
                    <button type="button" onClick={() => prendreVelo("mecanique")} className="transition flex w-full items-center justify-between bg-gray-200/70 my-2 px-1 py-2 border border-[transparent] hover:border-black hover:translate-x-[2px]">
                        {stationInfos?.nb_mecanique} Vélo mécanique(s)
                        <img src={ArrowIcon} className="h-4 -rotate-90 mr-3" alt="" />
                    </button>
                    <button type="button" onClick={() => prendreVelo("electrique")} className="transition flex w-full items-center justify-between bg-gray-200/70 my-2 px-1 py-2 border border-[transparent] hover:border-black hover:translate-x-[2px]">
                        {stationInfos?.nb_electrique} Vélo électrique(s)
                        <img src={ArrowIcon} className="h-4 -rotate-90 mr-3" alt="" />
                    </button>
                    <p className="bg-gray-200/70 my-2 px-1 py-2">{ stationInfos?.nb_max - (parseInt(stationInfos?.nb_electrique) + parseInt(stationInfos?.nb_mecanique)) } Place(s) libre(s)</p>
                </div>
            </main>
        </div>
    )
}