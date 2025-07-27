"use client"

import {SpellGridSized, SpellList} from "@/components/SpellList";
import {useContext, useEffect} from "react";
import {SpellLoaderContext} from "@/contexts/spellLoader/SpellLoaderContext";
// import ImageWithFallback from "@/components/ImageWithFallBack";
// import Image from "next/image";


export default function SpellListPage() {
    const {spells, loadSpells} = useContext(SpellLoaderContext);
    // function camelize(str: string) {
    //     return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    //         return index === 0 ? word.toLowerCase() : word.toUpperCase();
    //     }).replace(/\s+/g, '');
    // }

    const grid: SpellGridSized = {
        "sm": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10",
        "md": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        "lg": "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    }
    useEffect(() => {
        if (spells.length === 0) {
            loadSpells();
        }
    }, [loadSpells, spells.length]);

    return (
        <SpellList grid={grid} initSpells={spells}/>
        // <div className="relative">
        //     <div className="fixed right-0 top-0">
        //     </div>
        //     {
        //         spells.map((spell, i) => (
        //             <div key={i}>
        //                 <strong>{spell.id} {spell.name.fr}</strong>
        //                 <Image
        //                     src={`/images/spells-original/${spell.id}.jpg`}
        //                     placeholder={spell.blurDataURL ? 'blur' : 'empty'}
        //                     blurDataURL={spell.blurDataURL}
        //                     alt={spell.name.en}
        //                     width="128"
        //                     height="128"
        //                     sizes={"128px"}
        //                 />
        //                 <div>illustration rpg spell called {spell.name.en}. COLORS, symbolism, cloudcore, endercore, black background, wavy lines organic shapes, logo, no text</div>
        //                 {/*{!spell.icon && <div>import {camelize(spell.id).replaceAll("-","")} from &quot;@/data/images/spells/{spell.id}.jpg&quot;;</div>}*/}
        //             </div>
        //         ))
        //     }
        // </div>
    )
}