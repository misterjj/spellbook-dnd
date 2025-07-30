import {
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";

interface DivFixerProps {
    children: ReactNode;
}

export function DivFixer({ children }: DivFixerProps) {
    const [isFixed, setIsFixed] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const child = Children.only(children);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const updateDimensions = () => {
            const top = container.getBoundingClientRect().top + window.scrollY;
            setWidth(container.offsetWidth);
            setHeight(container.offsetHeight);
            return top;
        };

        const initialTop = updateDimensions();

        const handleScroll = () => {
            setIsFixed(window.scrollY > initialTop);
        };

        const handleResize = () => {
            updateDimensions();
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!isValidElement(child)) {
        return <>{child}</>;
    }

    const childProps = child.props as { className?: string, style?: React.CSSProperties };

    const childClassName = childProps.className || '';

    const containerStyle = isFixed ? { minHeight: `${height}px` } : {};

    const fixedChildStyle = isFixed ? { width: `${width}px` } : {};

    return (
        <div className={`relative w-full group/div-fixer`} ref={ref} style={containerStyle}>
            {cloneElement(child as ReactElement<{ className?: string, style?: object }>, {
                className: `${childClassName} ${isFixed ? "fixed max-h-screen overflow-y-auto top-0 !m-0" : ""}`,
                style: {
                    ...childProps,
                    ...fixedChildStyle
                }
            })}
        </div>
    );
}