import {Children, cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useRef, useState} from "react";

interface DivFixerProps {
    children: ReactNode;
}

export function DivFixer({children}: DivFixerProps) {
    const [scrollY, setScrollY] = useState(0)
    const [initY, setInitY] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const child = Children.only(children);

    useEffect(() => {
        setTimeout(() => {
            console.log(ref.current)
            console.log(ref.current?.offsetTop)
            setInitY(ref.current?.getBoundingClientRect().top ?? 0)
        }, 500)
        const logit = () => {
            setScrollY(window.pageYOffset);
        };

        function watchScroll() {
            window.addEventListener("scroll", logit);
        }
        watchScroll();

        return () => {
            window.removeEventListener("scroll", logit);
        };
    }, [ref]);

    if (!isValidElement(child)) {
        return <>{child}</>;
    }

    const childClassName = isValidElement(child) ? (child.props as { className?: string }).className || '' : '';

    return <div className={"relative w-full"} ref={ref}>
        {cloneElement(child as ReactElement<{ className?: string }>, {
            className: `${childClassName} ${scrollY > initY ? "fixed max-h-screen overflow-y-auto top-0 !m-0" : ""}`
        })}
    </div>
}