"use client"

import React, {useCallback, useContext, useRef, useState} from "react";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import Link from "next/link";
import {ISpellBookSaved, SpellBookCover, spellBookCovers} from "@/data/SpellBook";
import {HiCheck, HiOutlinePencil, HiOutlineTrash, HiOutlineXCircle, HiPlus} from "react-icons/hi";
import Image from 'next/image';
import {HiEllipsisHorizontal, HiEllipsisVertical} from "react-icons/hi2";

interface SpellBookProps {
    spellBook: ISpellBookSaved;
    onEdit: () => void;
    onDelete: () => void;
}

function SpellBook({spellBook, onEdit, onDelete}: SpellBookProps) {
    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onEdit();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onDelete();
    };

    return <div className={`relative pt-10`}>
        <div className="dropdown dropdown-bottom dropdown-end absolute right-0 top-0">
            <div tabIndex={0} role="button" className="p-0 cursor-pointer"><HiEllipsisVertical size={30} /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a onClick={handleEditClick}><HiOutlinePencil/> Modifier</a></li>
                <li><a className={`text-error`} onClick={handleDeleteClick}><HiOutlineTrash/> Supprimer</a></li>
            </ul>
        </div>
        <Link href={`spell-books/${spellBook.id}`}>
            <div className={`w-52 h-75 relative`}>
                <Image src={`/images/spellbooks/${spellBook.cover}.png`} width={208} height={280} alt={spellBook.name}/>
                <div className={
                    `grimoire-title absolute top-17 w-4/5 px-2 text-center text-xl leading-[1.30] font-bold
                     -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden wrap-break-word`
                }
                >{spellBook.name}</div>
                {spellBook.spells.length > 0 && <div className={
                    `grimoire-title absolute bottom-15 w-full px-4 text-center text-xl font-bold translate-y-1/2`
                }
                >{spellBook.spells.length} sorts</div>}
            </div>
        </Link>
    </div>
}

interface SpellBookAddProps {
    openModalHander: () => void;
}

function SpellBookAdd({openModalHander}: SpellBookAddProps) {
    return (
        <div
            className={`w-52 h-75 mt-10 flex flex-col items-center justify-center border-2 border-primary border-dashed cursor-pointer`}
            onClick={openModalHander}>
            <HiPlus size={45} className={`text-primary`}/>
            <span className={`text-primary font-semibold text-center w-2/3`}>
                Ajouter un nouveau livre de sort
            </span>
        </div>
    );
}

export default function SpellBooksPage() {
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const [nameError, setNameError] = useState(false);
    const [coverActive, setCoverActive] = useState<SpellBookCover>("black");
    const [modalType, setModalType] = useState<"add" | "edit">("add");
    const [editingBook, setEditingBook] = useState<ISpellBookSaved | null>(null);
    const [bookToDelete, setBookToDelete] = useState<ISpellBookSaved | null>(null);


    const {addSpellBook, updateSpellBook, deleteSpellBook} = useContext(SaveManagerContext);
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

    const openDeleteModal = () => {
        (document.getElementById('delete_confirmation_modal') as HTMLDialogElement)?.showModal();
    }

    const closeDeleteModal = () => {
        (document.getElementById('delete_confirmation_modal') as HTMLDialogElement)?.close();
        setBookToDelete(null);
    }

    const handleAddClick = () => {
        setModalType("add");
        setEditingBook(null);
        if (nameInputRef.current) {
            nameInputRef.current.value = "";
        }
        setNameError(false);
        setCoverActive(spellBookCovers[Math.floor(Math.random() * spellBookCovers.length)]);
        openModal();
    };

    const handleEditClick = (book: ISpellBookSaved) => {
        setModalType("edit");
        setEditingBook(book);
        if (nameInputRef.current) {
            nameInputRef.current.value = book.name;
        }
        setNameError(false);
        setCoverActive(book.cover);
        openModal();
    };

    const handleDeleteRequest = (book: ISpellBookSaved) => {
        setBookToDelete(book);
        openDeleteModal();
    }

    const handleConfirmDelete = () => {
        if(bookToDelete) {
            deleteSpellBook(bookToDelete.id);
        }
        closeDeleteModal();
    }

    const validateHandler = useCallback(() => {
        if (!nameInputRef.current) return;

        const name = nameInputRef.current.value.trim();

        if (name === "") {
            setNameError(true);
            return;
        }

        if (modalType === 'edit' && editingBook) {
            updateSpellBook(editingBook.id, name, coverActive)
        } else {
            addSpellBook(name, coverActive);
        }

        (document.getElementById('spellbook_modal') as HTMLDialogElement)?.close();
    }, [addSpellBook, modalType, editingBook, coverActive, updateSpellBook]);

    return (
        <>
            <div>SpellBooksPage</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
                {saveData.spellsBooks.map(book => (
                    <SpellBook
                        key={book.id}
                        spellBook={book}
                        onEdit={() => handleEditClick(book)}
                        onDelete={() => handleDeleteRequest(book)}
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
                            <input
                                type="text"
                                className={`input w-full !outline-none ${nameError ? 'input-error' : ''}`}
                                placeholder={"Nom du livre de sort"}
                                ref={nameInputRef}
                                onChange={() => setNameError(false)}
                            />
                        </label>
                        {nameError && <p className="text-error text-sm mt-1">Le nom ne peut pas être vide.</p>}
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
            <dialog id="delete_confirmation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirmer la suppression</h3>
                    <p className="py-4">
                        Êtes-vous sûr de vouloir supprimer le livre de sort "{bookToDelete?.name}" ? Cette action est irréversible.
                    </p>
                    <div className="modal-action justify-end gap-2">
                        <button className="btn" onClick={closeDeleteModal}>
                            <HiOutlineXCircle size={20}/>
                            Annuler
                        </button>
                        <button className="btn btn-error" onClick={handleConfirmDelete}>
                            <HiOutlineTrash size={20}/>
                            Supprimer
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeDeleteModal}>close</button>
                </form>
            </dialog>
        </>
    );
}