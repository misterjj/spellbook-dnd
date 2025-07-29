import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {emptySave, SaveData, SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import {SpellId} from "@/data/Spell";
import {ISpellBookSaved, SpellBookCover} from "@/data/SpellBook";

interface SpellBookSaverAreaProps {
    children: ReactNode;
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
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

    const getSpellBook = useCallback((bookId: string) => {
        return saveData.spellsBooks.find(book => book.id === bookId);
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
                    name: `book-name-${bookId}`,
                    cover: "black",
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

    const cleanSpells = useCallback((bookId: string) => {
        setSaveData(currentSaveData => {
            const updatedSpellsBooks = currentSaveData.spellsBooks.map(book => {
                if (book.id !== bookId) {
                    return book;
                }

                return {
                    ...book,
                    spells: []
                };
            });

            return {
                ...currentSaveData,
                spellsBooks: updatedSpellsBooks
            };
        });
    }, []);

    const addSpellBook = useCallback((name: string, cover: SpellBookCover) => {
        const uuid = uuidv4();

        setSaveData(currentSaveDate => {
            const updatedSpellBooks = [
                ...currentSaveDate.spellsBooks,
                {
                    id: uuid,
                    name: name,
                    cover: cover,
                    spells: []
                }
            ]

            return {
                ...currentSaveDate,
                spellsBooks: updatedSpellBooks
            }
        })

        return uuid;
    }, [])


    const updateSpellBook = useCallback((id: string, name: string, cover: SpellBookCover) => {
        setSaveData(currentSaveData => {
            const updatedSpellBooks = currentSaveData.spellsBooks.map(spellBook => {
                if (spellBook.id === id) {
                    return {
                        ...spellBook,
                        name: name,
                        cover: cover,
                    };
                }
                return spellBook;
            });

            return {
                ...currentSaveData,
                spellsBooks: updatedSpellBooks,
            };
        });
    }, []);

    const deleteSpellBook = useCallback((id: string) => {
        setSaveData(currentSaveData => {
            return {
                ...currentSaveData,
                spellsBooks: currentSaveData.spellsBooks.filter(spellBook => spellBook.id !== id),
            };
        });
    }, []);


    const contextValue = {
        saveData,
        addSpell,
        removeSpell,
        cleanSpells,
        getSpellBook,
        addSpellBook,
        updateSpellBook,
        deleteSpellBook
    };

    return (
        <SaveManagerContext.Provider value={contextValue}>
            {children}
        </SaveManagerContext.Provider>
    );
}