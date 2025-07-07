"use client"

import {useCallback, useEffect, useState} from 'react'
import {SchoolId} from '../../data/School'
import {BreedId} from '../../data/Breed'
import {
    ISpell,
    SpellCastingTime,
    SpellComponents,
    SpellDuration,
    SpellId,
    SpellRange,
    SpellTranslatedText
} from '@/data/Spell';


const spellsToScrap = ["arcane-gate", "arcane-vigor", "armor-of-agathys", "arms-of-hadar", "aura-of-purity", "aura-of-vitality", "banishing-smite", "beast-sense", "blade-ward", "blinding-smite", "circle-of-power", "cloud-of-daggers", "compelled-duel", "conjure-barrage", "conjure-volley", "cordon-of-arrows", "crown-of-madness", "crusader-s-mantle", "destructive-wave", "elemental-weapon", "feign-death", "fount-of-moonlight", "friends", "grasping-vine", "hail-of-thorns", "hunger-of-hadar", "jallarzi-s-storm-of-radiance", "lightning-arrow", "mind-sliver", "power-word-fortify", "staggering-smite", "steel-wind-strike", "summon-aberration", "summon-beast", "summon-celestial", "summon-construct", "summon-elemental", "summon-fey", "summon-fiend", "summon-undead", "swift-quiver", "synaptic-static", "tasha-s-bubbling-cauldron", "telepathy", "thorn-whip", "thunderclap", "thunderous-smite", "toll-the-dead", "witch-bolt", "word-of-radiance", "wrathful-smite", "yolande-s-regal-presence", "acid-splash", "aid", "alarm", "alter-self", "animal-friendship", "animal-messenger", "animal-shapes", "animate-dead", "animate-objects", "antilife-shell", "antimagic-field", "antipathy-sympathy", "arcane-eye", "arcane-lock", "astral-projection", "augury", "aura-of-life", "awaken", "bane", "banishment", "barkskin", "beacon-of-hope", "befuddlement", "bestow-curse", "bigby-s-hand", "blade-barrier", "bless", "blight", "blindness-deafness", "blink", "blur", "burning-hands", "call-lightning", "calm-emotions", "chain-lightning", "charm-monster", "charm-person", "chill-touch", "chromatic-orb", "circle-of-death", "clairvoyance", "clone", "cloudkill", "color-spray", "command", "commune", "commune-with-nature", "comprehend-languages", "compulsion", "cone-of-cold", "confusion", "conjure-animals", "conjure-celestial", "conjure-elemental", "conjure-fey", "conjure-minor-elementals", "conjure-woodland-beings", "contact-other-plane", "contagion", "contingency", "continual-flame", "control-water", "control-weather", "counterspell", "create-food-and-water", "create-or-destroy-water", "create-undead", "creation", "cure-wounds", "dancing-lights", "darkness", "darkvision", "daylight", "death-ward", "delayed-blast-fireball", "demiplane", "detect-evil-and-good", "detect-magic", "detect-poison-and-disease", "detect-thoughts", "dimension-door", "disguise-self", "disintegrate", "dispel-evil-and-good", "dispel-magic", "dissonant-whispers", "divination", "divine-favor", "divine-smite", "divine-word", "dominate-beast", "dominate-monster", "dominate-person", "dragon-s-breath", "drawmij-s-instant-summons", "dream", "druidcraft", "earthquake", "eldritch-blast", "elementalism", "enhance-ability", "enlarge-reduce", "ensnaring-strike", "entangle", "enthrall", "etherealness", "evard-s-black-tentacles", "expeditious-retreat", "eyebite", "fabricate", "faerie-fire", "false-life", "fear", "feather-fall", "find-familiar", "find-steed", "find-the-path", "find-traps", "finger-of-death", "fire-bolt", "fire-shield", "fire-storm", "fireball", "flame-blade", "flame-strike", "flaming-sphere", "flesh-to-stone", "fly", "fog-cloud", "forbiddance", "forcecage", "foresight", "freedom-of-movement", "gaseous-form", "gate", "geas", "gentle-repose", "giant-insect", "glibness", "globe-of-invulnerability", "glyph-of-warding", "goodberry", "grease", "greater-invisibility", "greater-restoration", "guardian-of-faith", "guards-and-wards", "guidance", "guiding-bolt", "gust-of-wind", "hallow", "hallucinatory-terrain", "harm", "haste", "heal", "healing-word", "heat-metal", "hellish-rebuke", "heroes--feast", "heroism", "hex", "hold-monster", "hold-person", "holy-aura", "hunter-s-mark", "hypnotic-pattern", "ice-knife", "ice-storm", "identify", "illusory-script", "imprisonment", "incendiary-cloud", "inflict-wounds", "insect-plague", "invisibility", "jump", "knock", "legend-lore", "leomund-s-secret-chest", "leomund-s-tiny-hut", "lesser-restoration", "levitate", "light", "lightning-bolt", "locate-animals-or-plants", "locate-creature", "locate-object", "longstrider", "mage-armor", "mage-hand", "magic-circle", "magic-jar", "magic-missile", "magic-mouth", "magic-weapon", "major-image", "mass-cure-wounds", "mass-heal", "mass-healing-word", "mass-suggestion", "maze", "meld-into-stone", "melf-s-acid-arrow", "mending", "message", "meteor-swarm", "mind-blank", "mind-spike", "minor-illusion", "mirage-arcane", "mirror-image", "mislead", "misty-step", "modify-memory", "moonbeam", "mordenkainen-s-faithful-hound", "mordenkainen-s-magnificent-mansion", "mordenkainen-s-private-sanctum", "mordenkainen-s-sword", "move-earth", "nondetection", "nystul-s-magic-aura", "otiluke-s-freezing-sphere", "otiluke-s-resilient-sphere", "otto-s-irresistible-dance", "pass-without-trace", "passwall", "phantasmal-force", "phantasmal-killer", "phantom-steed", "planar-ally", "planar-binding", "plane-shift", "plant-growth", "poison-spray", "polymorph", "power-word-heal", "power-word-kill", "power-word-stun", "prayer-of-healing", "prestidigitation", "prismatic-spray", "prismatic-wall", "produce-flame", "programmed-illusion", "project-image", "protection-from-energy", "protection-from-evil-and-good", "protection-from-poison", "purify-food-and-drink", "raise-dead", "rary-s-telepathic-bond", "ray-of-enfeeblement", "ray-of-frost", "ray-of-sickness", "regenerate", "reincarnate", "remove-curse", "resistance", "resurrection", "reverse-gravity", "revivify", "rope-trick", "sacred-flame", "sanctuary", "scorching-ray", "scrying", "searing-smite", "see-invisibility", "seeming", "sending", "sequester", "shapechange", "shatter", "shield", "shield-of-faith", "shillelagh", "shining-smite", "shocking-grasp", "silence", "silent-image", "simulacrum", "sleep", "sleet-storm", "slow", "sorcerous-burst", "spare-the-dying", "speak-with-animals", "speak-with-dead", "speak-with-plants", "spider-climb", "spike-growth", "spirit-guardians", "spiritual-weapon", "starry-wisp", "stinking-cloud", "stone-shape", "stoneskin", "storm-of-vengeance", "suggestion", "summon-dragon", "sunbeam", "sunburst", "symbol", "tasha-s-hideous-laughter", "telekinesis", "teleport", "teleportation-circle", "tenser-s-floating-disk", "thaumaturgy", "thunderwave", "time-stop", "tongues", "transport-via-plants", "tree-stride", "true-polymorph", "true-resurrection", "true-seeing", "true-strike", "tsunami", "unseen-servant", "vampiric-touch", "vicious-mockery", "vitriolic-sphere", "wall-of-fire", "wall-of-force", "wall-of-ice", "wall-of-stone", "wall-of-thorns", "warding-bond", "water-breathing", "water-walk", "web", "weird", "wind-walk", "wind-wall", "wish", "word-of-recall", "zone-of-truth"];
// const spellsToScrap = ['alter-self', "alarm"]
const spellBaseUrl = "https://www.aidedd.org/spell/";

