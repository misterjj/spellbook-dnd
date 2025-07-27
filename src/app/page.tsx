"use client"

import ImageWithFallback from "@/components/ImageWithFallBack";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <ImageWithFallback src={`/images/spells/acid-splash.webp`} fallbackSrc={`/images/spells/unknown.jpg`} alt={""} width="200" height="200" />
        </>
    );
}
