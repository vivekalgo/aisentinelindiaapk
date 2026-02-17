import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { signInWithGoogle, user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Redirect if already logged in
    if (user) {
        navigate('/')
        return null
    }

    const handleGoogleLogin = async () => {
        try {
            setLoading(true)
            setError(null)
            await signInWithGoogle()
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center animate-fade-in-up">
                {/* Logo */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold font-display text-white mb-2">
                    Welcome Back
                </h1>
                <p className="text-slate-400 mb-8">
                    Sign in to access AI Legal Sentinel
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg mb-6"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    )
}
