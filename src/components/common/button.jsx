export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
  ...rest
}) {
  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border  focus:outline-none ",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-200",
    success: "bg-green-600 hover:bg-green-700 text-white border border-green-600",
    warning: "bg-amber-500 hover:bg-amber-600 text-white border border-amber-500",
    danger: "bg-red-600 hover:bg-red-700 text-white border border-red-600",
    outline:
      "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-none",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };
  return (
    <button
      onClick={onClick}
      className={`font-poppins rounded-full transition duration-200 flex justify-center items-center ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
      {...rest}
    >
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
