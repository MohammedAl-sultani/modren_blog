import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.secondary}10);
  padding: 2rem;
`;

const RegisterCard = styled.div`
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

const RegisterTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
`;

const RegisterForm = styled.form`
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

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
`;

const StrengthBar = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StrengthSegment = styled.div`
  height: 4px;
  flex: 1;
  background: ${props => {
    if (props.strength === 'weak') return props.theme.colors.error;
    if (props.strength === 'medium') return props.theme.colors.warning;
    if (props.strength === 'strong') return props.theme.colors.success;
    return props.theme.colors.border;
  }};
  border-radius: 2px;
`;

const StrengthText = styled.span`
  font-size: 0.75rem;
  color: ${props => {
    if (props.strength === 'weak') return props.theme.colors.error;
    if (props.strength === 'medium') return props.theme.colors.warning;
    if (props.strength === 'strong') return props.theme.colors.success;
    return props.theme.colors.textSecondary;
  }};
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
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
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

const SocialRegister = styled.div`
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

const RegisterFooter = styled.div`
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

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 2) setPasswordStrength('weak');
    else if (strength < 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
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
      
      // Mock successful registration
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: formData.name,
        email: formData.email,
        role: 'user'
      }));
      
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'حدث خطأ أثناء إنشاء الحساب' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // Mock social registration
    console.log(`Register with ${provider}`);
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <RegisterTitle>إنشاء حساب جديد</RegisterTitle>
          <RegisterSubtitle>انضم إلى مجتمعنا المتنامي</RegisterSubtitle>
        </RegisterHeader>

        <RegisterForm onSubmit={handleSubmit}>
          {errors.general && (
            <ErrorMessage>{errors.general}</ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="name">الاسم الكامل</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="أدخل اسمك الكامل"
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

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
            
            {formData.password && (
              <PasswordStrength>
                <StrengthBar>
                  <StrengthSegment strength={passwordStrength} />
                  <StrengthSegment strength={passwordStrength} />
                  <StrengthSegment strength={passwordStrength} />
                  <StrengthSegment strength={passwordStrength} />
                </StrengthBar>
                <StrengthText strength={passwordStrength}>
                  {passwordStrength === 'weak' && 'كلمة مرور ضعيفة'}
                  {passwordStrength === 'medium' && 'كلمة مرور متوسطة'}
                  {passwordStrength === 'strong' && 'كلمة مرور قوية'}
                </StrengthText>
              </PasswordStrength>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="أعد إدخال كلمة المرور"
            />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              أوافق على{' '}
              <Link to="/terms">الشروط والأحكام</Link>
              {' '}و{' '}
              <Link to="/privacy">سياسة الخصوصية</Link>
            </CheckboxLabel>
          </CheckboxGroup>
          {errors.agreeToTerms && <ErrorMessage>{errors.agreeToTerms}</ErrorMessage>}

          <RegisterButton type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'إنشاء الحساب'}
          </RegisterButton>
        </RegisterForm>

        <Divider>
          <span>أو</span>
        </Divider>

        <SocialRegister>
          <SocialButton type="button" onClick={() => handleSocialRegister('google')}>
            <span>🔍</span>
            Google
          </SocialButton>
          <SocialButton type="button" onClick={() => handleSocialRegister('facebook')}>
            <span>📘</span>
            Facebook
          </SocialButton>
        </SocialRegister>

        <RegisterFooter>
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login">تسجيل الدخول</Link>
          </p>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
