
const Button = ({ children, className, onClick, varient,type="text", ...props }) => {


    return (
        <button
            onClick={onClick}
            type={type}
            className={`px-8.5 py-3 rounded-[30px] cursor-pointer __text text-black font-semibold [letter-spacing:1px] ${varient === 'outline' ? '__hover_primary __border_P text-white hover:text-black delay-100' : varient === 'fill' ? `__default_btn` : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;