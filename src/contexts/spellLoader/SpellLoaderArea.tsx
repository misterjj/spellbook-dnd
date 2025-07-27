import React, {ReactNode, useCallback, useMemo, useState} from "react";
import {SpellLoaderContext} from "@/contexts/spellLoader/SpellLoaderContext";
import {ISpell} from "@/data/Spell";

interface SpellLoaderAreaProps {
    children: ReactNode
}

export default function SpellLoaderArea({children} : SpellLoaderAreaProps) {
    const [loading, setLoading] = useState(false)
    const [spells, setSpells] = useState<ISpell[]>([])

    const loadSpells = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetch("/data/spells.json");

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }

            const spellData = await response.json() as ISpell[];
            setSpells(spellData);

        } catch (error) {
            console.error("Échec du chargement des sorts :", error);
            setSpells([]);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const contextValue = useMemo(() => ({
        loading,
        spells,
        loadSpells,
    }), [loading, spells, loadSpells]);

    return (
        <SpellLoaderContext.Provider value={contextValue}>
            {children}
        </SpellLoaderContext.Provider>
    );
}