// DragAndDropArea.tsx
"use client"

import React, { useState, useCallback, ReactNode } from 'react';
import {DragAndDropContext, Target} from './DragAndDropContext';

interface DragAndDropAreaProps {
    children: ReactNode;
}

export function DragAndDropArea({ children }: DragAndDropAreaProps) {
    const [targets, setTargets] = useState<Array<Target>>([]);
    const [isDragging, setDragging] = useState<boolean>(false)

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
        isDragging,
        setDragging
    };

    return (
        <DragAndDropContext.Provider value={contextValue}>
            {children}
        </DragAndDropContext.Provider>
    );
}