import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const RegisterCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 3rem;
  width: 100%;
  max-width: 450px;
`;

const RegisterHeader = styled.div`
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const Checkbox = styled.input`
  margin-top: 0.25rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterButton = styled.button`
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

const SocialRegister = styled.div`
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

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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
    
    if (!agreeToTerms) {
      toast.error('يجب الموافقة على شروط الاستخدام');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      toast.success('تم إنشاء الحساب بنجاح!');
      navigate('/login');
    } catch (error) {
      toast.error('خطأ في إنشاء الحساب. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    toast.info(`التسجيل بـ ${provider} قريباً...`);
  };

  return (
    <RegisterContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RegisterHeader>
          <Logo>
            <i className="fas fa-blog"></i>
          </Logo>
          <Title>انضم إلينا</Title>
          <Subtitle>أنشئ حسابك الجديد وابدأ رحلتك معنا</Subtitle>
        </RegisterHeader>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">الاسم الأول</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="الاسم الأول"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">الاسم الأخير</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="الاسم الأخير"
                required
              />
            </FormGroup>
          </FormRow>

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
            <Label htmlFor="username">اسم المستخدم</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="اختر اسم مستخدم"
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
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <PasswordInput>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="أعد إدخال كلمة المرور"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </PasswordToggle>
            </PasswordInput>
          </FormGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              أوافق على <a href="/terms">شروط الاستخدام</a> و <a href="/privacy">سياسة الخصوصية</a>
            </CheckboxLabel>
          </CheckboxGroup>

          <RegisterButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                جاري إنشاء الحساب...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                إنشاء الحساب
              </>
            )}
          </RegisterButton>
        </Form>

        <Divider>أو</Divider>

        <SocialRegister>
          <SocialButton
            type="button"
            className="google"
            onClick={() => handleSocialRegister('Google')}
          >
            <i className="fab fa-google"></i>
            التسجيل بـ Google
          </SocialButton>
          
          <SocialButton
            type="button"
            className="facebook"
            onClick={() => handleSocialRegister('Facebook')}
          >
            <i className="fab fa-facebook-f"></i>
            التسجيل بـ Facebook
          </SocialButton>
        </SocialRegister>

        <Footer>
          لديك حساب بالفعل؟{' '}
          <FooterLink to="/login">تسجيل الدخول</FooterLink>
        </Footer>
      </RegisterCard>
    </RegisterContainer>
  );
}

export default Register;
