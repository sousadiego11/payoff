import { Spinner } from "./spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

export function Button({ loading = false, children, className = "", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`
                ${className}
                cursor-pointer flex items-center justify-center gap-2
                flex-1 bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm
                transition
                hover:bg-indigo-600
                disabled:opacity-70 disabled:cursor-not-allowed
            `}
        >
            {loading ? <Spinner className="text-white/80" /> : children}
        </button>
    );
}