export default function Scrapper() {
    const [spells, setSpells] = useState<ISpell[]>([])

    function camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const parseCastingTime = (text: string): SpellCastingTime[] => {
        const result: SpellCastingTime[] = [];

        if (text.includes("Action")) {
            if (text.includes("Bonus Action")) {
                result.push("Bonus Action");
            } else {
                result.push("Action");
            }
        }

        if (text.includes("Reaction")) {
            result.push("Reaction");
        }

        if (text.includes("Ritual")) {
            result.push("Ritual");
        }

        const timeMatch = text.match(/(\d+)\s+(minute|hour|day)s?/i);
        if (timeMatch) {
            const value = parseInt(timeMatch[1]);
            const unit = timeMatch[2].toLowerCase() + "s" as "minutes" | "hours" | "days";
            result.push({value, unit});
        }

        return result.length > 0 ? result : ["Action"];
    };

    const parseConponents = (text: string): SpellComponents => {
        const result: SpellComponents = [];

        for (const l of ["V", "S", "M"]) {
            if (text.includes(l)) {
                result.push(l as "V" | "S" | "M");
            }
        }

        return result
    }

    const parseMaterials = (textEn: string, textFr: string): SpellTranslatedText | null => {
        const materialsMatchEn = textEn.match(/\((.+)\)/i);
        if (materialsMatchEn) {
            const valueEn = materialsMatchEn[1];

            const materialsMatchFr = textFr.match(/\((.+)\)/i);
            if (materialsMatchFr) {
                const valueFR = materialsMatchFr[1];

                return {en: valueEn, fr: valueFR}
            } else {
                return null
            }

        } else {
            return null
        }
    }


    const parseRange = (textEn: string, textFr: string): SpellRange => {
        if (textEn.toLowerCase().includes("touch") || textFr.toLowerCase().includes("contact")) {
            return "touch";
        }
        if (textEn.toLowerCase().includes("self") || textFr.toLowerCase().includes("personnelle")) {
            return "self";
        }

        const feetMatch = textEn.match(/(\d+)\s*feet?/i);
        const meterMatch = textFr.match(/(\d+(?:,\d+)?)\s*m(?:ètre)?/i);

        if (feetMatch && meterMatch) {
            const feet = parseInt(feetMatch[1]);
            const meter = parseFloat(meterMatch[1].replace(',', '.'));
            return {feet, meter};
        }

        return {feet: 0, meter: 0};
    };

    const parseDuration = (text: string): SpellDuration => {
        if (text.toLowerCase().includes("instantaneous")) {
            return "Instantaneous";
        }

        if (text.toLowerCase().includes("until dispelled")) {
            return "Until dispelled";
        }

        const timeMatch = text.match(/(\d+)\s+(minute|hour|day)s?/i);
        if (timeMatch) {
            const value = parseInt(timeMatch[1]);
            const unit = timeMatch[2].toLowerCase() + "s" as "minutes" | "hours" | "days";
            return {value, unit};
        }

        return "Instantaneous";
    };

    const parseConcentration = (text: string): boolean => {
        console.log("ici", text, text.toLowerCase().includes("concentration"))
        return text.toLowerCase().includes("concentration")
    }

    const scrapSpells = useCallback(async (): Promise<ISpell[]> => {
        const spells: ISpell[] = [];

        for (const spell of spellsToScrap) {
            try {
                const url = spellBaseUrl + spell;
                const response = await fetch(url);
                const html = await response.text();

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const nameEn = doc.querySelector("h1")?.textContent?.trim() || "";
                const descriptionEn = doc.querySelector(".description")?.textContent?.trim() || "";

                const subtitle = doc.querySelector(".ecole")?.textContent?.trim() || "";
                const subTitleRegex = /Level\s(\d+)\s(.*)\s\(([^\)]+)\)/
                const subTitleMatches = subtitle.match(subTitleRegex)
                const level = parseInt(subTitleMatches?.[1] || "0")
                const school = (subTitleMatches?.[2] || "") as SchoolId
                const breeds = (subTitleMatches?.[3] || "").split(',').map(c => c.trim()) as BreedId[]

                const castingTimeText = doc.querySelector(".t")?.textContent?.replace("Casting Time:", "").trim() || "";
                const rangeText = doc.querySelector(".r")?.textContent?.replace("Range:", "").trim() || "";
                const durationText = doc.querySelector(".d")?.textContent?.replace("Duration:", "").trim() || "";
                const componentsTextEn = doc.querySelector(".c")?.textContent?.replace("Components:", "").trim() || "";

                const urlFr = doc.querySelector(".trad a[href^='fr']")?.getAttribute("href");
                let nameFr = "";
                let descriptionFr = "";
                let rangeFrText = "";
                let componentsTextFR = "";

                if (urlFr) {
                    try {
                        const frResponse = await fetch(spellBaseUrl + urlFr);
                        const frHtml = await frResponse.text();
                        const frParser = new DOMParser();
                        const frDoc = frParser.parseFromString(frHtml, 'text/html');

                        nameFr = frDoc.querySelector("h1")?.textContent?.trim() || "";
                        descriptionFr = frDoc.querySelector(".description")?.textContent?.trim() || "";
                        rangeFrText = frDoc.querySelector(".r")?.textContent?.replace("Portée", "").replace(":", "").trim() || "";
                        componentsTextFR = frDoc.querySelector(".c")?.textContent?.replace("Composantes", "").replace(":", "").trim() || "";

                    } catch (frError) {
                        console.error(`Erreur lors du fetch FR pour ${spell}:`, frError);
                    }
                }

                const castingTime = parseCastingTime(castingTimeText);
                const Range = parseRange(rangeText, rangeFrText);
                const duration = parseDuration(durationText);
                const concentration = parseConcentration(durationText);
                const components = parseConponents(componentsTextEn)
                const materials = parseMaterials(componentsTextEn, componentsTextFR);

                const spellData: ISpell = {
                    id: spell as SpellId,
                    icon: camelize(spell).replaceAll("-",""),
                    name: {en: nameEn, fr: nameFr},
                    level,
                    breeds,
                    school,
                    castingTime,
                    range: Range,
                    components,
                    materials,
                    duration,
                    concentration,
                    description: {en: descriptionEn, fr: descriptionFr}
                };

                spells.push(spellData);

            } catch (error) {
                console.error(`Erreur lors du scraping de ${spell}:`, error);
            }
        }

        return spells;
    }, []); // Pas de dépendances car spellsToScrap et spellBaseUrl sont maintenant constants

    // Utilisation de useEffect pour exécuter le fetch une seule fois au montage
    useEffect(() => {
        scrapSpells().then(scrapedSpells => {
            setSpells(scrapedSpells);
            console.log("All spells scraped:", scrapedSpells);
        });
    }, []); // Tableau vide = exécution une seule fois au montage

    return (
        <pre className={"mt-10"}>
            {JSON.stringify(spells, null, 2)}
        </pre>
    );
}