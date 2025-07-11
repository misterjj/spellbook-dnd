"use client"

import { useParams } from 'next/navigation'

export default function SpellBookPage() {
    const params = useParams()

    const id = params.slug

    return (
        <div>SpellBook Page : {id}</div>
    )
}