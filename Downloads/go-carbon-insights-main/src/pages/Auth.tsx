import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput, validateEmail, validatePassword, validateUsername } from '@/utils/securityValidation';
import Logo from '@/components/ui/Logo';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Handle email verification on page load
  useEffect(() => {
    const handleEmailVerification = async () => {
      const token = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token && type === 'email') {
        toast({
          title: "Email Verified Successfully",
          description: "Your email has been verified! You can now sign in to your account.",
        });
        // Clear URL parameters and switch to sign in mode
        navigate('/auth', { replace: true });
        setIsSignUp(false);
      }
      
      // Handle various verification states
      if (searchParams.get('verified') === 'true') {
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified. You can now sign in.",
        });
        setIsSignUp(false);
      }
      
      if (searchParams.get('error')) {
        const errorMsg = searchParams.get('error_description') || 'Email verification failed';
        setError(errorMsg);
        toast({
          title: "Verification Error",
          description: errorMsg,
          variant: "destructive",
        });
      }

      // Handle confirmation errors
      if (searchParams.get('error_code') === 'email_not_confirmed') {
        toast({
          title: "Email Not Verified",
          description: "Please check your email and click the verification link before signing in.",
          variant: "destructive",
        });
        setIsSignUp(false);
      }
    };

    handleEmailVerification();
  }, [searchParams, navigate, toast]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    // Sanitize input as user types
    const sanitized = sanitizeInput(value);
    setFormData(prev => ({
      ...prev,
      [field]: sanitized
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (isSignUp) {
      if (!formData.email || !formData.username || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
      
      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }

      const usernameValidation = validateUsername(formData.username);
      if (!usernameValidation.isValid) {
        setError(usernameValidation.message || 'Invalid username format');
        return false;
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        setError(passwordValidation.message || 'Password does not meet requirements');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else {
      if (!formData.emailOrUsername || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.username);
        
        if (error) {
          setError(error.message || 'An error occurred during sign up. Please try again.');
        } else {
          toast({
            title: "Account Created Successfully",
            description: "Please check your email to verify your account before signing in.",
          });
          setIsSignUp(false);
          resetForm();
        }
      } else {
        const { error } = await signIn(formData.emailOrUsername, formData.password);
        
        if (error) {
          if (error.message?.includes('email_not_confirmed')) {
            setError('Please verify your email address before signing in. Check your inbox for the verification link.');
          } else {
            setError(error.message || 'An error occurred during sign in. Please try again.');
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      emailOrUsername: '', 
      email: '', 
      username: '', 
      password: '', 
      confirmPassword: '' 
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex flex-col items-center mb-6">
            <Logo size="large" className="h-12 w-auto mb-4" />
            <span className="text-2xl font-bold text-gray-900">GoCarbonTracker</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignUp 
              ? 'Sign up to start tracking your carbon emissions' 
              : 'Sign in to your account to continue'
            }
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Sign up' : 'Sign in'}</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp ? (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="w-full"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="Choose a username"
                      className="w-full"
                      maxLength={20}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Username
                  </label>
                  <Input
                    id="emailOrUsername"
                    type="text"
                    required
                    value={formData.emailOrUsername}
                    onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full"
                    maxLength={100}
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pr-10"
                    maxLength={128}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {isSignUp && (
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                )}
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full"
                    maxLength={128}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Sign in')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    resetForm();
                  }}
                  className="text-teal-600 hover:text-teal-500 font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
