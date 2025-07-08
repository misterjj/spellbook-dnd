import {spellList} from "@/data/Spell";

interface ITags {
    id: string;
    tags: string[];
}

const tags: ITags[] = [
    {
        "id": "arcane-gate",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "arcane-vigor",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "armor-of-agathys",
        "tags": [
            "Temporary Hit Points",
            "Defensive Buff",
            "Damage",
            "Cold Damage"
        ]
    },
    {
        "id": "arms-of-hadar",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Area Denial",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "aura-of-purity",
        "tags": [
            "Defensive Buff",
            "Condition Removal"
        ]
    },
    {
        "id": "aura-of-vitality",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "banishing-smite",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Force Damage",
            "Control",
            "Condition Inflicting",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "beast-sense",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "blade-ward",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "blinding-smite",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Radiant Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "circle-of-power",
        "tags": [
            "Defensive Buff",
            "Area Denial"
        ]
    },
    {
        "id": "cloud-of-daggers",
        "tags": [
            "Damage",
            "Slashing Damage",
            "Area Denial"
        ]
    },
    {
        "id": "compelled-duel",
        "tags": [
            "Control",
            "Mind-Altering",
            "Social Interaction"
        ]
    },
    {
        "id": "conjure-barrage",
        "tags": [
            "Damage",
            "Force Damage",
            "Area Denial"
        ]
    },
    {
        "id": "conjure-volley",
        "tags": [
            "Damage",
            "Force Damage",
            "Area Denial"
        ]
    },
    {
        "id": "cordon-of-arrows",
        "tags": [
            "Damage",
            "Piercing Damage",
            "Area Denial",
            "Control"
        ]
    },
    {
        "id": "crown-of-madness",
        "tags": [
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "crusader-s-mantle",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Radiant Damage"
        ]
    },
    {
        "id": "destructive-wave",
        "tags": [
            "Damage",
            "Thunder Damage",
            "Radiant Damage",
            "Area Denial",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "elemental-weapon",
        "tags": [
            "Offensive Buff",
            "Damage"
        ]
    },
    {
        "id": "feign-death",
        "tags": [
            "Utility",
            "Illusion & Deception",
            "Defensive Buff"
        ]
    },
    {
        "id": "fount-of-moonlight",
        "tags": [
            "Offensive Buff",
            "Defensive Buff",
            "Damage",
            "Radiant Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "friends",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction"
        ]
    },
    {
        "id": "grasping-vine",
        "tags": [
            "Summoning & Creation",
            "Control",
            "Movement Impairing",
            "Condition Inflicting",
            "Damage",
            "Bludgeoning Damage"
        ]
    },
    {
        "id": "hail-of-thorns",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Piercing Damage",
            "Area Denial"
        ]
    },
    {
        "id": "hunger-of-hadar",
        "tags": [
            "Damage",
            "Cold Damage",
            "Acid Damage",
            "Area Denial",
            "Control",
            "Movement Impairing",
            "Condition Inflicting"
        ]
    },
    {
        "id": "jallarzi-s-storm-of-radiance",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Area Denial"
        ]
    },
    {
        "id": "lightning-arrow",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Lightning Damage",
            "Area Denial"
        ]
    },
    {
        "id": "mind-sliver",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "power-word-fortify",
        "tags": [
            "Defensive Buff",
            "Healing"
        ]
    },
    {
        "id": "staggering-smite",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Psychic Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "steel-wind-strike",
        "tags": [
            "Damage",
            "Force Damage",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "summon-aberration",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "summon-beast",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "summon-celestial",
        "tags": [
            "Summoning & Creation",
            "Damage",
            "Healing"
        ]
    },
    {
        "id": "summon-construct",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "summon-elemental",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "summon-fey",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "summon-fiend",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "summon-undead",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "swift-quiver",
        "tags": [
            "Offensive Buff",
            "Utility"
        ]
    },
    {
        "id": "synaptic-static",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Control",
            "Mind-Altering",
            "Area Denial"
        ]
    },
    {
        "id": "tasha-s-bubbling-cauldron",
        "tags": [
            "Summoning & Creation",
            "Healing",
            "Utility"
        ]
    },
    {
        "id": "telepathy",
        "tags": [
            "Social Interaction",
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "thorn-whip",
        "tags": [
            "Damage",
            "Piercing Damage",
            "Control",
            "Movement Impairing"
        ]
    },
    {
        "id": "thunderclap",
        "tags": [
            "Damage",
            "Thunder Damage",
            "Area Denial"
        ]
    },
    {
        "id": "thunderous-smite",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Thunder Damage",
            "Control",
            "Movement Impairing",
            "Condition Inflicting"
        ]
    },
    {
        "id": "toll-the-dead",
        "tags": [
            "Damage",
            "Necrotic Damage"
        ]
    },
    {
        "id": "witch-bolt",
        "tags": [
            "Damage",
            "Lightning Damage"
        ]
    },
    {
        "id": "word-of-radiance",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Area Denial"
        ]
    },
    {
        "id": "wrathful-smite",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Necrotic Damage",
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "yolande-s-regal-presence",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction"
        ]
    },
    {
        "id": "acid-splash",
        "tags": [
            "Damage",
            "Acid Damage",
            "Area Denial"
        ]
    },
    {
        "id": "aid",
        "tags": [
            "Defensive Buff",
            "Healing"
        ]
    },
    {
        "id": "alarm",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "alter-self",
        "tags": [
            "Utility",
            "Illusion & Deception",
            "Defensive Buff",
            "Offensive Buff"
        ]
    },
    {
        "id": "animal-friendship",
        "tags": [
            "Mind-Altering",
            "Social Interaction",
            "Control"
        ]
    },
    {
        "id": "animal-messenger",
        "tags": [
            "Utility",
            "Information Gathering",
            "Social Interaction"
        ]
    },
    {
        "id": "animal-shapes",
        "tags": [
            "Utility",
            "Illusion & Deception"
        ]
    },
    {
        "id": "animate-dead",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "animate-objects",
        "tags": [
            "Summoning & Creation",
            "Damage"
        ]
    },
    {
        "id": "antilife-shell",
        "tags": [
            "Area Denial",
            "Defensive Buff",
            "Control"
        ]
    },
    {
        "id": "antimagic-field",
        "tags": [
            "Control",
            "Area Denial",
            "Defensive Buff"
        ]
    },
    {
        "id": "antipathy-sympathy",
        "tags": [
            "Mind-Altering",
            "Control",
            "Area Denial"
        ]
    },
    {
        "id": "arcane-eye",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "arcane-lock",
        "tags": [
            "Utility",
            "Control"
        ]
    },
    {
        "id": "astral-projection",
        "tags": [
            "Utility",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "augury",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "aura-of-life",
        "tags": [
            "Healing",
            "Defensive Buff"
        ]
    },
    {
        "id": "awaken",
        "tags": [
            "Summoning & Creation",
            "Mind-Altering",
            "Social Interaction"
        ]
    },
    {
        "id": "bane",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "banishment",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "barkskin",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "beacon-of-hope",
        "tags": [
            "Healing",
            "Defensive Buff"
        ]
    },
    {
        "id": "befuddlement",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "bestow-curse",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Damage",
            "Necrotic Damage"
        ]
    },
    {
        "id": "bigby-s-hand",
        "tags": [
            "Damage",
            "Force Damage",
            "Control",
            "Movement Impairing",
            "Defensive Buff",
            "Summoning & Creation"
        ]
    },
    {
        "id": "blade-barrier",
        "tags": [
            "Area Denial",
            "Damage",
            "Force Damage"
        ]
    },
    {
        "id": "bless",
        "tags": [
            "Offensive Buff",
            "Defensive Buff"
        ]
    },
    {
        "id": "blight",
        "tags": [
            "Damage",
            "Necrotic Damage"
        ]
    },
    {
        "id": "blindness-deafness",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "blink",
        "tags": [
            "Defensive Buff",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "blur",
        "tags": [
            "Defensive Buff",
            "Illusion & Deception"
        ]
    },
    {
        "id": "burning-hands",
        "tags": [
            "Damage",
            "Fire Damage",
            "Area Denial"
        ]
    },
    {
        "id": "call-lightning",
        "tags": [
            "Damage",
            "Lightning Damage",
            "Area Denial"
        ]
    },
    {
        "id": "calm-emotions",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Removal",
            "Social Interaction"
        ]
    },
    {
        "id": "chain-lightning",
        "tags": [
            "Damage",
            "Lightning Damage"
        ]
    },
    {
        "id": "charm-monster",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction"
        ]
    },
    {
        "id": "charm-person",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction"
        ]
    },
    {
        "id": "chill-touch",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Control"
        ]
    },
    {
        "id": "chromatic-orb",
        "tags": [
            "Damage",
            "Acid Damage",
            "Cold Damage",
            "Fire Damage",
            "Lightning Damage",
            "Poison Damage"
        ]
    },
    {
        "id": "circle-of-death",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Area Denial"
        ]
    },
    {
        "id": "clairvoyance",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "clone",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "cloudkill",
        "tags": [
            "Damage",
            "Poison Damage",
            "Area Denial",
            "Control"
        ]
    },
    {
        "id": "color-spray",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Area Denial"
        ]
    },
    {
        "id": "command",
        "tags": [
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "commune",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "commune-with-nature",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "comprehend-languages",
        "tags": [
            "Utility",
            "Social Interaction",
            "Information Gathering"
        ]
    },
    {
        "id": "compulsion",
        "tags": [
            "Control",
            "Mind-Altering",
            "Movement Impairing"
        ]
    },
    {
        "id": "cone-of-cold",
        "tags": [
            "Damage",
            "Cold Damage",
            "Area Denial"
        ]
    },
    {
        "id": "confusion",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "conjure-animals",
        "tags": [
            "Summoning & Creation",
            "Damage",
            "Slashing Damage",
            "Area Denial"
        ]
    },
    {
        "id": "conjure-celestial",
        "tags": [
            "Summoning & Creation",
            "Healing",
            "Damage",
            "Radiant Damage",
            "Area Denial"
        ]
    },
    {
        "id": "conjure-elemental",
        "tags": [
            "Summoning & Creation",
            "Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "conjure-fey",
        "tags": [
            "Summoning & Creation",
            "Damage",
            "Psychic Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "conjure-minor-elementals",
        "tags": [
            "Summoning & Creation",
            "Offensive Buff",
            "Damage",
            "Area Denial",
            "Movement Impairing"
        ]
    },
    {
        "id": "conjure-woodland-beings",
        "tags": [
            "Summoning & Creation",
            "Damage",
            "Force Damage",
            "Area Denial",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "contact-other-plane",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "contagion",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "contingency",
        "tags": [
            "Defensive Buff",
            "Utility"
        ]
    },
    {
        "id": "continual-flame",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "control-water",
        "tags": [
            "Control",
            "Area Denial",
            "Movement Impairing"
        ]
    },
    {
        "id": "control-weather",
        "tags": [
            "Control",
            "Area Denial",
            "Utility"
        ]
    },
    {
        "id": "counterspell",
        "tags": [
            "Control",
            "Defensive Buff"
        ]
    },
    {
        "id": "create-food-and-water",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "create-or-destroy-water",
        "tags": [
            "Utility",
            "Summoning & Creation",
            "Control"
        ]
    },
    {
        "id": "create-undead",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "creation",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "cure-wounds",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "dancing-lights",
        "tags": [
            "Utility",
            "Illusion & Deception"
        ]
    },
    {
        "id": "darkness",
        "tags": [
            "Control",
            "Area Denial",
            "Illusion & Deception"
        ]
    },
    {
        "id": "darkvision",
        "tags": [
            "Utility",
            "Defensive Buff"
        ]
    },
    {
        "id": "daylight",
        "tags": [
            "Utility",
            "Control"
        ]
    },
    {
        "id": "death-ward",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "delayed-blast-fireball",
        "tags": [
            "Damage",
            "Fire Damage",
            "Area Denial"
        ]
    },
    {
        "id": "demiplane",
        "tags": [
            "Utility",
            "Teleportation & Movement",
            "Summoning & Creation"
        ]
    },
    {
        "id": "detect-evil-and-good",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "detect-magic",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "detect-poison-and-disease",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "detect-thoughts",
        "tags": [
            "Information Gathering",
            "Utility",
            "Social Interaction",
            "Mind-Altering"
        ]
    },
    {
        "id": "dimension-door",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "disguise-self",
        "tags": [
            "Illusion & Deception",
            "Utility",
            "Social Interaction"
        ]
    },
    {
        "id": "disintegrate",
        "tags": [
            "Damage",
            "Force Damage"
        ]
    },
    {
        "id": "dispel-evil-and-good",
        "tags": [
            "Condition Removal",
            "Control",
            "Defensive Buff"
        ]
    },
    {
        "id": "dispel-magic",
        "tags": [
            "Control",
            "Utility"
        ]
    },
    {
        "id": "dissonant-whispers",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Control",
            "Movement Impairing",
            "Mind-Altering"
        ]
    },
    {
        "id": "divination",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "divine-favor",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Radiant Damage"
        ]
    },
    {
        "id": "divine-smite",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Radiant Damage"
        ]
    },
    {
        "id": "divine-word",
        "tags": [
            "Damage",
            "Control",
            "Condition Inflicting",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "dominate-beast",
        "tags": [
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "dominate-monster",
        "tags": [
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "dominate-person",
        "tags": [
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "dragon-s-breath",
        "tags": [
            "Damage",
            "Area Denial",
            "Acid Damage",
            "Cold Damage",
            "Fire Damage",
            "Lightning Damage",
            "Poison Damage"
        ]
    },
    {
        "id": "drawmij-s-instant-summons",
        "tags": [
            "Utility",
            "Teleportation & Movement",
            "Information Gathering"
        ]
    },
    {
        "id": "dream",
        "tags": [
            "Mind-Altering",
            "Social Interaction",
            "Damage",
            "Psychic Damage",
            "Information Gathering"
        ]
    },
    {
        "id": "druidcraft",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "earthquake",
        "tags": [
            "Damage",
            "Bludgeoning Damage",
            "Control",
            "Area Denial",
            "Movement Impairing",
            "Condition Inflicting"
        ]
    },
    {
        "id": "eldritch-blast",
        "tags": [
            "Damage",
            "Force Damage"
        ]
    },
    {
        "id": "elementalism",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "enhance-ability",
        "tags": [
            "Offensive Buff",
            "Defensive Buff",
            "Social Interaction",
            "Utility"
        ]
    },
    {
        "id": "enlarge-reduce",
        "tags": [
            "Offensive Buff",
            "Defensive Buff",
            "Control"
        ]
    },
    {
        "id": "ensnaring-strike",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Movement Impairing",
            "Damage",
            "Piercing Damage"
        ]
    },
    {
        "id": "entangle",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Movement Impairing",
            "Area Denial"
        ]
    },
    {
        "id": "enthrall",
        "tags": [
            "Control",
            "Mind-Altering",
            "Social Interaction"
        ]
    },
    {
        "id": "etherealness",
        "tags": [
            "Teleportation & Movement",
            "Defensive Buff",
            "Utility"
        ]
    },
    {
        "id": "evard-s-black-tentacles",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Movement Impairing",
            "Area Denial",
            "Damage",
            "Bludgeoning Damage"
        ]
    },
    {
        "id": "expeditious-retreat",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "eyebite",
        "tags": [
            "Control",
            "Condition Inflicting",
            "Mind-Altering"
        ]
    },
    {
        "id": "fabricate",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "faerie-fire",
        "tags": [
            "Control",
            "Offensive Buff",
            "Illusion & Deception"
        ]
    },
    {
        "id": "false-life",
        "tags": [
            "Temporary Hit Points",
            "Defensive Buff"
        ]
    },
    {
        "id": "fear",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Inflicting",
            "Movement Impairing"
        ]
    },
    {
        "id": "feather-fall",
        "tags": [
            "Defensive Buff",
            "Utility"
        ]
    },
    {
        "id": "find-familiar",
        "tags": [
            "Summoning & Creation",
            "Utility",
            "Information Gathering"
        ]
    },
    {
        "id": "find-steed",
        "tags": [
            "Summoning & Creation",
            "Utility",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "find-the-path",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "find-traps",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "finger-of-death",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Summoning & Creation"
        ]
    },
    {
        "id": "fire-bolt",
        "tags": [
            "Damage",
            "Fire Damage"
        ]
    },
    {
        "id": "fire-shield",
        "tags": [
            "Defensive Buff",
            "Damage",
            "Fire Damage",
            "Cold Damage"
        ]
    },
    {
        "id": "fire-storm",
        "tags": [
            "Damage",
            "Fire Damage",
            "Area Denial"
        ]
    },
    {
        "id": "fireball",
        "tags": [
            "Damage",
            "Fire Damage",
            "Area Denial"
        ]
    },
    {
        "id": "flame-blade",
        "tags": [
            "Damage",
            "Fire Damage",
            "Offensive Buff"
        ]
    },
    {
        "id": "flame-strike",
        "tags": [
            "Damage",
            "Fire Damage",
            "Radiant Damage",
            "Area Denial"
        ]
    },
    {
        "id": "flaming-sphere",
        "tags": [
            "Damage",
            "Fire Damage",
            "Area Denial"
        ]
    },
    {
        "id": "flesh-to-stone",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "fly",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "fog-cloud",
        "tags": [
            "Control",
            "Area Denial",
            "Illusion & Deception"
        ]
    },
    {
        "id": "forbiddance",
        "tags": [
            "Control",
            "Area Denial",
            "Damage",
            "Teleportation & Movement",
            "Defensive Buff"
        ]
    },
    {
        "id": "forcecage",
        "tags": [
            "Control",
            "Area Denial"
        ]
    },
    {
        "id": "foresight",
        "tags": [
            "Defensive Buff",
            "Offensive Buff"
        ]
    },
    {
        "id": "freedom-of-movement",
        "tags": [
            "Defensive Buff",
            "Condition Removal",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "gaseous-form",
        "tags": [
            "Defensive Buff",
            "Utility",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "gate",
        "tags": [
            "Teleportation & Movement",
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "geas",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction",
            "Damage",
            "Psychic Damage"
        ]
    },
    {
        "id": "gentle-repose",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "giant-insect",
        "tags": [
            "Summoning & Creation",
            "Damage"
        ]
    },
    {
        "id": "glibness",
        "tags": [
            "Social Interaction",
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "globe-of-invulnerability",
        "tags": [
            "Defensive Buff",
            "Area Denial"
        ]
    },
    {
        "id": "glyph-of-warding",
        "tags": [
            "Damage",
            "Control",
            "Utility"
        ]
    },
    {
        "id": "goodberry",
        "tags": [
            "Healing",
            "Utility"
        ]
    },
    {
        "id": "grease",
        "tags": [
            "Control",
            "Movement Impairing",
            "Area Denial",
            "Condition Inflicting"
        ]
    },
    {
        "id": "greater-invisibility",
        "tags": [
            "Illusion & Deception",
            "Defensive Buff",
            "Utility"
        ]
    },
    {
        "id": "greater-restoration",
        "tags": [
            "Condition Removal",
            "Healing"
        ]
    },
    {
        "id": "guardian-of-faith",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Area Denial",
            "Summoning & Creation"
        ]
    },
    {
        "id": "guards-and-wards",
        "tags": [
            "Control",
            "Area Denial",
            "Illusion & Deception",
            "Movement Impairing"
        ]
    },
    {
        "id": "guidance",
        "tags": [
            "Offensive Buff",
            "Defensive Buff",
            "Utility"
        ]
    },
    {
        "id": "guiding-bolt",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Offensive Buff"
        ]
    },
    {
        "id": "gust-of-wind",
        "tags": [
            "Control",
            "Movement Impairing"
        ]
    },
    {
        "id": "hallow",
        "tags": [
            "Area Denial",
            "Control",
            "Defensive Buff",
            "Damage"
        ]
    },
    {
        "id": "hallucinatory-terrain",
        "tags": [
            "Illusion & Deception",
            "Control"
        ]
    },
    {
        "id": "harm",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Control"
        ]
    },
    {
        "id": "haste",
        "tags": [
            "Offensive Buff",
            "Defensive Buff",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "heal",
        "tags": [
            "Healing",
            "Condition Removal"
        ]
    },
    {
        "id": "healing-word",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "heat-metal",
        "tags": [
            "Damage",
            "Fire Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "hellish-rebuke",
        "tags": [
            "Damage",
            "Fire Damage"
        ]
    },
    {
        "id": "heroes--feast",
        "tags": [
            "Healing",
            "Defensive Buff",
            "Condition Removal",
            "Temporary Hit Points"
        ]
    },
    {
        "id": "heroism",
        "tags": [
            "Defensive Buff",
            "Temporary Hit Points",
            "Condition Removal"
        ]
    },
    {
        "id": "hex",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Necrotic Damage",
            "Control"
        ]
    },
    {
        "id": "hold-monster",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "hold-person",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "holy-aura",
        "tags": [
            "Defensive Buff",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "hunter-s-mark",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Force Damage",
            "Information Gathering"
        ]
    },
    {
        "id": "hypnotic-pattern",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "ice-knife",
        "tags": [
            "Damage",
            "Piercing Damage",
            "Cold Damage",
            "Area Denial"
        ]
    },
    {
        "id": "ice-storm",
        "tags": [
            "Damage",
            "Bludgeoning Damage",
            "Cold Damage",
            "Area Denial",
            "Movement Impairing"
        ]
    },
    {
        "id": "identify",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "illusory-script",
        "tags": [
            "Illusion & Deception",
            "Utility",
            "Social Interaction"
        ]
    },
    {
        "id": "imprisonment",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "incendiary-cloud",
        "tags": [
            "Damage",
            "Fire Damage",
            "Area Denial"
        ]
    },
    {
        "id": "inflict-wounds",
        "tags": [
            "Damage",
            "Necrotic Damage"
        ]
    },
    {
        "id": "insect-plague",
        "tags": [
            "Damage",
            "Piercing Damage",
            "Area Denial",
            "Movement Impairing"
        ]
    },
    {
        "id": "invisibility",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "jump",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "knock",
        "tags": [
            "Utility",
            "Control"
        ]
    },
    {
        "id": "legend-lore",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "leomund-s-secret-chest",
        "tags": [
            "Utility",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "leomund-s-tiny-hut",
        "tags": [
            "Defensive Buff",
            "Area Denial",
            "Utility"
        ]
    },
    {
        "id": "lesser-restoration",
        "tags": [
            "Condition Removal",
            "Healing"
        ]
    },
    {
        "id": "levitate",
        "tags": [
            "Control",
            "Movement Impairing"
        ]
    },
    {
        "id": "light",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "lightning-bolt",
        "tags": [
            "Damage",
            "Lightning Damage",
            "Area Denial"
        ]
    },
    {
        "id": "locate-animals-or-plants",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "locate-creature",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "locate-object",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "longstrider",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "mage-armor",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "mage-hand",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "magic-circle",
        "tags": [
            "Control",
            "Area Denial",
            "Defensive Buff"
        ]
    },
    {
        "id": "magic-jar",
        "tags": [
            "Mind-Altering",
            "Control",
            "Utility"
        ]
    },
    {
        "id": "magic-missile",
        "tags": [
            "Damage",
            "Force Damage"
        ]
    },
    {
        "id": "magic-mouth",
        "tags": [
            "Utility",
            "Social Interaction"
        ]
    },
    {
        "id": "magic-weapon",
        "tags": [
            "Offensive Buff"
        ]
    },
    {
        "id": "major-image",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "mass-cure-wounds",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "mass-heal",
        "tags": [
            "Healing",
            "Condition Removal"
        ]
    },
    {
        "id": "mass-healing-word",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "mass-suggestion",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction"
        ]
    },
    {
        "id": "maze",
        "tags": [
            "Control",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "meld-into-stone",
        "tags": [
            "Utility",
            "Defensive Buff",
            "Illusion & Deception"
        ]
    },
    {
        "id": "melf-s-acid-arrow",
        "tags": [
            "Damage",
            "Acid Damage"
        ]
    },
    {
        "id": "mending",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "message",
        "tags": [
            "Utility",
            "Social Interaction"
        ]
    },
    {
        "id": "meteor-swarm",
        "tags": [
            "Damage",
            "Fire Damage",
            "Bludgeoning Damage",
            "Area Denial"
        ]
    },
    {
        "id": "mind-blank",
        "tags": [
            "Defensive Buff",
            "Condition Removal"
        ]
    },
    {
        "id": "mind-spike",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Information Gathering"
        ]
    },
    {
        "id": "minor-illusion",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "mirage-arcane",
        "tags": [
            "Illusion & Deception",
            "Control",
            "Area Denial"
        ]
    },
    {
        "id": "mirror-image",
        "tags": [
            "Defensive Buff",
            "Illusion & Deception"
        ]
    },
    {
        "id": "mislead",
        "tags": [
            "Illusion & Deception",
            "Utility",
            "Information Gathering"
        ]
    },
    {
        "id": "misty-step",
        "tags": [
            "Teleportation & Movement"
        ]
    },
    {
        "id": "modify-memory",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction",
            "Illusion & Deception"
        ]
    },
    {
        "id": "moonbeam",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Area Denial",
            "Control"
        ]
    },
    {
        "id": "mordenkainen-s-faithful-hound",
        "tags": [
            "Damage",
            "Force Damage",
            "Information Gathering",
            "Summoning & Creation"
        ]
    },
    {
        "id": "mordenkainen-s-magnificent-mansion",
        "tags": [
            "Utility",
            "Summoning & Creation",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "mordenkainen-s-private-sanctum",
        "tags": [
            "Defensive Buff",
            "Area Denial",
            "Control"
        ]
    },
    {
        "id": "mordenkainen-s-sword",
        "tags": [
            "Damage",
            "Force Damage",
            "Summoning & Creation"
        ]
    },
    {
        "id": "move-earth",
        "tags": [
            "Control",
            "Area Denial",
            "Utility"
        ]
    },
    {
        "id": "nondetection",
        "tags": [
            "Defensive Buff",
            "Illusion & Deception"
        ]
    },
    {
        "id": "nystul-s-magic-aura",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "otiluke-s-freezing-sphere",
        "tags": [
            "Damage",
            "Cold Damage",
            "Area Denial",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "otiluke-s-resilient-sphere",
        "tags": [
            "Control",
            "Defensive Buff"
        ]
    },
    {
        "id": "otto-s-irresistible-dance",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "pass-without-trace",
        "tags": [
            "Illusion & Deception",
            "Defensive Buff",
            "Utility"
        ]
    },
    {
        "id": "passwall",
        "tags": [
            "Utility",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "phantasmal-force",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Mind-Altering",
            "Illusion & Deception",
            "Control"
        ]
    },
    {
        "id": "phantasmal-killer",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Mind-Altering",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "phantom-steed",
        "tags": [
            "Summoning & Creation",
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "planar-ally",
        "tags": [
            "Summoning & Creation",
            "Social Interaction",
            "Utility"
        ]
    },
    {
        "id": "planar-binding",
        "tags": [
            "Control",
            "Mind-Altering",
            "Social Interaction"
        ]
    },
    {
        "id": "plane-shift",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "plant-growth",
        "tags": [
            "Control",
            "Movement Impairing",
            "Utility"
        ]
    },
    {
        "id": "poison-spray",
        "tags": [
            "Damage",
            "Poison Damage"
        ]
    },
    {
        "id": "polymorph",
        "tags": [
            "Control",
            "Illusion & Deception",
            "Defensive Buff",
            "Temporary Hit Points"
        ]
    },
    {
        "id": "power-word-heal",
        "tags": [
            "Healing",
            "Condition Removal"
        ]
    },
    {
        "id": "power-word-kill",
        "tags": [
            "Damage",
            "Psychic Damage"
        ]
    },
    {
        "id": "power-word-stun",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "prayer-of-healing",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "prestidigitation",
        "tags": [
            "Utility"
        ]
    },
    {
        "id": "prismatic-spray",
        "tags": [
            "Damage",
            "Fire Damage",
            "Acid Damage",
            "Lightning Damage",
            "Poison Damage",
            "Cold Damage",
            "Control",
            "Condition Inflicting",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "prismatic-wall",
        "tags": [
            "Area Denial",
            "Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "produce-flame",
        "tags": [
            "Damage",
            "Fire Damage",
            "Utility"
        ]
    },
    {
        "id": "programmed-illusion",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "project-image",
        "tags": [
            "Illusion & Deception",
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "protection-from-energy",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "protection-from-evil-and-good",
        "tags": [
            "Defensive Buff",
            "Condition Removal"
        ]
    },
    {
        "id": "protection-from-poison",
        "tags": [
            "Defensive Buff",
            "Condition Removal"
        ]
    },
    {
        "id": "purify-food-and-drink",
        "tags": [
            "Utility",
            "Condition Removal"
        ]
    },
    {
        "id": "raise-dead",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "rary-s-telepathic-bond",
        "tags": [
            "Social Interaction",
            "Utility",
            "Information Gathering"
        ]
    },
    {
        "id": "ray-of-enfeeblement",
        "tags": [
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "ray-of-frost",
        "tags": [
            "Damage",
            "Cold Damage",
            "Control",
            "Movement Impairing"
        ]
    },
    {
        "id": "ray-of-sickness",
        "tags": [
            "Damage",
            "Poison Damage",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "regenerate",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "reincarnate",
        "tags": [
            "Healing",
            "Utility"
        ]
    },
    {
        "id": "remove-curse",
        "tags": [
            "Condition Removal"
        ]
    },
    {
        "id": "resistance",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "resurrection",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "reverse-gravity",
        "tags": [
            "Control",
            "Movement Impairing",
            "Area Denial"
        ]
    },
    {
        "id": "revivify",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "rope-trick",
        "tags": [
            "Utility",
            "Defensive Buff"
        ]
    },
    {
        "id": "sacred-flame",
        "tags": [
            "Damage",
            "Radiant Damage"
        ]
    },
    {
        "id": "sanctuary",
        "tags": [
            "Defensive Buff",
            "Control"
        ]
    },
    {
        "id": "scorching-ray",
        "tags": [
            "Damage",
            "Fire Damage"
        ]
    },
    {
        "id": "scrying",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "searing-smite",
        "tags": [
            "Damage",
            "Fire Damage",
            "Offensive Buff",
            "Condition Inflicting"
        ]
    },
    {
        "id": "see-invisibility",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "seeming",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "sending",
        "tags": [
            "Social Interaction",
            "Utility"
        ]
    },
    {
        "id": "sequester",
        "tags": [
            "Defensive Buff",
            "Control",
            "Illusion & Deception"
        ]
    },
    {
        "id": "shapechange",
        "tags": [
            "Utility",
            "Illusion & Deception",
            "Defensive Buff",
            "Offensive Buff"
        ]
    },
    {
        "id": "shatter",
        "tags": [
            "Damage",
            "Thunder Damage",
            "Area Denial"
        ]
    },
    {
        "id": "shield",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "shield-of-faith",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "shillelagh",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Force Damage"
        ]
    },
    {
        "id": "shining-smite",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Offensive Buff",
            "Control"
        ]
    },
    {
        "id": "shocking-grasp",
        "tags": [
            "Damage",
            "Lightning Damage",
            "Control"
        ]
    },
    {
        "id": "silence",
        "tags": [
            "Control",
            "Area Denial"
        ]
    },
    {
        "id": "silent-image",
        "tags": [
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "simulacrum",
        "tags": [
            "Summoning & Creation",
            "Illusion & Deception",
            "Utility"
        ]
    },
    {
        "id": "sleep",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "sleet-storm",
        "tags": [
            "Control",
            "Area Denial",
            "Movement Impairing",
            "Condition Inflicting"
        ]
    },
    {
        "id": "slow",
        "tags": [
            "Control",
            "Movement Impairing",
            "Condition Inflicting"
        ]
    },
    {
        "id": "sorcerous-burst",
        "tags": [
            "Damage",
            "Acid Damage",
            "Cold Damage",
            "Fire Damage",
            "Lightning Damage",
            "Poison Damage",
            "Psychic Damage"
        ]
    },
    {
        "id": "spare-the-dying",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "speak-with-animals",
        "tags": [
            "Social Interaction",
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "speak-with-dead",
        "tags": [
            "Social Interaction",
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "speak-with-plants",
        "tags": [
            "Social Interaction",
            "Information Gathering",
            "Utility",
            "Control"
        ]
    },
    {
        "id": "spider-climb",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "spike-growth",
        "tags": [
            "Area Denial",
            "Movement Impairing",
            "Damage",
            "Piercing Damage"
        ]
    },
    {
        "id": "spirit-guardians",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Necrotic Damage",
            "Area Denial",
            "Movement Impairing"
        ]
    },
    {
        "id": "spiritual-weapon",
        "tags": [
            "Damage",
            "Force Damage",
            "Summoning & Creation"
        ]
    },
    {
        "id": "starry-wisp",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Control"
        ]
    },
    {
        "id": "stinking-cloud",
        "tags": [
            "Control",
            "Area Denial",
            "Condition Inflicting"
        ]
    },
    {
        "id": "stone-shape",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "stoneskin",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "storm-of-vengeance",
        "tags": [
            "Damage",
            "Thunder Damage",
            "Acid Damage",
            "Lightning Damage",
            "Bludgeoning Damage",
            "Cold Damage",
            "Area Denial",
            "Control"
        ]
    },
    {
        "id": "suggestion",
        "tags": [
            "Mind-Altering",
            "Control",
            "Social Interaction"
        ]
    },
    {
        "id": "summon-dragon",
        "tags": [
            "Summoning & Creation"
        ]
    },
    {
        "id": "sunbeam",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Area Denial",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "sunburst",
        "tags": [
            "Damage",
            "Radiant Damage",
            "Area Denial",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "symbol",
        "tags": [
            "Damage",
            "Control",
            "Condition Inflicting",
            "Area Denial",
            "Mind-Altering"
        ]
    },
    {
        "id": "tasha-s-hideous-laughter",
        "tags": [
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "telekinesis",
        "tags": [
            "Control",
            "Movement Impairing",
            "Utility"
        ]
    },
    {
        "id": "teleport",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "teleportation-circle",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "tenser-s-floating-disk",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "thaumaturgy",
        "tags": [
            "Utility",
            "Social Interaction"
        ]
    },
    {
        "id": "thunderwave",
        "tags": [
            "Damage",
            "Thunder Damage",
            "Control",
            "Movement Impairing"
        ]
    },
    {
        "id": "time-stop",
        "tags": [
            "Utility",
            "Control"
        ]
    },
    {
        "id": "tongues",
        "tags": [
            "Social Interaction",
            "Utility"
        ]
    },
    {
        "id": "transport-via-plants",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "tree-stride",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "true-polymorph",
        "tags": [
            "Control",
            "Illusion & Deception",
            "Summoning & Creation"
        ]
    },
    {
        "id": "true-resurrection",
        "tags": [
            "Healing"
        ]
    },
    {
        "id": "true-seeing",
        "tags": [
            "Information Gathering",
            "Utility"
        ]
    },
    {
        "id": "true-strike",
        "tags": [
            "Offensive Buff",
            "Damage",
            "Radiant Damage"
        ]
    },
    {
        "id": "tsunami",
        "tags": [
            "Damage",
            "Bludgeoning Damage",
            "Area Denial",
            "Control",
            "Movement Impairing"
        ]
    },
    {
        "id": "unseen-servant",
        "tags": [
            "Utility",
            "Summoning & Creation"
        ]
    },
    {
        "id": "vampiric-touch",
        "tags": [
            "Damage",
            "Necrotic Damage",
            "Healing"
        ]
    },
    {
        "id": "vicious-mockery",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Control",
            "Mind-Altering"
        ]
    },
    {
        "id": "vitriolic-sphere",
        "tags": [
            "Damage",
            "Acid Damage",
            "Area Denial"
        ]
    },
    {
        "id": "wall-of-fire",
        "tags": [
            "Area Denial",
            "Damage",
            "Fire Damage"
        ]
    },
    {
        "id": "wall-of-force",
        "tags": [
            "Area Denial",
            "Control"
        ]
    },
    {
        "id": "wall-of-ice",
        "tags": [
            "Area Denial",
            "Damage",
            "Cold Damage",
            "Control"
        ]
    },
    {
        "id": "wall-of-stone",
        "tags": [
            "Area Denial",
            "Control",
            "Summoning & Creation"
        ]
    },
    {
        "id": "wall-of-thorns",
        "tags": [
            "Area Denial",
            "Movement Impairing",
            "Damage",
            "Piercing Damage",
            "Slashing Damage"
        ]
    },
    {
        "id": "warding-bond",
        "tags": [
            "Defensive Buff"
        ]
    },
    {
        "id": "water-breathing",
        "tags": [
            "Utility",
            "Defensive Buff"
        ]
    },
    {
        "id": "water-walk",
        "tags": [
            "Utility",
            "Teleportation & Movement"
        ]
    },
    {
        "id": "web",
        "tags": [
            "Area Denial",
            "Movement Impairing",
            "Control",
            "Condition Inflicting"
        ]
    },
    {
        "id": "weird",
        "tags": [
            "Damage",
            "Psychic Damage",
            "Area Denial",
            "Control",
            "Mind-Altering",
            "Condition Inflicting"
        ]
    },
    {
        "id": "wind-walk",
        "tags": [
            "Teleportation & Movement",
            "Utility",
            "Defensive Buff"
        ]
    },
    {
        "id": "wind-wall",
        "tags": [
            "Area Denial",
            "Control",
            "Damage",
            "Bludgeoning Damage"
        ]
    },
    {
        "id": "wish",
        "tags": [
            "Healing",
            "Condition Removal",
            "Summoning & Creation",
            "Defensive Buff",
            "Utility",
            "Control"
        ]
    },
    {
        "id": "word-of-recall",
        "tags": [
            "Teleportation & Movement",
            "Utility"
        ]
    },
    {
        "id": "zone-of-truth",
        "tags": [
            "Control",
            "Mind-Altering",
            "Social Interaction",
            "Information Gathering"
        ]
    }
]


function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

// const spells = spellList.map(spell => {
//     spell.icon = camelize(spell.id).replaceAll("-","")
//     spell.tags = tags.find(v => v.id === spell.id)?.tags
//     return spell
// })

export default function Tmp() {
    return (
        <>
            <div>{[...new Set(tags.flatMap(t => t.tags))].map(t => <>"{t}": "{t}",<br/></>)}</div>
            {/*<br/><br/>*/}
            {/*<pre>*/}
            {/*{JSON.stringify(spells, null, 2)}*/}
            {/*</pre>*/}
        </>
    );
}