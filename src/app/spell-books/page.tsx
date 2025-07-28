"use client"


import {useCallback, useContext, useRef, useState} from "react";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import Link from "next/link";
import {ISpellBookSaved, SpellBookCover, spellBookCovers} from "@/data/SpellBook";
import {HiCheck, HiOutlineXCircle, HiPlus} from "react-icons/hi";

interface SpellBookProps {
    spellBook: ISpellBookSaved
}

function SpellBook({spellBook}: SpellBookProps) {
    return <Link href={`spell-books/${spellBook.id}`}>
        <div className={`w-70 h-100  bg-black-500`}>
            {spellBook.id}
        </div>
    </Link>
}

function SpellBookAdd() {
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const [coverActive, setCoverActive] = useState<SpellBookCover>(spellBookCovers[Math.floor(Math.random() * spellBookCovers.length)])
    const {addSpellBook} = useContext(SaveManagerContext)


    const validateHandler = useCallback(() => {
        if (nameInputRef.current) {
            const uuid = addSpellBook(nameInputRef.current.value);
            (document.getElementById('add_spellbook_modal') as HTMLDialogElement).close()
        }
    }, [nameInputRef]);

    const spellBookCoverClasses: Record<SpellBookCover, string> = {
        red: "bg-red-500",
        orange: "bg-orange-500",
        yellow: "bg-yellow-500",
        lime: "bg-lime-500",
        green: "bg-green-500",
        cyan: "bg-cyan-500",
        blue: "bg-blue-500",
        violet: "bg-violet-500",
        fuchsia: "bg-fuchsia-500",
        rose: "bg-rose-500",
        slate: "bg-slate-500",
        zinc: "bg-zinc-500",
        black: "bg-black-500",
        white: "bg-white-500"
    };

    return <>
        <div
            className={`w-70 h-100 flex flex-col items-center justify-center border-2 border-primary border-dashed cursor-pointer`}
            onClick={() => (document.getElementById('add_spellbook_modal') as HTMLDialogElement).showModal()}>
            <HiPlus size={60} className={`text-primary`}/>
            <span
                className={`text-primary font-semibold text-lg text-center w-2/3`}>Ajouter un nouveau livre de sort</span>
        </div>
        <dialog id="add_spellbook_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Ajouter un nouveau livre de sort</h3>
                <fieldset className="fieldset">
                    <label className="floating-label">
                        <span>Nom du livre de sort</span>
                        <input type="text" className={`input w-full !outline-none`}
                               placeholder={"Nom du livre de sort"} ref={nameInputRef}/>
                    </label>
                </fieldset>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                    <legend className="fieldset-legend">Coverture</legend>
                    <div className={`flex flex-wrap gap-4 items-center justify-center`}>
                        {spellBookCovers.map((cover,index) => {
                            return <div
                                key={index}
                                className={`w-10 h-10 rounded-lg cursor-pointer shadow-lg ${spellBookCoverClasses[cover]} ${coverActive == cover ? 'outline-4 outline-offset-2' : ''}`}
                                onClick={() => setCoverActive(cover)}/>
                        })}
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
}

export default function SpellBooksPage() {
    const {saveData} = useContext(SaveManagerContext)

    return (
        <>
            <div>SpellBooksPage</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
                {saveData.spellsBooks.map(book => <SpellBook key={book.id} spellBook={book}/>)}
                <SpellBookAdd/>
            </div>
        </>
    )
}