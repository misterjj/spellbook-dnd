import {BreedId} from './Breed'
import {SchoolId} from './School'

export type SpellId = string

export type TimeDuration = {
    value: number;
    unit: "minutes" | "hours" | "days";
};

export type SpellTranslatedText = Record<string, string>
export type SpellCastingTime = ("Action" | "Bonus Action" | "Ritual" | "Reaction" | TimeDuration)
export type SpellRange = { feet: number, meter: number } | "touch" | "self"
export type SpellDuration = "Instantaneous" | TimeDuration | "Until dispelled"
export type SpellComponents = ("V" | "S" | "M")[]

export interface ISpell {
    id: SpellId,
    name: SpellTranslatedText,
    level: number,
    breeds: BreedId[],
    school: SchoolId,
    castingTime: SpellCastingTime[],
    range: SpellRange,
    components: SpellComponents,
    materials: SpellTranslatedText | null
    duration: SpellDuration,
    concentration: boolean,
    description: SpellTranslatedText,
    tags: string[],
    blurDataURL?: string
}

export const spellCastingTimes: SpellCastingTime[] = ["Action", "Bonus Action", "Ritual", "Reaction"]

export const spellTags: string[] = ["Teleportation & Movement", "Utility", "Healing", "Temporary Hit Points", "Defensive Buff", "Damage", "Cold Damage", "Necrotic Damage", "Area Denial", "Control", "Condition Inflicting", "Condition Removal", "Offensive Buff", "Force Damage", "Information Gathering", "Radiant Damage", "Slashing Damage", "Mind-Altering", "Social Interaction", "Piercing Damage", "Thunder Damage", "Illusion & Deception", "Summoning & Creation", "Movement Impairing", "Bludgeoning Damage", "Acid Damage", "Lightning Damage", "Psychic Damage", "Fire Damage", "Poison Damage"]