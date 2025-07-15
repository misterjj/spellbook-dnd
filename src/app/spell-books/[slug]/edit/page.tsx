"use client"

import {useParams} from 'next/navigation'
import {SpellGridSized, SpellList} from "@/components/SpellList";
import {ISpell, SpellId, spellList} from "@/data/Spell";
import {DraggableTarget} from "@/components/Draggable/DraggableTarget";
import {useMemo, useState} from "react";

interface ISpellByLevel {
    level0 : ISpell[],
    level1 : ISpell[],
    level2 : ISpell[],
    level3 : ISpell[],
    level4 : ISpell[],
    level5 : ISpell[],
    level6 : ISpell[],
    level7 : ISpell[],
    level8 : ISpell[],
    level9 : ISpell[],
}

export default function SpellBookEditPage() {
    const [selectedSpells, setSelectedSpells] = useState<SpellId[]>([])
    const params = useParams()
    const id = params.slug


    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
    }

    const spells: ISpellByLevel = useMemo(() => {
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
    }, [selectedSpells, spellList]);



    return (<>
            <div>Edit SpellBook Page : {id}</div>
            <div className={`flex gap-4`}>
                <div className={`w-full lg:w-3/5`}>
                    <SpellList grid={grid}
                               initSpells={spellList.filter(spell => !selectedSpells.includes(spell.id))}
                               onDrop={(spell) => setSelectedSpells(prev => [...prev, spell.id])}
                    />
                </div>
                <DraggableTarget id={"sidebar"}>
                    <div className={`w-2/5 bg-red-500 hidden lg:block grow`}>
                        {
                            Array.from({length: 10}, (_, i) => i).map(level => {
                                return <div>
                                    <div>{level}</div>
                                    <div>{(spells["level" + level] || []).map(spell => <div>{spell.id}</div>)}</div>
                                </div>
                            })
                        }
                    </div>
                </DraggableTarget>
            </div>
        </>
    )
}