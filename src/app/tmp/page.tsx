'use client';

// import { useRef } from 'react';
// import { events, threshold, useDraggable } from '@neodrag/react';

// Une fonction simple pour vérifier si deux rectangles se chevauchent
// const checkCollision = (rect1: DOMRect, rect2: DOMRect) => {
//     return !(
//         rect1.right < rect2.left ||
//         rect1.left > rect2.right ||
//         rect1.bottom < rect2.top ||
//         rect1.top > rect2.bottom
//     );
// };

import {useContext, useState} from "react";
import {DragAndDropContext} from "@/contexts/draggable/DragAndDropContext";
import {DraggableTarget} from "@/components/draggable/DraggableTarget";
import Draggable from "@/components/draggable/Draggable";

interface Item {
    id: string
}

export default function Tmp() {
    const [itemsSaved, setItemsSaved] = useState<Item[]>([])
    const items: Item[] = [{id: "item 1"},{id: "item 2"},{id: "item 3"},{id: "item 4"},{id: "item 5"}]
    const {isDragging} = useContext(DragAndDropContext);

    return (
        <>
            <div className={`drawer ${isDragging ? 'drawer-open' : ''} md:hidden fixed right-0 top-0 w-full h-10 z-40`}>
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                {!isDragging && <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
                </div>}
                <DraggableTarget id={"titi"}>
                    <div className="drawer-side lg:hidden">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {itemsSaved.map((item, i) => { return <div key={i}>{item.id}</div>})}
                        </ul>
                    </div>
                </DraggableTarget>
            </div>
            <div className={`flex  gap-4`}>
                {items.filter(item => !itemsSaved.map(t => t.id).includes(item.id)).map(item => {
                    return <Draggable key={item.id} onDrop={(targetId) => {
                        if (targetId !== null) {
                            setItemsSaved(prev => [...prev, item])
                        }
                    }}>
                        <div className={`w-50 bg-red-500 p-4 text-white`}>
                            {item.id}
                        </div>
                    </Draggable>
                })}
            </div>
            {isDragging ? "dragging" : "not dragging"}
            <div>
                <DraggableTarget id={"toto"}>
                    <div
                        className={`w-50 h-50 bg-green-500 p-4 text-white transition-colors mt-10`}
                    >
                        {itemsSaved.map((item, i) => { return <div key={i}>{item.id}</div>})}
                    </div>
                </DraggableTarget>
                <DraggableTarget id={"tata"}>
                    <div
                        className={`w-50 h-50 bg-blue-500 p-4 text-white transition-colors mt-10`}
                    >
                        {itemsSaved.map((item, i) => { return <div key={i}>{item.id}</div>})}
                    </div>
                </DraggableTarget>
            </div>
        </>
    );
}