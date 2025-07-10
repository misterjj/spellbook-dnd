import { createContext, RefObject } from 'react';

interface Target {
    id: string | number;
    ref: RefObject<HTMLDivElement>;
}

interface DragAndDropContextType {
    registerTarget: (target: Target) => void;
    unregisterTarget: (id: string | number) => void;
    targets: Target[];
}

export const DragAndDropContext = createContext<DragAndDropContextType>({
    registerTarget: () => {},
    unregisterTarget: () => {},
    targets: [],
});