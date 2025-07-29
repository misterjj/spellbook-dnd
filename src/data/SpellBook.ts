import {SpellId} from "@/data/Spell";

export interface ISpellBookSaved {
    id: string,
    name: string,
    cover: SpellBookCover,
    spells: SpellId[]
}

export type SpellBookCover = "red"|"orange"|"yellow"|"lime"|"green"|"cyan"|"blue"|"violet"|"fuchsia"|"rose"|"slate"|"zinc"|"black"|"white";
export const spellBookCovers: SpellBookCover[] = ["red","orange","yellow","lime","green","cyan","blue","violet","fuchsia","rose","slate","zinc","black","white"]