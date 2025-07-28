"use client"

import ImageWithFallback from "@/components/ImageWithFallBack";
import {spellBookCovers} from "@/data/SpellBook";
import Image from 'next/image';

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <ImageWithFallback src={`/images/spells/acid-splash.webp`} fallbackSrc={`/images/spells/unknown.jpg`} alt={""} width="200" height="200" />

            <div className={`flex flex-wrap gap-4 items-center justify-center`}>
                {spellBookCovers.map(cover => {
                    return <div key={cover} className={`w-70 h-100`} >
                        <Image src={`/images/spellbooks/${cover}.png`} height={400} width={280} alt={""}/>
                    </div>
                })}
            </div>
        </>
    );
}
