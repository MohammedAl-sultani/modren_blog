import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.secondary}10);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 3rem;
  width: 100%;
  max-width: 400px;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &.error {
    border-color: ${props => props.theme.colors.error};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
`;

const LoginButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    background: ${props => props.theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${props => props.theme.colors.textSecondary};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }

  span {
    padding: 0 1rem;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.surface};
  }
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme.colors.textSecondary};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'أحمد محمد',
        email: formData.email,
        role: 'user'
      }));
      
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'حدث خطأ أثناء تسجيل الدخول' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    console.log(`Login with ${provider}`);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginTitle>تسجيل الدخول</LoginTitle>
          <LoginSubtitle>مرحباً بك مرة أخرى</LoginSubtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          {errors.general && (
            <ErrorMessage>{errors.general}</ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="أدخل بريدك الإلكتروني"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="أدخل كلمة المرور"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          <LoginButton type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'تسجيل الدخول'}
          </LoginButton>
        </LoginForm>

        <Divider>
          <span>أو</span>
        </Divider>

        <SocialLogin>
          <SocialButton type="button" onClick={() => handleSocialLogin('google')}>
            <span>🔍</span>
            Google
          </SocialButton>
          <SocialButton type="button" onClick={() => handleSocialLogin('facebook')}>
            <span>📘</span>
            Facebook
          </SocialButton>
        </SocialLogin>

        <LoginFooter>
          <p>
            ليس لديك حساب؟{' '}
            <Link to="/register">إنشاء حساب جديد</Link>
          </p>
          <p>
            <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
          </p>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
