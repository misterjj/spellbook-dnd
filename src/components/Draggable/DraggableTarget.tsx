// DraggableTarget.tsx
"use client"

import {isValidElement, useRef, useContext, useEffect, ReactNode, cloneElement, ReactElement, Children} from "react";
import { DragAndDropContext } from "./DragAndDropContext";

interface DraggableTargetProps {
    id: string | number; // Un ID unique pour cette cible
    children: ReactNode;
}

export function DraggableTarget({ id, children }: DraggableTargetProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { registerTarget, unregisterTarget} = useContext(DragAndDropContext);

    // Enregistrer la cible quand le composant est monté
    useEffect(() => {
        if (targetRef.current) {
            registerTarget({ id, ref: targetRef });
        }
        // Nettoyer en désenregistrant quand le composant est démonté
        return () => {
            unregisterTarget(id);
        };
    }, [id, targetRef, registerTarget, unregisterTarget]);

    const child = Children.only(children);

    if (!isValidElement(child)) {
        return <>{child}</>;
    }

    return cloneElement(child as ReactElement<any>, {
        ref: targetRef
    });
}