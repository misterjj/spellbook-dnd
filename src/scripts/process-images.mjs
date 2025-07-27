// scripts/process-images.mjs
import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const sourceDir = path.resolve('./public/images/spells-original');
const outputDir = path.resolve('./public/images/spells');

const MAX_WIDTH = 128;
const MAX_HEIGHT = 128;
const WEBP_QUALITY = 80; // Valeur entre 1 et 100. 75-85 est souvent un bon compromis.

async function processImages() {
    try {
        if (!await fs.pathExists(sourceDir)) {
            console.error(`Le dossier source n'existe pas : ${sourceDir}`);
            return;
        }

        await fs.ensureDir(outputDir); // Crée le dossier de destination s'il n'existe pas
        const files = await fs.readdir(sourceDir);

        console.log(`Début du traitement de ${files.length} images...`);

        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            // Garde le même nom de fichier, mais change l'extension
            const outputFileName = `${path.parse(file).name}.webp`;
            const outputPath = path.join(outputDir, outputFileName);

            await sharp(sourcePath)
                .resize({
                    width: MAX_WIDTH,
                    height: MAX_HEIGHT,
                    fit: 'inside', // 'inside' redimensionne sans déformer, en respectant les limites
                    withoutEnlargement: true, // N'agrandit pas les images déjà plus petites
                })
                .toFormat('webp', { quality: WEBP_QUALITY })
                .toFile(outputPath);

            console.log(`Traité : ${file} -> ${outputFileName}`);
        }

        console.log('✅ Traitement terminé avec succès !');

    } catch (error) {
        console.error('❌ Une erreur est survenue durant le traitement :', error);
    }
}

processImages();