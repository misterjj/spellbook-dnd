import {createContext} from "react";
import {ISpellBookSaved, SpellBookCover} from "@/data/SpellBook";
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
    cleanSpells: (id: string) => void
    getSpellBook: (id: string) => ISpellBookSaved | undefined,
    addSpellBook: (name: string, cover: SpellBookCover) => string
    updateSpellBook: (id: string, name: string, cover: SpellBookCover) => void
    deleteSpellBook: (id: string) => void
}

export const SaveManagerContext = createContext<SaveMangerContextProps>(
    {
        saveData: emptySave,
        addSpell: () => {
        },
        removeSpell: () => {
        },
        cleanSpells: () => {
        },
        getSpellBook: () => undefined,
        addSpellBook: () => "",
        updateSpellBook: () => {
        },
        deleteSpellBook: () => {
        },
    }
)



