// DraggableTarget.tsx
"use client"

import {
    isValidElement,
    useRef,
    useContext,
    useEffect,
    ReactNode,
    cloneElement,
    ReactElement,
    Children,
    RefObject
} from "react";
import {DragAndDropContext} from "@/contexts/draggable/DragAndDropContext";

interface DraggableTargetProps {
    id: string | number;
    children: ReactNode;
}

export function DraggableTarget({ id, children }: DraggableTargetProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { registerTarget, unregisterTarget} = useContext(DragAndDropContext);

    useEffect(() => {
        if (targetRef.current) {
            registerTarget({ id, ref: targetRef });
        }

        return () => {
            unregisterTarget(id);
        };
    }, [id, targetRef, registerTarget, unregisterTarget]);

    const child = Children.only(children);

    if (!isValidElement(child)) {
        return <>{child}</>;
    }

    return cloneElement(child as ReactElement<{ ref?: RefObject<HTMLDivElement | null> }>, {
        ref: targetRef
    });
}