"use client"

import {useParams} from 'next/navigation'
import {SpellGridSized, SpellList} from "@/components/SpellList";
import {spellList} from "@/data/Spell";

export default function SpellBookPage() {
    const params = useParams()

    const id = params.slug


    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    }

    return (<>
            <div>Edit SpellBook Page : {id}</div>
            <SpellList grid={grid} initSpells={spellList} />
        </>
    )
}