import {ISpell} from "@/data/Spell";
import {Spell, SpellLg, SpellSize, spellSizes} from "@/components/Spell";
import {memo, Ref, useCallback, useRef, useState} from "react";

export type SpellGridSized = Record<SpellSize, string>


interface ISpellModalProps {
    spell: ISpell | null,
    ref: Ref<HTMLDialogElement | null>
}

function SpellModal({spell, ref}: ISpellModalProps) {
    return <dialog id={`spell_modal`} className="modal" ref={ref}>
        <div className="modal-box bg-transparent shadow-none p-0">
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
    spells: ISpell[],
}

export function SpellList({grid, spells}: ISpellListProps) {
    const [spellSize, setSpellSize] = useState<SpellSize>("md")
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const onSelectHandler = useCallback((spell: ISpell) => {
        setSpellModalActive(spell)
        modalRef.current?.showModal()
    }, []);

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
        <SpellGrid grid={grid} spells={spells} onSelect={onSelectHandler} spellSize={spellSize}/>
        <SpellModal spell={spellModalActive} ref={modalRef}/>
    </div>
}