import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
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

const Logo = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Form = styled.form`
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
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const PasswordInput = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
`;

const LoginButton = styled.button`
  padding: 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.surface};
  }

  &.google {
    color: #db4437;
  }

  &.facebook {
    color: #4267b2;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPassword = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      toast.success('تم تسجيل الدخول بنجاح!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('خطأ في تسجيل الدخول. تحقق من بياناتك.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`تسجيل الدخول بـ ${provider} قريباً...`);
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginHeader>
          <Logo>
            <i className="fas fa-blog"></i>
          </Logo>
          <Title>مرحباً بعودتك</Title>
          <Subtitle>سجل دخولك للوصول إلى حسابك</Subtitle>
        </LoginHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">كلمة المرور</Label>
            <PasswordInput>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="أدخل كلمة المرور"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </PasswordToggle>
            </PasswordInput>
            <ForgotPassword to="/forgot-password">
              نسيت كلمة المرور؟
            </ForgotPassword>
          </FormGroup>

          <LoginButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                تسجيل الدخول
              </>
            )}
          </LoginButton>
        </Form>

        <Divider>أو</Divider>

        <SocialLogin>
          <SocialButton
            type="button"
            className="google"
            onClick={() => handleSocialLogin('Google')}
          >
            <i className="fab fa-google"></i>
            تسجيل الدخول بـ Google
          </SocialButton>
          
          <SocialButton
            type="button"
            className="facebook"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <i className="fab fa-facebook-f"></i>
            تسجيل الدخول بـ Facebook
          </SocialButton>
        </SocialLogin>

        <Footer>
          ليس لديك حساب؟{' '}
          <FooterLink to="/register">إنشاء حساب جديد</FooterLink>
        </Footer>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
