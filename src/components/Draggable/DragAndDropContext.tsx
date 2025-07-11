import {createContext, RefObject} from 'react';

interface Target {
    id: string | number;
    ref: RefObject<HTMLDivElement | null>;
}

interface DragAndDropContextType {
    registerTarget: (target: Target) => void
    unregisterTarget: (id: string | number) => void
    targets: Target[]
    isDragging: boolean,
    setDragging: (isDragging: boolean) => void
}

export const DragAndDropContext = createContext<DragAndDropContextType>({
    registerTarget: () => {
    },
    unregisterTarget: () => {
    },
    targets: [],
    isDragging: false,
    setDragging: () => {
    }
});