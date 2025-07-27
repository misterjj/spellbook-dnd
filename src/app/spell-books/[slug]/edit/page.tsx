"use client"

import {useParams} from 'next/navigation'
import {SpellGridSized, SpellList, SpellModal} from "@/components/SpellList";
import {ISpell, SpellId} from "@/data/Spell";
import {DraggableTarget} from "@/components/draggable/DraggableTarget";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {SpellSm} from "@/components/Spell";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import {DivFixer} from "@/components/DivFixer";
import {HiTrash} from "react-icons/hi";
import {Trans, useTranslation} from "react-i18next";
import {DragAndDropContext} from "@/contexts/draggable/DragAndDropContext";
import {SpellLoaderContext} from "@/contexts/spellLoader/SpellLoaderContext";

interface ISpellMap {
    [key: `level${number}`]: ISpell[];
}

interface ISpellByLevel {
    level: number
    spells: ISpell[]
    onSelect: (spell: ISpell) => void
    onDelete: (spell: ISpell) => void
}

function SavedSpellLevel({level, spells, onSelect, onDelete}: ISpellByLevel) {
    if (spells.length === 0) {
        return null // Retourner null est plus idiomatique en React pour ne rien rendre
    }

    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend className="fieldset-legend">Sort de niveau {level}</legend>
                <div className={`flex flex-wrap justify-center gap-4`}>
                    {spells.map(spell => <div key={spell.id} className={"shrink-0"}>
                        <SpellSm spell={spell} onSelect={onSelect} onDelete={onDelete}/>
                    </div>)}
                </div>
            </fieldset>
        </div>
    )
}

interface SpellListTargetProps {
    selectedSpells: SpellId[],
    spells: ISpellMap,
    onSelectHandler: (spell: ISpell) => void,
    onDeleteHandler: (spell: ISpell) => void,
}

function SpellListTarget({selectedSpells, spells, onSelectHandler, onDeleteHandler}: SpellListTargetProps) {
    const {t} = useTranslation()

    return (
        <div className={`border border-dashed rounded-lg mt-4 px-4 pb-4 min-h-102`}>
            {selectedSpells.length === 0 &&
                <div className={`h-98 flex items-center justify-center`}>
                    <div>
                        <div className={`text-xl text-center`}>
                            <Trans t={t}>layout.spell-book.edit.empty</Trans>
                        </div>
                        <div className={`text-xl text-center text-primary font-semibold`}>
                            <Trans t={t}>layout.spell-book.edit.drag-spell</Trans>
                        </div>
                    </div>
                </div>}
            {
                Array.from({length: 10}, (_, i) => i).map(level => {
                    return <SavedSpellLevel key={level} level={level}
                                            spells={spells[`level${level}`] || []}
                                            onSelect={onSelectHandler}
                                            onDelete={onDeleteHandler}/>
                })
            }
        </div>
    )
}

