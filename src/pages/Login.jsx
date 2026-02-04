import { useState } from 'react'
import { signInWithGoogle, signInWithTwitter } from '../lib/auth'
import { Button } from '../components/ui/Button'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
// import loginImage from "./loginpage.png"

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithGoogle()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleTwitterSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithTwitter()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-vintage-paper flex flex-col lg:flex-row overflow-hidden relative">

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* LEFT — LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 relative z-10">

        <div className="max-w-md w-full">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-handwriting text-5xl sm:text-6xl text-vintage-ink mb-3">
              AfterHours
            </h1>
            <p className="font-serif text-lg text-vintage-brown italic">
              Your personal journal, preserved in time
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white border border-vintage-border rounded-2xl shadow-vintage-lg p-8">

            <p className="font-serif text-vintage-brown text-center mb-8">
              Sign in to continue your journey
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-serif text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">

              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                variant="secondary"
                className="w-full text-lg"
                icon={
                  loading ? <LoadingSpinner size="sm" /> : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )
                }
              >
                {loading ? 'Signing in...' : 'Continue with Google'}
              </Button>

              <Button
                onClick={handleTwitterSignIn}
                disabled={loading}
                variant="secondary"
                className="w-full text-lg"
                icon={
                  loading ? <LoadingSpinner size="sm" /> : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )
                }
              >
                {loading ? 'Signing in...' : 'Continue with Twitter'}
              </Button>

            </div>

            {/* <div className="mt-8 pt-6 border-t border-vintage-border">
              <p className="text-center text-sm font-serif text-vintage-brown">
                By signing in, you agree to preserve your thoughts <br />
                in the pages of AfterHours
              </p>
            </div> */}
          </div>

          <div className="mt-8 text-center">
            <p className="font-handwriting text-vintage-brown text-xl">
              "The pen is mightier than the sword"
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — IMAGE HERO */}
      <div className="hidden lg:flex w-1/2 items-center justify-center  bg-[#F5F1E8]">

        {/* <div className="max-w-xl rounded-3xl overflow-hidden shadow-2xl"> */}
          <img
            src="/loginpage.png"
            alt="Discover hidden gems illustration"
            className="w-[89%] h-[90%] object-cover"
          />
        {/* </div> */}

      </div>

    </div>
  )
}
