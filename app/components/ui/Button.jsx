
const Button = ({ children, className, onClick, variant, type = "button", ...props }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold text-sm transition-all duration-300 ${
                variant === 'outline' 
                    ? 'border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-500 hover:text-white' 
                    : variant === 'fill' 
                    ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
            } ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;