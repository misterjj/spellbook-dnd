"use client"

import Image from 'next/image'
import {spellList} from "@/data/Spell";
import {SpellGridSized, SpellList} from "@/components/SpellList";
import unknownIcon from "@/data/images/spells/unknown.jpg";


export default function SpellListPage() {
    function camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    }

    return (
        <SpellList grid={grid} initSpells={spellList}/>
        // <div className="relative bg-white">
        //     <div className="fixed right-0 top-0">
        //         {spellList.filter(item => item.icon !== undefined).length} / {spellList.length} ({Math.round((spellList.filter(item => item.icon !== undefined).length / spellList.length) * 10000) / 100} %)
        //     </div>
        //     {
        //         spellList.map((spell, i) => (
        //             <div key={i}>
        //                 <strong>{spell.id} {spell.name.fr}</strong>
        //                 {spell.icon && <Image className={`rounded-lg border border-slate-500`} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
        //                 {spell.icon == unknownIcon && <div>illustration rpg spell called {spell.name.en}. COLORS, symbolism, cloudcore, endercore, black background, wavy lines organic shapes, logo, no text</div>}
        //                 {/*{!spell.icon && <div>import {camelize(spell.id).replaceAll("-","")} from &quot;@/data/images/spells/{spell.id}.jpg&quot;;</div>}*/}
        //             </div>
        //         ))
        //     }
        // </div>
    )
}