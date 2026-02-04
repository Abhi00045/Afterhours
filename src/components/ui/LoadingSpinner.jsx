export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} border-3 border-vintage-border border-t-vintage-brown rounded-full animate-spin`}></div>
  )
}

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-vintage-paper flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-vintage-brown font-serif">Loading AfterHours...</p>
      </div>
    </div>
  )
}