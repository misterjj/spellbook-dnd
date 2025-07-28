import {SpellId} from "@/data/Spell";

export interface ISpellBookSaved {
    id: string,
    name: string,
    spells: SpellId[]
}