"use client"

import { useParams } from 'next/navigation'
import {useContext, useEffect, useMemo, useState} from "react";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import {SpellGridSized, SpellList} from "@/components/SpellList";
import {SpellLoaderContext} from "@/contexts/spellLoader/SpellLoaderContext";
import {ISpell} from "@/data/Spell";
import Link from "next/link";
import {HiPencilAlt} from "react-icons/hi";


export default function SpellBookPage() {
    const {getSpellBook} = useContext(SaveManagerContext)
    const {spells, loadSpells} = useContext(SpellLoaderContext);
    const [initSpells, setInitSpells] = useState<ISpell[]>([])

    const params = useParams()
    const id = params.slug?.toString() || "unknown"

    const spellBook = getSpellBook(id)

    useEffect(() => {
        if (spells.length === 0) {
            loadSpells();
        }
    }, [loadSpells, spells.length]);

    useEffect(() => {
        if (spellBook) {
            setInitSpells(spells.filter(s => spellBook.spells.includes(s.id)));
        }
    }, [spells.length]);

    const editButton = useMemo(() => {
        return <Link href={`/spell-books/${id}/edit`} className={`btn btn-primary flex items-center`}>
            <span>Modifier</span>
            <HiPencilAlt size={20}/>
        </Link>
    }, [])

    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    }

    return (
        <>
            <div className={`flex gap-4 flex-col`}>
                <div className={`flex items-center justify-end`}>
                    {editButton}
                </div>
                {spellBook && <div>
                    <SpellList grid={grid} initSpells={initSpells} />
                </div>}
            </div>
        </>
    )
}