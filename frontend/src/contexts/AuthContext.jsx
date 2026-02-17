import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!supabase) {
            console.warn('Supabase client not initialized. Authentication disabled.')
            setLoading(false)
            return
        }

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }).catch((err) => {
            console.error('Error getting session:', err)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for Deep Links (Mobile Auth Redirect)
        let appListener = null;
        if (Capacitor.isNativePlatform()) {
            appListener = App.addListener('appUrlOpen', async (event) => {
                try {
                    // Start the session with the URL fragment
                    // Supabase auto-detects the hash in the browser, but in Capacitor we might need to pass it?
                    // Actually, if the app opens with the URL, supabase-js might handle it if we just init.
                    // But to be safe, we can manually check.
                    // However, creating a session from URL is handled by `initialize()` usually if the URL is present on window.location
                    // But in Android, window.location might not be set to the deep link URL automatically in the webview.

                    // The robust way is to pass the URL to supabase if supported, or let the OAuth flow finish in the browser.
                    // Actually, Supabase recommends just letting the browser redirect to the custom scheme.
                    // When the app opens, we can use `supabase.auth.startAutoRefreshToken()` ?? No.

                    // Modern approach:
                    const url = new URL(event.url)
                    // If the URL contains access_token and refresh_token
                    if (url.hash.includes('access_token') && url.hash.includes('refresh_token')) {
                        // We don't have a direct method to set session from URL string in JS client easily without parsing it manually?
                        // Actually, we can just reload the page with the new URL? No, that's bad UX.

                        // Re-initialize session logic?
                        // Let's rely on onAuthStateChange for now, but log the event.
                        console.log('App opened with URL:', event.url)

                        // Allow time for supabase to process if it grabs it from window? 
                        // No, window.location in webview is different from event.url.

                        // Manual session exchange:
                        const params = new URLSearchParams(url.hash.substring(1)) // remove #
                        const access_token = params.get('access_token')
                        const refresh_token = params.get('refresh_token')

                        if (access_token && refresh_token) {
                            const { data, error } = await supabase.auth.setSession({
                                access_token,
                                refresh_token
                            })
                            if (error) console.error('Error setting session from deep link:', error)
                        }
                    }
                } catch (e) {
                    console.error('Error handling deep link:', e)
                }
            })
        }

        return () => {
            subscription.unsubscribe()
            if (appListener) appListener.remove();
        }
    }, [])

    const signInWithEmail = async (email, fullName) => {
        if (!supabase) throw new Error("Supabase is not configured.")

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}`,
                data: {
                    full_name: fullName
                }
            }
        })
        if (error) throw error
    }

    const signInWithGoogle = async () => {
        if (!supabase) throw new Error("Supabase is not configured.")

        const redirectTo = Capacitor.isNativePlatform()
            ? 'com.ailegal.sentinel://google-auth'
            : window.location.origin

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo,
                skipBrowserRedirect: false // Ensure we open the browser for OAuth
            }
        })
        if (error) throw error
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signInWithEmail, signInWithGoogle, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
