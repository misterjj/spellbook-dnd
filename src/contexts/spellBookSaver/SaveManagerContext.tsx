import {createContext} from "react";
import {ISpellBookSaved} from "@/data/SpellBook";
import {SpellId} from "@/data/Spell";

export interface SaveData {
    spellsBooks: ISpellBookSaved[]
}

export const emptySave: SaveData = {
    spellsBooks: []
}

interface SaveMangerContextProps {
    saveData: SaveData,
    addSpell: (id: string, spell: SpellId) => void
    removeSpell: (id: string, spell: SpellId) => void
    persist: () => void
}

export const SaveManagerContext = createContext<SaveMangerContextProps>(
    {
        saveData: emptySave,
        addSpell: () => {},
        removeSpell: () => {},
        persist: () => {}
    }
)



