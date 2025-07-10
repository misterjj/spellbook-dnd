// Draggable.tsx
"use client"

import {Children, cloneElement, isValidElement, JSX, ReactElement, useContext, useRef, RefObject} from "react";
import {bounds, BoundsFrom, events, threshold, useDraggable} from '@neodrag/react';
import {DragAndDropContext} from "./DragAndDropContext";

interface DraggableProps {
    children: JSX.Element;
    onDrop: (targetId: string | number | null) => void;
}

const checkCollision = (rect1: DOMRect, rect2: DOMRect) => {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
};

export default function Draggable({children, onDrop}: DraggableProps) {
    const draggableRef = useRef<HTMLDivElement>(null);
    const {targets} = useContext(DragAndDropContext);

    // 1. Créer une ref pour stocker la version la plus récente des targets
    const targetsRef = useRef(targets);

    // 2. Mettre à jour la ref à chaque fois que les targets changent.
    // Cette affectation se fait à chaque rendu, garantissant que targetsRef.current est toujours à jour.
    targetsRef.current = targets;

    useDraggable(draggableRef, [
        threshold({distance: 10}),
        bounds(BoundsFrom.viewport()),
        events({
            onDragEnd: (data) => {
                const domRect = data.currentNode.getBoundingClientRect();
                let droppedOnTarget = false;

                // 3. Utiliser la ref ici pour obtenir la liste la plus récente des cibles
                // au moment où le drag se termine.
                console.log('Targets from ref on drop:', targetsRef.current);

                for (const target of targetsRef.current) {
                    if (target.ref.current) {
                        const targetRect = target.ref.current.getBoundingClientRect();
                        if (checkCollision(domRect, targetRect)) {
                            onDrop(target.id);
                            droppedOnTarget = true;
                            break;
                        }
                    }
                }

                if (!droppedOnTarget) {
                    onDrop(null);
                }
            }
        })
    ]);


    const child = Children.only(children);

    if (!isValidElement(child)) {
        return child;
    }

    const childClassName = isValidElement(child) ? (child.props as { className?: string }).className || '' : '';

    return cloneElement(child as ReactElement<{ className?: string, ref?: RefObject<HTMLDivElement | null> }>, {
        ref: draggableRef,
        className: `${childClassName} cursor-grab`
    });
}