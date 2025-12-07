export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            id={props.id}
            type={props.type}
            className={`${props.className} cursor-pointer flex-1 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition`}
        >
            {props.children}
        </button>
    )
}