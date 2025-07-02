import {BreedId} from "@/data/Breed";
import {Trans, useTranslation} from "react-i18next";

interface IBreed{
    id: BreedId
}

export function Breed({id}: IBreed) {
    const {t} = useTranslation();

    let breedClazz = "bg-gray-200 text-black"

    if (id === "Druid") {
        breedClazz = "bg-orange-400 text-white"
    } else if (id === "Ranger") {
        breedClazz = "bg-lime-500 text-white"
    } else if (id === "Paladin") {
        breedClazz = "bg-pink-400 text-white"
    } else if (id === "Wizard") {
        breedClazz = "bg-blue-400 text-white"
    } else if (id === "Warlock") {
        breedClazz = "bg-purple-700 text-white"
    } else if (id === "Sorcerer") {
        breedClazz = "bg-emerald-800 text-white"
    } else if (id === "Bard") {
        breedClazz = "bg-amber-800 text-white"
    }

    return (
        <div className={`badge text-sm ${breedClazz}`}>
            <Trans t={t}>data.breed.{id}</Trans>
        </div>
    )
}