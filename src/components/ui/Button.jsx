export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  icon = null
}) => {

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    px-5 sm:px-6 py-2.5 sm:py-3
    rounded-full font-serif font-semibold
    transition-all duration-200 ease-out
    active:translate-y-[2px]
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none
  `

  const variants = {
    primary: `
      bg-gradient-to-b from-vintage-brown to-[#6f5538]
      text-vintage-paper
      shadow-[0_6px_0_#5a442c,0_10px_20px_rgba(0,0,0,0.25)]
      hover:shadow-[0_4px_0_#5a442c,0_8px_16px_rgba(0,0,0,0.25)]
      active:shadow-[0_2px_0_#5a442c,0_4px_10px_rgba(0,0,0,0.25)]
    `,

    secondary: `
      bg-gradient-to-b from-vintage-cream to-vintage-tan
      text-vintage-ink
      shadow-[0_6px_0_#cbb89d,0_10px_20px_rgba(0,0,0,0.15)]
      hover:shadow-[0_4px_0_#cbb89d,0_8px_16px_rgba(0,0,0,0.15)]
      active:shadow-[0_2px_0_#cbb89d,0_4px_10px_rgba(0,0,0,0.15)]
    `,

    outline: `
      bg-vintage-paper
      text-vintage-brown
      border border-vintage-brown
      shadow-[0_4px_0_#8b6f4e]
      hover:bg-vintage-cream
      active:shadow-[0_2px_0_#8b6f4e]
    `,

    danger: `
      bg-gradient-to-b from-red-600 to-red-800
      text-white
      shadow-[0_6px_0_#7f1d1d,0_10px_20px_rgba(0,0,0,0.25)]
      hover:shadow-[0_4px_0_#7f1d1d,0_8px_16px_rgba(0,0,0,0.25)]
      active:shadow-[0_2px_0_#7f1d1d,0_4px_10px_rgba(0,0,0,0.25)]
    `
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon && <span className="text-lg leading-none">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
