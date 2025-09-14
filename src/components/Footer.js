import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    font-size: 1.125rem;
  }

  ul {
    list-style: none;
    padding: 0;
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

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>مدونة احترافية</h3>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>
            منصة احترافية للمحتوى الرقمي مع ميزات الذكاء الاصطناعي المتقدمة
            لإدارة ونشر المحتوى بجودة عالية.
          </p>
          <SocialLinks>
            <a href="#" aria-label="فيسبوك">📘</a>
            <a href="#" aria-label="تويتر">🐦</a>
            <a href="#" aria-label="لينكد إن">💼</a>
            <a href="#" aria-label="يوتيوب">📺</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>روابط سريعة</h3>
          <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/blog">المدونة</Link></li>
            <li><Link to="/about">حول</Link></li>
            <li><Link to="/contact">اتصل بنا</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>الميزات</h3>
          <ul>
            <li><Link to="/features/ai">الذكاء الاصطناعي</Link></li>
            <li><Link to="/features/content">إدارة المحتوى</Link></li>
            <li><Link to="/features/analytics">التحليلات</Link></li>
            <li><Link to="/features/collaboration">التعاون</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>الدعم</h3>
          <ul>
            <li><Link to="/help">مركز المساعدة</Link></li>
            <li><Link to="/docs">الوثائق</Link></li>
            <li><Link to="/api">واجهة برمجة التطبيقات</Link></li>
            <li><Link to="/status">حالة الخدمة</Link></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © 2024 مدونة احترافية. جميع الحقوق محفوظة. | 
          <Link to="/privacy" style={{ margin: '0 0.5rem' }}>سياسة الخصوصية</Link> | 
          <Link to="/terms">شروط الاستخدام</Link>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
