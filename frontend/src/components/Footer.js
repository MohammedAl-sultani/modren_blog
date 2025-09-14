import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 3rem 2rem 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${props => props.theme.colors.textSecondary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: ${props => props.theme.colors.secondary};
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo to="/">
            <i className="fas fa-blog"></i>
            المدونة الاحترافية
          </Logo>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>
            منصة متطورة للكتابة والنشر مع ميزات الذكاء الاصطناعي المتقدمة.
            انضم إلى مجتمع الكتاب والمبدعين.
          </p>
          <SocialLinks>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>روابط سريعة</h3>
          <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/blog">المدونة</Link></li>
            <li><Link to="/categories">التصنيفات</Link></li>
            <li><Link to="/about">حولنا</Link></li>
            <li><Link to="/contact">اتصل بنا</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>للمستخدمين</h3>
          <ul>
            <li><Link to="/register">إنشاء حساب</Link></li>
            <li><Link to="/login">تسجيل الدخول</Link></li>
            <li><Link to="/dashboard">لوحة التحكم</Link></li>
            <li><Link to="/profile">الملف الشخصي</Link></li>
            <li><Link to="/settings">الإعدادات</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>المساعدة</h3>
          <ul>
            <li><Link to="/help">مركز المساعدة</Link></li>
            <li><Link to="/faq">الأسئلة الشائعة</Link></li>
            <li><Link to="/privacy">سياسة الخصوصية</Link></li>
            <li><Link to="/terms">شروط الاستخدام</Link></li>
            <li><Link to="/support">الدعم الفني</Link></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © 2024 المدونة الاحترافية. جميع الحقوق محفوظة.
          <br />
          تم تطويره بـ ❤️ باستخدام Python, React, و MySQL
        </p>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
