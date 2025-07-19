"use client"

import {
    Children,
    cloneElement,
    isValidElement,
    JSX,
    ReactElement,
    RefObject,
    useContext,
    useRef,
    useState
} from "react";
import {bounds, BoundsFrom, events, position, threshold, useCompartment, useDraggable} from '@neodrag/react';
import {DragAndDropContext} from "@/contexts/draggable/DragAndDropContext";

interface DraggableProps {
    children: JSX.Element;
    onDrop: (ref: RefObject<HTMLDivElement | null>) => void;
    onDrag: () => void;
}

const checkCollision = (rect1: DOMRect, rect2: DOMRect) => {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
};

export default function Draggable({children, onDrop, onDrag}: DraggableProps) {
    const [currentPos, setCurrentPos] = useState<{ x: number, y: number } | null>(null)
    const [currentIsDragging, setCurrentIsDragging] = useState<boolean>(false)
    const draggableRef = useRef<HTMLDivElement>(null);
    const {targets, setDragging} = useContext(DragAndDropContext);

    const targetsRef = useRef(targets);

    targetsRef.current = targets;

    const currentPosComp = useCompartment(
        () => position({current: currentPos}),
        [currentPos],
    );

    const staticPlugins = [
        threshold({distance: 10}),
        bounds(BoundsFrom.viewport()),
        events({
            onDragStart: (data) => {
                setCurrentPos(data.offset)
                setDragging(true)
                setCurrentIsDragging(true)
                onDrag()
            },
            onDragEnd: (data) => {
                const domRect = data.currentNode.getBoundingClientRect();
                let droppedOnTarget = false;
                setDragging(false)
                setCurrentIsDragging(false)

                for (const target of targetsRef.current) {
                    if (target.ref.current) {
                        const targetRect = target.ref.current.getBoundingClientRect();
                        if (checkCollision(domRect, targetRect)) {
                            onDrop(draggableRef);
                            droppedOnTarget = true;
                            break;
                        }
                    }
                }

                if (!droppedOnTarget) {
                    setCurrentPos({x: 0, y: 0})
                }
            }
        })
    ]

    useDraggable(draggableRef, () => [
        currentPosComp,
        ...staticPlugins,
    ]);

    const child = Children.only(children);

    if (!isValidElement(child)) {
        return child;
    }

    const childClassName = isValidElement(child) ? (child.props as { className?: string }).className || '' : '';

    return cloneElement(child as ReactElement<{ className?: string, ref?: RefObject<HTMLDivElement | null> }>, {
        ref: draggableRef,
        className: `${childClassName} cursor-grab selection-none ${currentIsDragging ? 'z-50' : 'z-0'}`
    });
}