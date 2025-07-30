import {createContext} from "react";
import {ISpellBookSaved, SpellBookCover} from "@/data/SpellBook";
import {SpellId} from "@/data/Spell";

export interface SaveData {
    load: boolean,
    language: string,
    theme: string,
    menuCollapse: boolean,
    spellsBooks: ISpellBookSaved[]
}

export const emptySave: SaveData = {
    load: false,
    language: "fr",
    theme: "dark",
    menuCollapse: false,
    spellsBooks: []
}

interface SaveMangerContextProps {
    saveData: SaveData,
    setLanguage: (language: string) => void,
    setTheme: (theme: string) => void,
    setMenuCollapse: (menuCollapse: boolean) => void,
    addSpell: (id: string, spell: SpellId) => void
    removeSpell: (id: string, spell: SpellId) => void
    cleanSpells: (id: string) => void
    getSpellBook: (id: string) => ISpellBookSaved | undefined,
    addSpellBook: (name: string, cover: SpellBookCover) => string
    updateSpellBook: (id: string, name: string, cover: SpellBookCover) => void
    deleteSpellBook: (id: string) => void
}

const defaultVoidFunction = () => {
}

export const SaveManagerContext = createContext<SaveMangerContextProps>(
    {
        saveData: emptySave,
        addSpell: () => defaultVoidFunction,
        setLanguage: () => defaultVoidFunction,
        setTheme: () => defaultVoidFunction,
        setMenuCollapse: () => defaultVoidFunction,
        removeSpell: () => defaultVoidFunction,
        cleanSpells: () => defaultVoidFunction,
        getSpellBook: () => undefined,
        addSpellBook: () => "",
        updateSpellBook: () => defaultVoidFunction,
        deleteSpellBook: () => defaultVoidFunction,
    }
)



