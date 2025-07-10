// DragAndDropArea.tsx
"use client"

import React, { useState, useCallback, ReactNode } from 'react';
import { DragAndDropContext } from './DragAndDropContext';

interface Target {
    id: string | number;
    ref: React.RefObject<HTMLDivElement>;
}

interface DragAndDropAreaProps {
    children: ReactNode;
}

export function DragAndDropArea({ children }: DragAndDropAreaProps) {
    const [targets, setTargets] = useState<Target[]>([]);
    const [hoveredTargetId, setHoveredTargetId] = useState<string | number | null>(null);

    // Fonction pour qu'une cible s'enregistre
    const registerTarget = useCallback((target: Target) => {
        setTargets(prevTargets => [...prevTargets, target]);
    }, []);

    // Fonction pour qu'une cible se désenregistre (quand elle est démontée)
    const unregisterTarget = useCallback((id: string | number) => {
        setTargets(prevTargets => prevTargets.filter(t => t.id !== id));
    }, []);

    const contextValue = {
        registerTarget,
        unregisterTarget,
        targets,
        hoveredTargetId,
        setHoveredTargetId,
    };

    return (
        <DragAndDropContext.Provider value={contextValue}>
            {children}
        </DragAndDropContext.Provider>
    );
}