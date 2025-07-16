import {ISpell, SpellCastingTime, spellCastingTimes, spellTags} from "@/data/Spell";
import {Spell, SpellLg, SpellSize, spellSizes} from "@/components/Spell";
import {memo, ReactNode, Ref, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Fuse from "fuse.js";
import {useDebouncedCallback} from "use-debounce";
import {Trans, useTranslation} from "react-i18next";
import {HiFilter, HiOutlineFilter} from "react-icons/hi";
import {BreedId, breeds} from "@/data/Breed";
import {Breed} from "@/components/Breed";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {MarkObj} from "rc-slider/es/Marks";
import {CastingTime} from "@/components/CastingTime";
import Select from 'react-select'
import Draggable from "@/components/Draggable/Draggable";

export type SpellGridSized = Record<SpellSize, string>


interface ISpellModalProps {
    spell: ISpell | null,
    ref: Ref<HTMLDialogElement | null>,
    onTagClick: (tag: string) => void,
}

export function SpellModal({spell, ref, onTagClick}: ISpellModalProps) {
    return <dialog id={`spell_modal`} className="modal" ref={ref}>
        <div className="modal-box bg-transparent shadow-none p-0 max-w-110">
            {spell && <SpellLg onTagClick={onTagClick} spell={spell}/>}
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
    onTagClick: (tag: string) => void,
    onDrop?: (spell: ISpell) => void
}

const SpellGrid = memo(function SpellGrid({grid, spells, spellSize, onSelect, onTagClick, onDrop}: ISpellListGridProps) {
    return <div className={`grid ${grid[spellSize]} gap-4`}>
        {spells.map(spell => {
            if (onDrop) {
                return <Draggable key={spell.id} onDrop={() => onDrop(spell)}><Spell spell={spell} size={spellSize} onSelect={onSelect} onTagClick={onTagClick}/></Draggable>
            }
            return <Spell key={spell.id} spell={spell} size={spellSize} onSelect={onSelect} onTagClick={onTagClick}/>
        })}
    </div>
})

interface ISpellListProps {
    grid: SpellGridSized,
    initSpells: ISpell[],
    onDrop?: (spell: ISpell) => void
}

export function SpellList({grid, initSpells, onDrop}: ISpellListProps) {
    const {t, i18n} = useTranslation();
    const [spells, setSpells] = useState<ISpell[]>(initSpells)
    const [spellSize, setSpellSize] = useState<SpellSize>("md")
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const [spendingChangeSize, setSpendingChangeSize] = useState(false)
    const [fuse, setFuse] = useState<Fuse<ISpell> | null>(null)
    const [breedFilter, setBreedFilter] = useState<BreedId[]>([])
    const [castingTimeFilter, setCastingTimeFilter] = useState<SpellCastingTime[]>([])
    const [isFiltered, setIsFiltered] = useState(false)
    const [levelFilter, setLevelFilter] = useState<number[]>([0, 9])
    const [tagFilter, setTagFilter] = useState<string[]>([])

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
        console.log("refreshing list")
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
                if (breedFilter.length === 0 || breedFilter.length === breeds.length) return spells
                return spells.filter(spell => {
                    return spell.breeds.some(breed => {
                        return breedFilter.includes(breed)
                    })
                })
            }

            const applyCastingTimeFilter = (spells: ISpell[]): ISpell[] => {
                if (castingTimeFilter.length === 0 || castingTimeFilter.length === spellCastingTimes.length) return spells
                return spells.filter(spell => {
                    return spell.castingTime.some(ct => {
                        return castingTimeFilter.includes(ct)
                    })
                })
            }

            const applyLevelFilter = (spells: ISpell[]): ISpell[] => {
                if (levelFilter.length === 1) {
                    return spells.filter(spell => spell.level === levelFilter[0])
                }
                if (levelFilter.length === 2) {
                    return spells.filter(spell => spell.level >= levelFilter[0] && spell.level <= levelFilter[1])
                }
                return spells
            }

            const applyTagFilter = (spells: ISpell[]): ISpell[] => {
                if (tagFilter.length === 0) return spells
                return spells.filter(spell => {
                    return spell.tags.some(tag => {
                        return tagFilter.includes(tag)
                    })
                })
            }

            setSpells(applyBreedFilter(applyTagFilter(applyCastingTimeFilter(applyLevelFilter(applySearch(initSpells))))))
            setSpendingChangeSize(false)
        }, 100)
    }, 500)

    useEffect(() => {
        setIsFiltered(spells.length !== initSpells.length)
        refreshList()
    }, [initSpells, breedFilter, levelFilter, castingTimeFilter, tagFilter, refreshList, spells.length])

    useEffect(() => {
        const options = {
            ignoreDiacritics: true,
            keys: [{name: `name.${i18n.language}`, weight: 10}, {name: `description.${i18n.language}`, weight: 10}]
        }
        const f = new Fuse(initSpells, options)

        setFuse(f)
        refreshList()
    }, [initSpells, i18n.language, refreshList])

    const selectSpellLevelHandler = useCallback((value: number | number[]) => {
        if (Array.isArray(value)) {
            setLevelFilter(value)
        } else {
            setLevelFilter([value])
        }
    }, []);

    const tagsOptions = useMemo(() => {
        return spellTags.map(tag => {return {value: tag, label: t(`data.spell.tag.${tag}`)}})
    }, [t]);

    return <div className={`flex flex-col gap-4 w-full`}>
        <div className={`flex gap-2 justify-end items-center`}>
            <div className={`grow text-2xl font-semibold`}>
                <Trans t={t}
                       values={{count: spells.length, max: initSpells.length}}
                       components={{ small: <span className={`text-sm`}/>}}
                >
                    layout.spell-list.title
                </Trans>
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
                <input type="search" required placeholder="Search" onChange={() => refreshList()} ref={searchRef}/>
            </label>
            <div className="drawer drawer-end w-10">
                <input id="drawer-filter" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    <label htmlFor="drawer-filter"
                           className={`btn btn-ghost hover:bg-transparent hover:border-none !shadow-none drawer-button btn-square text-primary`}>
                        <div className={`indicator`}>
                            {isFiltered && <span className="indicator-item status status-secondary"></span>}
                            {isFiltered && <HiFilter size={30}/>}
                            {!isFiltered && <HiOutlineFilter size={30}/>}
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
                                <div className={`h-12`}>
                                    <Slider range
                                            dots={true}
                                            step={1}
                                            min={0}
                                            max={9}
                                            pushable={false}
                                            allowCross={false}
                                            value={levelFilter}
                                            marks={levelFilter.reduce<Record<string | number, ReactNode | MarkObj>>((acc, value) => {
                                                acc[value] = value;
                                                return acc
                                            }, {})}
                                            onChange={selectSpellLevelHandler}/>
                                </div>
                            </fieldset>
                            <fieldset
                                className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
                                <legend className="fieldset-legend">{t("layout.filter.casting-time.title")}</legend>
                                <div className={`flex flex-col gap-2`}>
                                    <div className={`flex items-center gap-2`}>
                                        <input
                                            type="checkbox"
                                            checked={castingTimeFilter.length === spellCastingTimes.length}
                                            id={`casting-filter-all`}
                                            className="checkbox checkbox-sm checkbox-primary"
                                            onChange={() => {
                                                if (castingTimeFilter.length === spellCastingTimes.length) {
                                                    setCastingTimeFilter([])
                                                } else {
                                                    setCastingTimeFilter(spellCastingTimes)
                                                }
                                            }}
                                        />
                                        <label htmlFor={`casting-filter-all`}
                                               className={`cursor-pointer select-none`}>{t("layout.filter.casting-time.all")}</label>
                                    </div>
                                    {spellCastingTimes.map((ct, i) => {
                                        const isChecked = castingTimeFilter.includes(ct)
                                        const handlerChange = () => {
                                            if (isChecked) {
                                                setCastingTimeFilter(castingTimeFilter.filter(b => b !== ct))
                                            } else {
                                                setCastingTimeFilter([...castingTimeFilter, ct])
                                            }
                                        }

                                        return <div key={i} className={`flex items-center gap-2`}>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                id={`casting-time-filter-${ct}`}
                                                className="checkbox checkbox-sm checkbox-primary"
                                                onChange={handlerChange}
                                            />
                                            <label htmlFor={`casting-time-filter-${ct}`}
                                                   className={`cursor-pointer select-none`}><CastingTime
                                                ct={ct}/></label>
                                        </div>
                                    })}
                                </div>
                            </fieldset>
                            <fieldset
                                className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
                                <legend className="fieldset-legend">{t("layout.filter.tag.title")}</legend>
                                <div>
                                    <Select
                                        isMulti
                                        options={tagsOptions}
                                        classNamePrefix="select-react"
                                        menuPlacement={"top"}
                                        value={tagsOptions.filter(option => tagFilter.includes(option.value))}
                                        placeholder={t("layout.filter.tag.placeholder")}
                                        onChange={values => setTagFilter(values.map(v => v.value))}
                                    />
                                </div>
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
            <SpellGrid onDrop={onDrop} grid={grid} spells={spells} onSelect={onSelectHandler} spellSize={spellSize} onTagClick={(tag: string) => setTagFilter([tag])}/>
        </div>
        <SpellModal onTagClick={(tag: string) => setTagFilter([tag])} spell={spellModalActive} ref={modalRef}/>
    </div>
}