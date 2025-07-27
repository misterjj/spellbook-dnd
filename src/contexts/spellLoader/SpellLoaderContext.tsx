import {ISpell} from "@/data/Spell";
import {createContext} from "react";

interface SpellLoadContextProps {
    spells: ISpell[],
    loading: boolean,
    loadSpells: () => void,
}

export const SpellLoaderContext = createContext<SpellLoadContextProps>(
    {
        spells: [],
        loading: false,
        loadSpells: () => {},
    }
)