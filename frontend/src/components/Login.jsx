import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { signInWithEmail, signInWithGoogle, user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [message, setMessage] = useState(null)
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

    const handleEmailLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            await signInWithEmail(email, fullName)
            setMessage('Check your email for the verification link!')
        } catch (err) {
            setError(err.message)
        } finally {
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

                {message && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mb-6 text-sm text-emerald-300">
                        {message}
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

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-slate-900 text-slate-400">Or continue with email</span>
                    </div>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            required
                            className="glass-input w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all mb-4"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="glass-input w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-slate-600 disabled:opacity-70"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <span>Send Verification Link</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
