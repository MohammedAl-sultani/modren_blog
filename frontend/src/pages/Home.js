import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
`;

const HeroSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  max-width: 1200px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ffd700;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: #ff6b6b;
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);

    &:hover {
      background: #ff5252;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  max-width: 800px;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

function Home() {
  const features = [
    {
      icon: '🤖',
      title: 'الذكاء الاصطناعي',
      description: 'توليد محتوى ذكي، ترجمة تلقائية، وتحويل الصوت إلى نص'
    },
    {
      icon: '📝',
      title: 'إدارة المحتوى',
      description: 'إنشاء وتحرير المقالات مع دعم الوسائط المتعددة'
    },
    {
      icon: '👥',
      title: 'التفاعل الاجتماعي',
      description: 'نظام تعليقات وإعجابات ومشاركة متقدم'
    },
    {
      icon: '📊',
      title: 'الإحصائيات',
      description: 'تحليلات مفصلة لأداء المحتوى والمستخدمين'
    },
    {
      icon: '🎨',
      title: 'تصميم متجاوب',
      description: 'واجهة جميلة ومتجاوبة مع جميع الأجهزة'
    },
    {
      icon: '🔒',
      title: 'أمان متقدم',
      description: 'حماية شاملة للبيانات والمستخدمين'
    }
  ];

  const stats = [
    { number: '1000+', label: 'مقال منشور' },
    { number: '5000+', label: 'مستخدم نشط' },
    { number: '50+', label: 'تصنيف' },
    { number: '99%', label: 'رضا العملاء' }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            مرحباً بك في المدونة الاحترافية
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            منصة متطورة للكتابة والنشر مع ميزات الذكاء الاصطناعي المتقدمة
            <br />
            انضم إلى مجتمع الكتاب والمبدعين
          </Subtitle>
        </motion.div>

        <CTAButtons>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CTAButton className="primary" to="/blog">
              <i className="fas fa-book-open"></i>
              ابدأ القراءة
            </CTAButton>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CTAButton className="secondary" to="/register">
              <i className="fas fa-user-plus"></i>
              انضم إلينا
            </CTAButton>
          </motion.div>
        </CTAButtons>
      </HeroSection>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <StatsSection>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
          >
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsSection>
    </HomeContainer>
  );
}

export default Home;
