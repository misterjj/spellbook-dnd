import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises";
import path from "path";

// 1. Définissez les chemins d'accès
// Le chemin vers vos données de sorts originales
const SPELLS_DATA_PATH = path.resolve('./public/data/spells.json');
// Le chemin où seront sauvegardées les nouvelles données
const OUTPUT_DATA_PATH = path.resolve('./public/data/spells-with-blur.json');
// Le dossier contenant les images (celles que vous avez déjà converties en webp)
const IMAGES_DIR = path.resolve('./public/images/spells');

async function generateBlurData() {
    try {
        console.log("Lecture des données des sorts...");
        const spellsData = await fs.readFile(SPELLS_DATA_PATH, "utf-8");
        const spells = JSON.parse(spellsData);

        console.log(`Début de la génération des blurDataURL pour ${spells.length} sorts...`);

        // Utilisation de Promise.all pour traiter les images en parallèle pour plus de vitesse
        const processedSpells = await Promise.all(
            spells.map(async (spell) => {
                const imagePath = path.join(IMAGES_DIR, `${spell.id}.webp`); // Ou .jpg si vous n'avez pas encore converti

                try {
                    const file = await fs.readFile(imagePath);
                    const { base64 } = await getPlaiceholder(file, { size: 10 }); // size: 10 => image de 10px, très léger

                    return { ...spell, blurDataURL: base64 };
                } catch  {
                    // Si une image n'est pas trouvée, on logue une erreur et on continue
                    console.warn(`Image non trouvée pour le sort "${spell.id}". On essaie unknown.`);

                    const imagePath = path.join(IMAGES_DIR, `unknown.webp`); // Ou .jpg si vous n'avez pas encore converti

                    try {
                        const file = await fs.readFile(imagePath);
                        const { base64 } = await getPlaiceholder(file, { size: 10 }); // size: 10 => image de 10px, très léger

                        return { ...spell, blurDataURL: base64 };
                    } catch {
                        // Si une image n'est pas trouvée, on logue une erreur et on continue
                        console.warn(`Image non trouvée pour le sort "${spell.id}". On continue sans blurDataURL.`);


                        return spell; // Retourne le sort original sans la propriété blur
                    }
                }
            })
        );

        console.log("Écriture du nouveau fichier de données...");
        await fs.writeFile(OUTPUT_DATA_PATH, JSON.stringify(processedSpells, null, 2));

        console.log(`✅ Succès ! Les données avec blurDataURL ont été sauvegardées dans ${OUTPUT_DATA_PATH}`);
        console.log("Pensez à maintenant importer vos sorts depuis ce nouveau fichier dans votre application.");

    } catch (error) {
        console.error("❌ Une erreur est survenue :", error);
    }
}

generateBlurData();