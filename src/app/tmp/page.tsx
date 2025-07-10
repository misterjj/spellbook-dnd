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

import {useRef} from "react";
import Draggable from "@/components/Draggable/Draggable";
import {DraggableTarget} from "@/components/Draggable/DraggableTarget";
import {DragAndDropArea} from "@/components/Draggable/DragAndDropArea";

export default function Tmp() {
    // const distanceRef = useRef<HTMLDivElement>(null);
    // // 1. Créer une ref pour la div cible
    const targetRef = useRef<HTMLDivElement>(null);
    //
    // useDraggable(distanceRef, [
    //     threshold({ distance: 10 }),
    //     events({
    //         onDragStart: () => {
    //             console.log('Début du drag');
    //         },
    //
    //         onDrag: (data) => {
    //             // Optionnel : on peut garder le log du déplacement
    //             // console.log({ x: data.offset.x, y: data.offset.y });
    //         },
    //
    //         onDragEnd: (data) => {
    //             // 2. Récupérer les éléments du DOM à la fin du drag
    //             console.log(data)
    //             const draggableNode = data.currentNode; // L'élément qui a été glissé
    //             const targetNode = targetRef.current; // La cible
    //
    //             // S'assurer que les deux éléments existent
    //             if (!draggableNode || !targetNode) return;
    //
    //             // 3. Obtenir les rectangles de délimitation (position et taille)
    //             const draggableRect = draggableNode.getBoundingClientRect();
    //             const targetRect = targetNode.getBoundingClientRect();
    //
    //             // 4. Vérifier la collision
    //             if (checkCollision(draggableRect, targetRect)) {
    //                 console.log('LÂCHÉ SUR LA CIBLE !');
    //                 // Ici, vous pouvez déclencher n'importe quelle logique :
    //                 // - Mettre à jour un état
    //                 // - Changer le style de la cible
    //                 // - etc.
    //                 targetNode.style.backgroundColor = 'blue'; // Exemple : changer la couleur
    //             } else {
    //                 console.log('Lâché en dehors de la cible.');
    //                 targetNode.style.backgroundColor = 'green'; // Revenir à la couleur d'origine
    //             }
    //         },
    //     }),
    // ]);

    return (
        <DragAndDropArea>
            <Draggable onDrop={(targetId) => {console.log(targetId)}}>
                <div className={`w-50 bg-red-500 p-4 text-white`}>
                    Drag after moving 10px
                </div>
            </Draggable>

            <div>
                <DraggableTarget id={"toto"}>
                    <div
                        // Attacher la ref à la cible
                        className={`w-50 h-50 bg-green-500 p-4 text-white transition-colors`}
                    >target</div>
                </DraggableTarget>
            </div>
        </DragAndDropArea>
    );
}