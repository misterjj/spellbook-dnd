import {useEffect, useState} from 'react';
import Image, {ImageProps} from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc: string;
}

export default function ImageWithFallback({src, fallbackSrc, alt, ...props}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = () => {
        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <Image
            alt={alt}
            src={imgSrc}
            onError={handleError}
            {...props}
        />
    );
}