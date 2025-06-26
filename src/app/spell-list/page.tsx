"use client"

import Image from 'next/image'
import {spellList} from "@/data/Spell";


export default function SpellList() {
    function camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    return (
        <div className="bg-slate-800">
            <div className="fixed right-0 top-0">
                {spellList.filter(item => item.icon !== undefined).length} / {spellList.length} ({Math.round((spellList.filter(item => item.icon !== undefined).length / spellList.length) * 10000) / 100} %)
            </div>
            {
                spellList.map((spell, i) => (
                    <div key={i}>
                        <strong>{spell.id} {spell.name.fr}</strong>

                        {spell.icon && <Image className={`rounded-lg border border-slate-500`} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                        {!spell.icon && <div>illustration rpg spell called {spell.name.en}. white light, symbolism, cloudcore, endercore, black background, wavy lines organic shapes, logo, no text</div>}
                        {/*{!spell.icon && <div>import {camelize(spell.id).replaceAll("-","")} from &quot;@/data/images/spells/{spell.id}.jpg&quot;;</div>}*/}
                    </div>
                ))
            }
        </div>
    )
}