export default function SpellBookEditPage() {
    const [selectedSpellIds, setSelectedSpellIds] = useState<SpellId[]>([])
    const params = useParams()
    const id = params.slug?.toString() || "unknown"
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const {saveData, addSpell, removeSpell, cleanSpells} = useContext(SaveManagerContext)
    const seeSpellsBtnRef = useRef<HTMLLabelElement | null>(null);
    const {t} = useTranslation()
    const {isDragging} = useContext(DragAndDropContext);
    const {spells, loadSpells} = useContext(SpellLoaderContext);
    const [isButtonVisible, setIsButtonVisible] = useState(false)

    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (spells.length === 0) {
            loadSpells();
        }
    }, [loadSpells, spells.length]);

    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
    }

    const selectedSpells: ISpellMap = useMemo(() => {
        const t = Object.groupBy(spells.filter(spell => selectedSpellIds.includes(spell.id)), (spell) => `level${spell.level.toString()}`)
        return t as ISpellMap;
    }, [selectedSpellIds, spells]);

    const onDeleteHandler = (spell: ISpell) => {
        removeSpell(id, spell.id);
    }

    const onSelectHandler = useCallback((spell: ISpell) => {
        setSpellModalActive(spell)
        modalRef.current?.showModal()
    }, []);

    const onDropHandler = (spell: ISpell) => {
        addSpell(id, spell.id);
    }

    const deleteAllHandler = () => {
        cleanSpells(id)
    }

    useEffect(() => {
        const spellBook = saveData.spellsBooks.find(sb => sb.id == id)

        setSelectedSpellIds(spellBook?.spells || [])
    }, [setSelectedSpellIds, id, saveData.spellsBooks])

    // Hook pour observer la visibilité du bouton
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsButtonVisible(entry.isIntersecting);
            },
            {
                root: null, // par rapport au viewport
                threshold: 0.1 // visible à 10%
            }
        );

        const currentButton = seeSpellsBtnRef.current;
        if (currentButton) {
            observer.observe(currentButton);
        }

        return () => {
            if (currentButton) {
                observer.unobserve(currentButton);
            }
        };
    }, []);


    useEffect(() => {
        if (isDragging && isButtonVisible) {
            seeSpellsBtnRef.current?.click()
        }
    }, [isDragging, isButtonVisible]);

    const saveSpellDrawer = useMemo(() => {
        return <div className={`drawer lg:hidden w-full h-10 z-11`}>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <DivFixer>
                    <label htmlFor="my-drawer-4"
                           className="drawer-button btn btn-primary z-1 left-8 top-8 btn-outline bg-base-100 origin-bottom-right h-8
                           group-[.is-fixed]/div-fixer:-rotate-90 group-[.is-fixed]/div-fixer:-translate-x-full active:group-[.is-fixed]/div-fixer:-translate-x-full"
                           ref={seeSpellsBtnRef}>
                        Voir les sorts préparées
                    </label>
                </DivFixer>
            </div>
            <div className="drawer-side lg:hidden">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <DraggableTarget id={"titi"}>
                    <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <div className={`flex justify-between items-center`}>
                            <div className={`text-sm font-semibold`}>
                                <Trans t={t} values={{id}}>layout.spell-book.edit.title</Trans>
                            </div>
                            <div className={`btn btn-ghost hover:btn-error btn-sm flex items-center gap-1`}
                                 onClick={deleteAllHandler}>
                                <HiTrash/>
                                <span>Tout effacer</span>
                            </div>
                        </div>
                        <SpellListTarget
                            selectedSpells={selectedSpellIds}
                            spells={selectedSpells}
                            onDeleteHandler={onDeleteHandler}
                            onSelectHandler={onSelectHandler}/>
                    </div>
                </DraggableTarget>
            </div>
        </div>
    }, [deleteAllHandler, id, onDeleteHandler, onSelectHandler, selectedSpellIds, t, selectedSpells])

    return (<>
            <div className={`flex gap-4`}>
                <div className={`w-full lg:w-3/5`}>
                    <SpellList grid={grid}
                               initSpells={spells.filter(spell => !selectedSpellIds.includes(spell.id))}
                               onDrop={onDropHandler}
                               customHeaderElement={saveSpellDrawer}
                    />
                </div>
                <DraggableTarget id={"sidebar"}>
                    <div className={`w-2/5 hidden lg:block grow`}>
                        <div className={`p-2`}>
                            <div className={`flex justify-between items-center`}>
                                <div className={`text-2xl font-semibold`}>
                                    <Trans t={t} values={{id}}>layout.spell-book.edit.title</Trans>
                                </div>
                                <div className={`btn btn-ghost hover:btn-error btn-sm flex items-center gap-1`}
                                     onClick={deleteAllHandler}>
                                    <HiTrash/>
                                    <span>Tout effacer</span>
                                </div>
                            </div>
                            <DivFixer>
                                <div
                                    className={`right-0 w-full pb-4 group-[.is-fixed]/div-fixer:w-2/5 group-[.is-fixed]/div-fixer:pr-12`}>
                                    <SpellListTarget
                                        selectedSpells={selectedSpellIds}
                                        spells={selectedSpells}
                                        onDeleteHandler={onDeleteHandler}
                                        onSelectHandler={onSelectHandler}/>
                                </div>
                            </DivFixer>
                        </div>
                    </div>
                </DraggableTarget>
            </div>
            <SpellModal onTagClick={() => {
            }} spell={spellModalActive} ref={modalRef}/>
        </>
    )
}