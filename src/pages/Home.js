import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15, ${props => props.theme.colors.secondary}15);
  border-radius: 1rem;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.secondary};
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const FeaturesSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const StatsSection = styled.section`
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  padding: 3rem;
  margin-bottom: 4rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>مرحباً بك في مدونة احترافية</HeroTitle>
        <HeroSubtitle>
          منصة متقدمة للمحتوى الرقمي مع ميزات الذكاء الاصطناعي لإدارة ونشر المحتوى بجودة عالية
        </HeroSubtitle>
        <CTAButtons>
          <Button to="/blog" className="primary">
            ابدأ القراءة
          </Button>
          <Button to="/register" className="secondary">
            انضم إلينا
          </Button>
        </CTAButtons>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>ميزاتنا المتميزة</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <div className="icon">🤖</div>
            <h3>الذكاء الاصطناعي</h3>
            <p>
              توليد محتوى ذكي، ترجمة تلقائية، تصحيح لغوي ونحوي، وتحويل الصوت إلى نص
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="icon">📝</div>
            <h3>إدارة المحتوى</h3>
            <p>
              نظام متقدم لإدارة المقالات، الصور، الفيديوهات، والصوتيات مع تصنيفات ذكية
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="icon">👥</div>
            <h3>التفاعل الاجتماعي</h3>
            <p>
              تعليقات، إعجابات، مشاركات، وأحداث مجدولة لبناء مجتمع نشط
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="icon">📊</div>
            <h3>التحليلات المتقدمة</h3>
            <p>
              إحصائيات مفصلة عن الأداء، اهتمامات القراء، وتنبؤات ذكية للمحتوى
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="icon">🎨</div>
            <h3>تصميم مرن</h3>
            <p>
              واجهة مستخدم حديثة ومتجاوبة مع إمكانية تخصيص الثيمات والألوان
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="icon">🔒</div>
            <h3>أمان متقدم</h3>
            <p>
              نظام مصادقة آمن، صلاحيات متدرجة، وحماية شاملة للبيانات
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <SectionTitle>إحصائياتنا</SectionTitle>
        <StatsGrid>
          <StatItem>
            <h3>1000+</h3>
            <p>مقال منشور</p>
          </StatItem>
          <StatItem>
            <h3>5000+</h3>
            <p>مستخدم نشط</p>
          </StatItem>
          <StatItem>
            <h3>50+</h3>
            <p>كاتب محترف</p>
          </StatItem>
          <StatItem>
            <h3>99%</h3>
            <p>معدل الرضا</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;
