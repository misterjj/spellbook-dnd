"use client"

import Image from 'next/image'
import {spellList} from "@/data/Spell";


export default function SpellList() {
    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    return (
        <div>
            {
                spellList.map((spell, i) => (
                    <div key={i}>
                        {/*<strong>{spell.id} {spell.name.fr}</strong>*/}
                        <div>import {camelize(spell.id).replaceAll("-","")} from &quot;@/data/images/spells/{spell.id}.jpg&quot;;</div>
                        {spell.icon && <Image src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                        {/*{!spell.icon && <div>illustration rpg spell called {spell.name.en}. white light, symbolism, cloudcore, endercore, black background, wavy lines organic shapes, logo, no text</div>}*/}
                    </div>
                ))
            }
        </div>
    )
}