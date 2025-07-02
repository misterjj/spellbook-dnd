import {ISpell} from "@/data/Spell";
import {Spell, SpellLg, SpellSize, spellSizes} from "@/components/Spell";
import {memo, Ref, useCallback, useEffect, useRef, useState} from "react";
import Fuse from "fuse.js";
import {useDebouncedCallback} from "use-debounce";
import {useTranslation} from "react-i18next";

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
    const {i18n} = useTranslation();
    const [spells, setSpells] = useState<ISpell[]>(initSpells)
    const [spellSize, setSpellSize] = useState<SpellSize>("md")
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const [spendingChangeSize, setSpendingChangeSize] = useState(false)
    const [fuse, setFuse] = useState<Fuse<ISpell> | null>(null)

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);

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


    const search = useDebouncedCallback(() => {
        const text = searchRef.current?.value || ""
        setSpendingChangeSize(true)
        setTimeout(() => {
            if ("" === text) {
                setSpells(initSpells)
            } else if (fuse) {
                setSpells(fuse.search(text).slice(0, 30).map(r => r.item))
            }
            setSpendingChangeSize(false)
        }, 100)
    }, 500);

    useEffect(() => {
        const options = {
            ignoreDiacritics: true,
            keys: [{name: `name.${i18n.language}`, weight: 10}, {name: `description.${i18n.language}`, weight: 10}]
        }
        const f = new Fuse(initSpells, options)

        setFuse(f)
        search()
    }, [initSpells, i18n.language, search])

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
                <input type="search" required placeholder="Search" onChange={(e) => search()} ref={searchRef}/>
            </label>
        </div>
        <div className={spendingChangeSize ? 'opacity-50 transition-opacity' : ''}>
            <SpellGrid grid={grid} spells={spells} onSelect={onSelectHandler} spellSize={spellSize}/>
        </div>
        <SpellModal spell={spellModalActive} ref={modalRef}/>
    </div>
}