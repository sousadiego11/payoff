import type { HTMLAttributes, PropsWithChildren } from "react";

export function Glass(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    const { children, className = "", ...rest } = props;

    return (
        <div
            className={`
                rounded-xl
                bg-white/40 backdrop-blur-md border border-white/30 shadow-lg
                ${className}
            `}
            {...rest}
        >
            {children}
        </div>
    );
}
