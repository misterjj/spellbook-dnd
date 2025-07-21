"use client"

import {useParams} from 'next/navigation'
import {SpellGridSized, SpellList, SpellModal} from "@/components/SpellList";
import {ISpell, SpellId, spellList} from "@/data/Spell";
import {DraggableTarget} from "@/components/draggable/DraggableTarget";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {SpellSm} from "@/components/Spell";
import {SaveManagerContext} from "@/contexts/spellBookSaver/SaveManagerContext";
import {DivFixer} from "@/components/DivFixer";
import {HiTrash} from "react-icons/hi";

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
        return ""
    }

    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend className="fieldset-legend">Sort de niveau {level}</legend>
                <div className={`flex flex-wrap justify-center gap-4`}>
                    {spells.map(spell => <div key={spell.id}>
                        <SpellSm spell={spell} onSelect={onSelect} onDelete={onDelete}/>
                    </div>)}
                </div>
            </fieldset>
        </div>
    )
}

export default function SpellBookEditPage() {
    const [selectedSpells, setSelectedSpells] = useState<SpellId[]>([])
    const params = useParams()
    const id = params.slug?.toString() || "unknown"
    const [spellModalActive, setSpellModalActive] = useState<ISpell | null>(null)
    const {saveData, addSpell, removeSpell, cleanSpells} = useContext(SaveManagerContext)

    const modalRef = useRef<HTMLDialogElement | null>(null);


    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
    }

    const spells: ISpellMap = useMemo(() => {
        const t = Object.groupBy(spellList.filter(spell => selectedSpells.includes(spell.id)), (spell) => spell.level.toString())

        return {
            level0: t['0'] || [],
            level1: t['1'] || [],
            level2: t['2'] || [],
            level3: t['3'] || [],
            level4: t['4'] || [],
            level5: t['5'] || [],
            level6: t['6'] || [],
            level7: t['7'] || [],
            level8: t['8'] || [],
            level9: t['9'] || [],
        }
    }, [selectedSpells]);

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
        const spellBook = saveData.spellsBooks.filter(sb => sb.id == id).pop()

        setSelectedSpells(spellBook?.spells || [])
    }, [setSelectedSpells, id, saveData.spellsBooks])

    return (<>
            <div>Edit SpellBook Page : {id}</div>
            <div className={`flex gap-4`}>
                <div className={`w-full lg:w-3/5`}>
                    <SpellList grid={grid}
                               initSpells={spellList.filter(spell => !selectedSpells.includes(spell.id))}
                               onDrop={onDropHandler}
                    />
                </div>
                <DraggableTarget id={"sidebar"}>
                    <div className={`w-2/5 hidden lg:block grow`}>
                        <div className={`p-2`}>
                            <div className={`flex justify-between items-center`}>
                                <div className={`text-2xl font-semibold`}>Liste des sorts préparés pour {id}</div>
                                <div className={`btn btn-ghost hover:btn-error btn-sm flex items-center gap-1`}
                                    onClick={deleteAllHandler}>
                                    <HiTrash/>
                                    <span>Tout effacer</span>
                                </div>
                            </div>
                            <DivFixer>
                                <div className={`border border-dashed rounded-lg mt-4 px-4 pb-4 min-h-102`}>
                                    {selectedSpells.length == 0 &&
                                        <div className={`h-98 flex items-center justify-center`}>
                                            <div>
                                                <div className={`text-xl`}>Vous n'avez pas encore de sort préparés</div>
                                                <div
                                                    className={`text-xl text-center text-primary font-semibold`}>Glissez
                                                    des sorts ici
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