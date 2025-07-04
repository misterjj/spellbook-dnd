import {ISpell} from "@/data/Spell";
import {Spell, SpellLg, SpellSize, spellSizes} from "@/components/Spell";
import {memo, Ref, useCallback, useEffect, useRef, useState} from "react";
import Fuse from "fuse.js";
import {useDebouncedCallback} from "use-debounce";
import {useTranslation} from "react-i18next";
import {HiFilter, HiOutlineFilter} from "react-icons/hi";
import {BreedId, breeds} from "@/data/Breed";
import {Breed} from "@/components/Breed";

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
    const {t, i18n} = useTranslation();
    const [spells, setSpells] = useState<ISpell[]>(initSpells)
    const [spellSize, setSpellSize] = useState<SpellSize>("md")
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const [spendingChangeSize, setSpendingChangeSize] = useState(false)
    const [fuse, setFuse] = useState<Fuse<ISpell> | null>(null)
    const [breedFilter, setBreedFilter] = useState<BreedId[]>([])
    const [isFiltered, setIsFiltered] = useState(false)

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


    const refreshList = useDebouncedCallback(() => {
        setSpendingChangeSize(true)
        setTimeout(() => {
            const applySearch = (spells: ISpell[]): ISpell[] => {
                const text = searchRef.current?.value || ""
                if ("" === text) {
                    return spells
                } else if (fuse) {
                    return fuse.search(text).map(r => r.item)
                }

                return spells
            }

            const applyBreedFilter = (spells: ISpell[]): ISpell[] => {
                if (breedFilter.length === 0) return spells
                return spells.filter(spell => {
                    return spell.breeds.some(breed => {
                        return breedFilter.includes(breed)
                    })
                })
            }

            setSpells(applyBreedFilter(applySearch(initSpells)))
            setSpendingChangeSize(false)
        }, 100)
    }, 500)

    useEffect(() => {
        setIsFiltered(breedFilter.length !== breeds.length && breedFilter.length > 0)
        refreshList()
    }, [initSpells, breedFilter, refreshList])

    useEffect(() => {
        const options = {
            ignoreDiacritics: true,
            keys: [{name: `name.${i18n.language}`, weight: 10}, {name: `description.${i18n.language}`, weight: 10}]
        }
        const f = new Fuse(initSpells, options)

        setFuse(f)
        refreshList()
    }, [initSpells, i18n.language, refreshList])

    return <div className={`flex flex-col gap-4 w-full`}>
        <div className={`bg-white/10 p-2 flex gap-2 justify-end items-center`}>
            {spendingChangeSize && <span>pending</span>}
            <div>{spells.length} / {initSpells.length}</div>
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
                <input type="search" required placeholder="Search" onChange={() => refreshList()} ref={searchRef}/>
            </label>
            <div className="drawer drawer-end w-10">
                <input id="drawer-filter" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    <label htmlFor="drawer-filter"
                           className={`btn btn-ghost hover:bg-transparent hover:border-none !shadow-none drawer-button btn-square text-primary`}>
                        <div className={`indicator`}>
                            {isFiltered && <span className="indicator-item status status-secondary"></span> }
                            {isFiltered && <HiFilter size={30}/> }
                            {!isFiltered && <HiOutlineFilter size={30}/> }
                        </div>
                    </label>
                </div>
                <div className="drawer-side z-40">
                    <label htmlFor="drawer-filter" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <div className={`flex flex-col gap-4`}>
                            <fieldset
                                className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
                                <legend className="fieldset-legend">{t("layout.filter.breed.title")}</legend>
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex items-center gap-2`}>
                                        <input
                                            type="checkbox"
                                            checked={breedFilter.length === breeds.length}
                                            id={`breed-filter-all`}
                                            className="checkbox checkbox-sm checkbox-primary"
                                            onChange={() => {
                                                if (breedFilter.length === breeds.length) {
                                                    setBreedFilter([])
                                                } else {
                                                    setBreedFilter(breeds)
                                                }
                                            }}
                                        />
                                        <label htmlFor={`breed-filter-all`}
                                               className={`cursor-pointer select-none`}>{t("layout.filter.breed.all")}</label>
                                    </div>
                                    {breeds.map(breed => {
                                        const isChecked = breedFilter.includes(breed)
                                        const handlerChange = () => {
                                            if (isChecked) {
                                                setBreedFilter(breedFilter.filter(b => b !== breed))
                                            } else {
                                                setBreedFilter([...breedFilter, breed])
                                            }
                                        }

                                        return <div key={breed} className={`flex items-center gap-2`}>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                id={`breed-filter-${breed}`}
                                                className="checkbox checkbox-sm checkbox-primary"
                                                onChange={handlerChange}
                                            />
                                            <label htmlFor={`breed-filter-${breed}`}
                                                   className={`cursor-pointer select-none`}><Breed id={breed}/></label>
                                        </div>
                                    })}
                                </div>
                            </fieldset>
                            <fieldset
                                className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
                                <legend className="fieldset-legend">{t("layout.filter.spell-level.title")}</legend>
                            </fieldset>
                            <fieldset
                                className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
                                <legend className="fieldset-legend">{t("layout.filter.casting-time.title")}</legend>
                            </fieldset>
                        </div>
                    </ul>
                </div>
            </div>
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
        </div>
        <div className={spendingChangeSize ? 'opacity-50 transition-opacity' : ''}>
            <SpellGrid grid={grid} spells={spells} onSelect={onSelectHandler} spellSize={spellSize}/>
        </div>
        <SpellModal spell={spellModalActive} ref={modalRef}/>
    </div>
}