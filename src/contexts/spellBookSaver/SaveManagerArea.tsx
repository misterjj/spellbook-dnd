import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {emptySave, SaveData, SaveManagerContext} from "@/contexts/spellBookSaver/SaveManagerContext";
import {SpellId} from "@/data/Spell";
import {ISpellBookSaved} from "@/data/SpellBook";

interface SpellBookSaverAreaProps {
    children: ReactNode;
}

export function SaveManagerArea({children}: SpellBookSaverAreaProps) {
    const [saveData, setSaveData] = useState<SaveData>(emptySave)

    useEffect(() => {
        const obj = localStorage.getItem('my-save')
        if (null != obj) {
            const data: SaveData = JSON.parse(obj)
            setSaveData(data)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('my-save', JSON.stringify(saveData));
    }, [saveData])


    const addSpell = useCallback((bookId: string, spell: SpellId) => {
        setSaveData(currentSaveData => {
            const existingBook = currentSaveData.spellsBooks.find(book => book.id === bookId);

            if (existingBook) {
                if (existingBook.spells.includes(spell)) {
                    return currentSaveData;
                }

                const updatedSpellsBooks = currentSaveData.spellsBooks.map(book => {
                    if (book.id === bookId) {
                        return {
                            ...book,
                            spells: [...book.spells, spell]
                        };
                    }

                    return book;
                });

                return {
                    ...currentSaveData,
                    spellsBooks: updatedSpellsBooks
                };
            }

            else {
                const newBook: ISpellBookSaved = {
                    id: bookId,
                    spells: [spell]
                };

                return {
                    ...currentSaveData,
                    spellsBooks: [...currentSaveData.spellsBooks, newBook]
                };
            }
        });
    }, []);

    const removeSpell = useCallback((bookId: string, spellToRemove: SpellId) => {
        setSaveData(currentSaveData => {
            const updatedSpellsBooks = currentSaveData.spellsBooks.map(book => {
                if (book.id !== bookId) {
                    return book;
                }

                return {
                    ...book,
                    spells: book.spells.filter(spell => spell !== spellToRemove)
                };
            });

            return {
                ...currentSaveData,
                spellsBooks: updatedSpellsBooks
            };
        });

    }, []);


    const contextValue = {
        saveData,
        addSpell,
        removeSpell,
        persist: () => {}
    };

    return (
        <SaveManagerContext.Provider value={contextValue}>
            {children}
        </SaveManagerContext.Provider>
    );
}