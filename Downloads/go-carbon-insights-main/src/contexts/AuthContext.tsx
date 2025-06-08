import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePassword, 
  validateUsername,
  checkRateLimit,
  getGenericAuthError 
} from '@/utils/securityValidation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: any }>;
  signIn: (emailOrUsername: string, password: string) => Promise<{ error: any }>;
  signInWithUsername: (username: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Demo mode flag - set to false when moving to production
  const isDemoMode = true;

  useEffect(() => {
    // In demo mode, simulate a quick loading state then allow access
    if (isDemoMode) {
      const timer = setTimeout(() => {
        setLoading(false);
        // Create a mock user for demo purposes
        const mockUser = {
          id: 'demo-user',
          email: 'demo@gocarbontracker.com',
          email_confirmed_at: new Date().toISOString(),
        } as User;
        setUser(mockUser);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Production mode: normal auth flow
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          console.log('Email verified and user signed in');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isDemoMode]);

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      setLoading(true);
      
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedUsername = username ? sanitizeInput(username) : sanitizedEmail.split('@')[0];
      
      if (!checkRateLimit(`signup:${sanitizedEmail}`, 3, 15 * 60 * 1000)) {
        return { error: { message: 'Too many signup attempts. Please try again later.' } };
      }
      
      if (!validateEmail(sanitizedEmail)) {
        return { error: { message: 'Please enter a valid email address' } };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { error: { message: passwordValidation.message } };
      }

      const usernameValidation = validateUsername(sanitizedUsername);
      if (!usernameValidation.isValid) {
        return { error: { message: usernameValidation.message } };
      }

      const redirectUrl = `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: sanitizedUsername,
            display_name: sanitizedUsername
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        if (error.message.includes('User already registered')) {
          return { error: { message: 'An account with this email may already exist. Please try signing in instead.' } };
        }
        return { error: { message: 'Unable to create account. Please try again.' } };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      return { error: { message: 'An unexpected error occurred during signup' } };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    try {
      setLoading(true);
      
      const cleanInput = sanitizeInput(emailOrUsername).toLowerCase();
      
      if (!checkRateLimit(`signin:${cleanInput}`, 5, 15 * 60 * 1000)) {
        return { error: { message: 'Too many login attempts. Please try again later.' } };
      }
      
      const isEmail = validateEmail(cleanInput);
      
      if (isEmail) {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanInput,
          password
        });
        
        if (error) {
          console.error('Email login error:', error);
          return { error: { message: getGenericAuthError() } };
        }
        
        return { error: null };
      } else {
        return await signInWithUsername(cleanInput, password);
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      return { error: { message: getGenericAuthError() } };
    } finally {
      setLoading(false);
    }
  };

  const signInWithUsername = async (username: string, password: string) => {
    try {
      const cleanUsername = sanitizeInput(username).toLowerCase();
      
      const usernameValidation = validateUsername(cleanUsername);
      if (!usernameValidation.isValid) {
        return { error: { message: getGenericAuthError() } };
      }
      
      const { data: profile, error: lookupError } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (lookupError) {
        console.error('Username lookup error:', lookupError);
        return { error: { message: getGenericAuthError() } };
      }

      if (!profile) {
        return { error: { message: getGenericAuthError() } };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password
      });

      if (error) {
        console.error('Username login error:', error);
        return { error: { message: getGenericAuthError() } };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected username login error:', error);
      return { error: { message: getGenericAuthError() } };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        return { error };
      }

      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error('Unexpected logout error:', error);
      return { error: { message: 'An unexpected error occurred during logout' } };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const sanitizedEmail = sanitizeInput(email);
      
      if (!checkRateLimit(`reset:${sanitizedEmail}`, 2, 15 * 60 * 1000)) {
        return { error: { message: 'Too many password reset attempts. Please try again later.' } };
      }
      
      if (!validateEmail(sanitizedEmail)) {
        return { error: { message: 'Please enter a valid email address' } };
      }

      const redirectUrl = `${window.location.origin}/auth?mode=reset`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
        redirectTo: redirectUrl
      });

      if (error) {
        console.error('Password reset error:', error);
        return { error: null };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected password reset error:', error);
      return { error: null };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithUsername,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
