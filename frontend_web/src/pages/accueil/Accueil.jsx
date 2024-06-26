import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { CustomFetch } from "../../modules/CustomFetch";
import { useNavigate } from "react-router-dom";
import velo1Img from "../../assets/icons/velo1.avif";
import velo2Img from "../../assets/icons/velo2.png";
import velo3Img from "../../assets/icons/velo3.png";
import velo4Img from "../../assets/icons/velo4.jpg";



async function getCurrentUser() {
    const { response, error } = await CustomFetch("/user/current", { method: 'GET' });
    if (error) {
        return alert(error.message);
    }
    return response;
}

export default function Accueil() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Verifier si l'utilisateur est connecter et s'il est cour d'utilisation d'un velo
    useEffect(() => {
        async function run() {
            const user = await getCurrentUser();
            setCurrentUser(user);
            if (user.cours.used) {
                navigate('/currentRide');
            }
        }
        run();
    }, []);
    return (
        <>
            <Navbar role={currentUser?.type} />

            <main className="mx-5 mt-5 mb-[50px] ">

                <section id="1" className="flex md:flex-row flex-col justify-center items-center min-h-[70vh]">
                    <img src={velo3Img} className="md:w-[35vw] w-[45vw]" />
                    <p className="mb-10 text-2xl typo-logo">Rent A Bike</p>
                    <div className="md:w-[30vw] md:ml-5">
                        <h1 className="text-3xl text-center">Réservez a Bike en Toute Simplicité</h1>
                        <p className="mb-6 text-center">Pas d'abonnement, juste un compte. Louez un vélo où que vous soyez.</p>
                        <p className="mb-6 text-center">Balayez l'ecran vers la gauche pour acceder à l'entiereté de l'application.</p>
                        <button type="button" className="transition w-[100%] border border-[#435585] px-[12px] py-[4px] mx-[2px] hover:bg-[#435585] hover:text-white rounded-md">Telecharger</button>
                    </div>
                </section>



            </main>
        </>
    )
}