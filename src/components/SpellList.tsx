import {ISpell} from "@/data/Spell";
import {Spell, SpellLg, SpellSize, spellSizes} from "@/components/Spell";
import {useState} from "react";

export type SpellGridSized = Record<SpellSize, string>

interface ISpellListProps {
    grid: SpellGridSized,
    spells: ISpell[],
}

export function SpellList({grid, spells}: ISpellListProps) {
    const [spellSize, setSpellSize] = useState<SpellSize>("md")
    const [SpellModalActive, setSpellModalActive] = useState<ISpell| null>(null)

    return <div className={`flex flex-col gap-4 w-full`}>
        <div className={`bg-white/10`}>

            <div className="join">
                {spellSizes.map((size) => {
                    return <button key={size}
                                   className={`btn join-item ${size === spellSize ? "btn-primary" : ""}`}
                                   onClick={() => setSpellSize(size)}
                    >
                        {size}
                    </button>
                })}
            </div>
        </div>
        <div className={`grid ${grid[spellSize]} gap-4`}>
            {spells.map(spell => {
                return <Spell  key={spell.id} spell={spell} size={spellSize}/>
            })}
        </div>
        <dialog id={`spell_modal`} className="modal">
            <div className="modal-box bg-transparent shadow-none p-0">
                {SpellModalActive && <SpellLg spell={SpellModalActive}/> }
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
}