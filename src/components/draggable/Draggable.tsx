"use client"

import {
    Children,
    cloneElement,
    isValidElement,
    JSX,
    ReactElement,
    RefObject,
    useContext, useEffect,
    useRef,
    useState
} from "react";
import {bounds, BoundsFrom, events, position, threshold, useCompartment, useDraggable} from '@neodrag/react';
import {DragAndDropContext} from "@/contexts/draggable/DragAndDropContext";

interface DraggableProps {
    children: JSX.Element;
    onDrop: (ref: RefObject<HTMLDivElement | null>) => void;
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
    const [currentPos, setCurrentPos] = useState<{ x: number, y: number } | null>(null)
    const [currentIsDragging, setCurrentIsDragging] = useState<boolean>(false)
    const draggableRef = useRef<HTMLDivElement>(null);
    const {targets, setDragging} = useContext(DragAndDropContext);
    const [clone, setClone] = useState<HTMLDivElement|null>(null)
    const [clonePosition, setClonePosition] = useState({x: 0, y: 0})
    const [cloneOffsetPosition, setCloneOffsetPosition] = useState({x: 0, y: 0})

    const targetsRef = useRef(targets);

    targetsRef.current = targets;

    const currentPosComp = useCompartment(
        () => position({current: currentPos}),
        [currentPos],
    );

    useEffect(() => {
        if (clone) {
            clone.style.left = (clonePosition.x - cloneOffsetPosition.x) + 'px'
            clone.style.top = (clonePosition.y - cloneOffsetPosition.y) + 'px'
        }
    }, [clonePosition, cloneOffsetPosition, clone])

    const staticPlugins = [
        threshold({distance: 10}),
        bounds(BoundsFrom.viewport()),
        events({
            onDragStart: (data) => {
                setCurrentPos(data.offset)
                setDragging(true)
                setCurrentIsDragging(true)

                if (draggableRef.current) {
                    const elem = draggableRef.current
                    const cloneElem = elem.cloneNode(true) as HTMLDivElement;
                    cloneElem.style.position = 'absolute'
                    cloneElem.style.top = (data.event.pageY - data.event.offsetY) + 'px'
                    cloneElem.style.left = (data.event.pageX - data.event.offsetX) + 'px'
                    cloneElem.style.zIndex = '50'
                    cloneElem.style.width = elem.offsetWidth + 'px'
                    cloneElem.style.height = elem.offsetHeight + 'px'
                    document.body.appendChild(cloneElem)
                    setClone(cloneElem)
                    elem.style.visibility = 'hidden'
                    setClonePosition({x: data.event.pageX, y: data.event.pageY})
                    setCloneOffsetPosition({x: data.event.offsetX, y: data.event.offsetY})
                }
            },
            onDrag: (data) => {
                setClonePosition({x: data.event.pageX, y: data.event.pageY})
                setCloneOffsetPosition({x: data.event.offsetX, y: data.event.offsetY})
            },
            onDragEnd: (data) => {
                const domRect = data.currentNode.getBoundingClientRect();
                let droppedOnTarget = false;
                setDragging(false)
                setCurrentIsDragging(false)
                setClone(clone => {
                        if (clone) {
                            clone.remove()
                        }

                        return null;
                    }
                )
                if (draggableRef.current) {
                    draggableRef.current.style.visibility = 'visible'
                }

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