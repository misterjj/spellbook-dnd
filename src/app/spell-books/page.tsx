"use client"

import React, {useCallback, useContext, useRef, useState} from "react";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import Link from "next/link";
import {ISpellBookSaved, SpellBookCover, spellBookCovers} from "@/data/SpellBook";
import {HiCheck, HiOutlineXCircle, HiPlus} from "react-icons/hi";
import Image from 'next/image';

interface SpellBookProps {
    spellBook: ISpellBookSaved;
    onEdit: () => void;
}

function SpellBook({spellBook, onEdit}: SpellBookProps) {
    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onEdit();
    };

    return <Link href={`spell-books/${spellBook.id}`}>
        <div className={`w-70 h-100 relative`}>
            <Image src={`/images/spellbooks/${spellBook.cover}.png`} width={280} height={400} alt={spellBook.name} />
            <div className="btn btn-primary" onClick={handleEditClick}>edit</div>
            <div className={
                    `grimoire-title absolute top-25 w-4/5 px-4 text-center text-4xl font-bold -translate-y-1/2 left-1/2 -translate-x-1/2`
                }
            >{spellBook.name}</div>
            <div className={
                `grimoire-title absolute bottom-25  w-full px-4 text-center text-2xl font-bold translate-y-1/2`
            }
            >{spellBook.spells.length} sorts</div>
        </div>
    </Link>
}

interface SpellBookAddProps {
    openModalHander: () => void;
}

function SpellBookAdd({openModalHander}: SpellBookAddProps) {
    return (
        <div
            className={`w-70 h-100 flex flex-col items-center justify-center border-2 border-primary border-dashed cursor-pointer`}
            onClick={openModalHander}>
            <HiPlus size={60} className={`text-primary`}/>
            <span className={`text-primary font-semibold text-lg text-center w-2/3`}>
                Ajouter un nouveau livre de sort
            </span>
        </div>
    );
}

export default function SpellBooksPage() {
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const [coverActive, setCoverActive] = useState<SpellBookCover>("black");
    const [modalType, setModalType] = useState<"add" | "edit">("add");
    const [editingBook, setEditingBook] = useState<ISpellBookSaved | null>(null);

    const {addSpellBook, updateSpellBook} = useContext(SaveManagerContext);
    const {saveData} = useContext(SaveManagerContext);

    const spellBookCoverClasses: Record<SpellBookCover, string> = {
        red: "bg-red-700",
        orange: "bg-orange-700",
        yellow: "bg-yellow-700",
        lime: "bg-lime-700",
        green: "bg-green-700",
        cyan: "bg-cyan-700",
        blue: "bg-blue-700",
        violet: "bg-violet-700",
        fuchsia: "bg-fuchsia-700",
        rose: "bg-rose-700",
        slate: "bg-slate-700",
        zinc: "bg-zinc-700",
        black: "bg-black-700",
        white: "bg-white-700"
    };

    const openModal = () => {
        (document.getElementById('spellbook_modal') as HTMLDialogElement)?.showModal();
    };

    const handleAddClick = () => {
        setModalType("add");
        setEditingBook(null);
        if (nameInputRef.current) {
            nameInputRef.current.value = "";
        }
        setCoverActive(spellBookCovers[Math.floor(Math.random() * spellBookCovers.length)]);
        openModal();
    };

    const handleEditClick = (book: ISpellBookSaved) => {
        setModalType("edit");
        setEditingBook(book);
        if (nameInputRef.current) {
            nameInputRef.current.value = book.name;
        }
        setCoverActive(book.cover);
        openModal();
    };

    const validateHandler = useCallback(() => {
        if (!nameInputRef.current) return;

        if (modalType === 'edit' && editingBook) {
            console.log("Mise à jour du livre:", editingBook.id, nameInputRef.current.value);
            updateSpellBook(editingBook.id, nameInputRef.current.value, coverActive)
        } else {
            addSpellBook(nameInputRef.current.value, coverActive);
        }

        (document.getElementById('spellbook_modal') as HTMLDialogElement)?.close();
    }, [addSpellBook, modalType, editingBook, coverActive]);

    return (
        <>
            <div>SpellBooksPage</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
                {saveData.spellsBooks.map(book => (
                    <SpellBook
                        key={book.id}
                        spellBook={book}
                        onEdit={() => handleEditClick(book)}
                    />
                ))}
                <SpellBookAdd openModalHander={handleAddClick}/>
            </div>

            <dialog id="spellbook_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">
                        {modalType === 'add' ? 'Ajouter un nouveau livre de sort' : 'Modifier le livre de sort'}
                    </h3>
                    <fieldset className="fieldset">
                        <label className="floating-label">
                            <span>Nom du livre de sort</span>
                            <input type="text" className={`input w-full !outline-none`}
                                   placeholder={"Nom du livre de sort"} ref={nameInputRef}/>
                        </label>
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <legend className="fieldset-legend">Couverture</legend>
                        <div className={`flex flex-wrap gap-4 items-center justify-center`}>
                            {spellBookCovers.map((cover, index) => (
                                <div
                                    key={index}
                                    className={`w-10 h-10 rounded-lg cursor-pointer shadow-lg
                                        ${spellBookCoverClasses[cover]} 
                                        ${coverActive === cover ? 'outline outline-4 outline-offset-2 outline-primary' : ''}`
                                    }
                                    onClick={() => setCoverActive(cover)}
                                />
                            ))}
                        </div>
                    </fieldset>
                    <div className="modal-action justify-between">
                        <form method="dialog">
                            <button className="btn">
                                <HiOutlineXCircle size={15}/>
                                Annuler
                            </button>
                        </form>
                        <button className="btn btn-success" onClick={validateHandler}>
                            <HiCheck size={20}/>
                            <span>Valider</span>
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}