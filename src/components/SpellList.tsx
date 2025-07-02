import {ISpell} from "@/data/Spell";
import {Spell, SpellLg, SpellSize, spellSizes} from "@/components/Spell";
import {memo, Ref, useCallback, useRef, useState} from "react";
import Fuse from "fuse.js";

export type SpellGridSized = Record<SpellSize, string>


interface ISpellModalProps {
    spell: ISpell | null,
    ref: Ref<HTMLDialogElement | null>
}

function SpellModal({spell, ref}: ISpellModalProps) {
    return <dialog id={`spell_modal`} className="modal" ref={ref}>
        <div className="modal-box bg-transparent shadow-none p-0 max-w-110">
            {spell && <SpellLg spell={spell}/>}
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
}


interface ISpellListGridProps {
    grid: SpellGridSized,
    spells: ISpell[],
    spellSize: SpellSize,
    onSelect: (spell: ISpell) => void,
}

const SpellGrid = memo(function SpellGrid({grid, spells, spellSize, onSelect}: ISpellListGridProps) {
    return <div className={`grid ${grid[spellSize]} gap-4`}>
        {spells.map(spell => {
            return <Spell key={spell.id} spell={spell} size={spellSize} onSelect={onSelect}/>
        })}
    </div>
})

interface ISpellListProps {
    grid: SpellGridSized,
    initSpells: ISpell[],
}

export function SpellList({grid, initSpells}: ISpellListProps) {
    const [spells, setSpells] = useState<ISpell[]>(initSpells)
    const [spellSize, setSpellSize] = useState<SpellSize>("md")
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [spendingChangeSize, setSpendingChangeSize] = useState(false)

    const onSelectHandler = useCallback((spell: ISpell) => {
        setSpellModalActive(spell)
        modalRef.current?.showModal()
    }, []);

    const onSpellSizeChangeHandler = useCallback((size: SpellSize) => {
        setSpendingChangeSize(true)
        setTimeout(() => {
            setSpellSize(size)
            setSpendingChangeSize(false)
        }, 100)
    }, []);

    const options = {
        includeScore: true,
        keys: ['name.fr']
    }

    const fuse = new Fuse(spells, options)

    const search = useCallback((text: string) => {
        setSpells(fuse.search(text).sort((a, b) => b.score - a.score).reverse().map(r => r.item))
        console.log("fuse", fuse.search(text).sort((a, b) => b.score - a.score).map(r => r.item))
    }, [fuse]);

    return <div className={`flex flex-col gap-4 w-full`}>
        <div className={`bg-white/10 p-2 flex gap-2`}>
            {spendingChangeSize && <span>pending</span>}
            <div className="join">
                {spellSizes.map((size) => {
                    return <button key={size}
                                   className={`btn join-item ${size === spellSize ? "btn-primary" : ""}`}
                                   onClick={() => onSpellSizeChangeHandler(size)}
                    >
                        {size}
                    </button>
                })}
            </div>
            <label className="input !outline-none">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" onChange={(e) => search(e.target.value)}/>
            </label>
        </div>
        <div className={spendingChangeSize ? 'opacity-50 transition-opacity' : ''}>
            <SpellGrid grid={grid} spells={spells} onSelect={onSelectHandler} spellSize={spellSize}/>
        </div>
        <SpellModal spell={spellModalActive} ref={modalRef}/>
    </div>
}