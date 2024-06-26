import { useEffect, useState } from "react";;
import { Link } from "react-router-dom";
import BackIcone from "../../assets/icons/back.png";
import { CustomFetch } from "../../modules/CustomFetch";
import { useNavigate } from "react-router-dom";

async function getCurrentUser(){
    const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

async function getMyHistory(){
    const { response, error } = await CustomFetch(`/historique/me/`, { method: 'GET' });
    if(error){
        return alert(error.message);
    }
    return response;
}

export default function Historique(){
    const [currentUser, setCurrentUser] = useState(null);
    const [listHistorique, setListHistorique] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
        // Renvoyer vers la page currentRide s'il utilise un velo
        async function run(){
            const user = await getCurrentUser();
            setCurrentUser(user);
            if(user.cours.used){
                navigate('/currentRide');
            }

            // Recuperer les historiques :
            const history = await getMyHistory();
            setListHistorique(history);
        }
        run();
    }, []);

    // Formatage de la date pour un meilleur affichage
    function formatDate(dateTimeString){
        const dateOnly = new Date(dateTimeString).toISOString().split('T')[0];
        return dateOnly;
    }

    return (
        <>
            <div className="border-b bg-gray-150">
                <Link to='/account' className="flex items-center pl-1 pt-1">
                    <img src={BackIcone} className="h-[35px] py-2 px-1" alt="Close" />
                    Retour
                </Link>
            </div>
            <main>
                <div id="list" className="mt-6">
                    {listHistorique.map((el) => (
                        <div className="transition mx-4 my-1 px-3 py-1 border rounded-lg shadow-md hover:border-black">
                            <p className="flex justify-between">
                                <span className="text-xl">{formatDate(el.date_depart)}</span>
                                <span className="text-base italic text-gray-600">{el.heure_depart} - {el.heure_arrive}</span>
                            </p>
                            <p className="text-gray-700">
                                De { el.nom_station_depart }
                                <br />
                                à { el.nom_station_arrive }
                            </p>
                            <p>Commentaire : {el.commentaire}</p>
                            <div className="flex justify-end items-center gap-1">
                                {el.vote}
                                <svg
                                    className={`w-5 h-5 cursor-pointer fill-current text-yellow-400`}
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 15l-5.39 2.83 1.03-6.03-4.38-4.27 6.07-.88L10 1l2.67 5.42 6.07.88-4.38 4.27 1.03 6.03L10 15z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}