import { useNavigate } from "react-router-dom";
import { CustomFetch } from "../modules/CustomFetch";
import { useState } from "react";

// Cette page permet de créer un nouveau velo
export default function NewVeloForm({ station, onClose, update }){
    const [selectedType, setSelectedType] = useState("mecanique");
    const navigateTo = useNavigate();

    // Envoie de la requette de creation du velo
    async function validateForm(e){
        e.preventDefault();
        const { response, error } = await CustomFetch('/velo/new', {
            method: 'POST',
            body: JSON.stringify({ station, type: selectedType }),
        });
        if(error){
            alert('Internal Error :', error);
            return;
        }
        if(response?.success){
            update();
            onClose();
        }else {
            alert('Error :', response?.message);
        }
    }

    return(
        <form onSubmit={validateForm}>
            <p className="mt-3 mb-1">Type de velo</p>
            <select className="px-2 py-1 w-[100%]" onChange={(e) => setSelectedType(e.target.value)}>
                <option value="mecanique">Mecanique</option>
                <option value="electrique">Electrique</option>
            </select>
            <div className="mt-4">
                <button type="button" onClick={() => onClose()} className="transition border border-[#C80036] px-[12px] py-[4px] mx-[2px] hover:bg-[#C80036] hover:text-white rounded-md">Annuler</button>
                <button type="submit" className="transition border border-[#435585] px-[12px] py-[4px] mx-[2px] hover:bg-[#435585] hover:text-white rounded-md">Valider</button>
            </div>
        </form>
    )
}