import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  margin-bottom: 3rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
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
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .number {
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .label {
    color: ${props => props.theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
`;

const ViewAllLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
  }
`;

const PostImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.secondary}20);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const PostContent = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.4;
`;

const PostMeta = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const PostStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;

  &.published {
    background: ${props => props.theme.colors.success}20;
    color: ${props => props.theme.colors.success};
  }

  &.draft {
    background: ${props => props.theme.colors.warning}20;
    color: ${props => props.theme.colors.warning};
  }

  &.pending {
    background: ${props => props.theme.colors.secondary}20;
    color: ${props => props.theme.colors.secondary};
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  .icon {
    font-size: 2rem;
  }

  .label {
    font-weight: 500;
    text-align: center;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 0.5rem;
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const ActivityTime = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.75rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
    totalLikes: 0
  });

  // Mock data
  const mockPosts = [
    {
      id: 1,
      title: 'مستقبل الذكاء الاصطناعي في تطوير الويب',
      status: 'published',
      views: 1250,
      likes: 45,
      date: '2024-01-15',
      image: '🤖'
    },
    {
      id: 2,
      title: 'استراتيجيات التسويق الرقمي الفعالة',
      status: 'draft',
      views: 0,
      likes: 0,
      date: '2024-01-14',
      image: '📈'
    },
    {
      id: 3,
      title: 'نصائح للحفاظ على التوازن بين العمل والحياة',
      status: 'pending',
      views: 0,
      likes: 0,
      date: '2024-01-13',
      image: '⚖️'
    }
  ];

  const mockActivities = [
    {
      id: 1,
      icon: '👀',
      text: 'شخص ما قرأ مقالك "مستقبل الذكاء الاصطناعي"',
      time: 'منذ 5 دقائق'
    },
    {
      id: 2,
      icon: '❤️',
      text: 'حصلت على إعجاب جديد على مقالك',
      time: 'منذ 15 دقيقة'
    },
    {
      id: 3,
      icon: '💬',
      text: 'تعليق جديد على مقالك "استراتيجيات التسويق"',
      time: 'منذ ساعة'
    },
    {
      id: 4,
      icon: '📝',
      text: 'تم نشر مقالك الجديد بنجاح',
      time: 'منذ 3 ساعات'
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('user')) || {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        role: 'author'
      };
      
      setUser(userData);
      setStats({
        totalPosts: 12,
        publishedPosts: 8,
        totalViews: 15420,
        totalLikes: 342
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>جاري تحميل لوحة التحكم...</LoadingSpinner>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <WelcomeMessage>مرحباً، {user?.name}!</WelcomeMessage>
        <WelcomeSubtitle>إليك نظرة عامة على نشاطك في المدونة</WelcomeSubtitle>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <div className="icon">📝</div>
          <div className="number">{stats.totalPosts}</div>
          <div className="label">إجمالي المقالات</div>
        </StatCard>
        <StatCard>
          <div className="icon">✅</div>
          <div className="number">{stats.publishedPosts}</div>
          <div className="label">مقالات منشورة</div>
        </StatCard>
        <StatCard>
          <div className="icon">👀</div>
          <div className="number">{stats.totalViews.toLocaleString()}</div>
          <div className="label">إجمالي المشاهدات</div>
        </StatCard>
        <StatCard>
          <div className="icon">❤️</div>
          <div className="number">{stats.totalLikes}</div>
          <div className="label">إجمالي الإعجابات</div>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <MainContent>
          <Section>
            <SectionHeader>
              <SectionTitle>مقالاتي الأخيرة</SectionTitle>
              <ViewAllLink to="/my-posts">عرض الكل</ViewAllLink>
            </SectionHeader>
            <PostList>
              {mockPosts.map(post => (
                <PostItem key={post.id}>
                  <PostImage>{post.image}</PostImage>
                  <PostContent>
                    <PostTitle>{post.title}</PostTitle>
                    <PostMeta>
                      {post.views} مشاهدة • {post.likes} إعجاب • {post.date}
                      <PostStatus className={post.status}>
                        {post.status === 'published' && 'منشور'}
                        {post.status === 'draft' && 'مسودة'}
                        {post.status === 'pending' && 'في الانتظار'}
                      </PostStatus>
                    </PostMeta>
                  </PostContent>
                </PostItem>
              ))}
            </PostList>
          </Section>
        </MainContent>

        <Sidebar>
          <Section>
            <SectionHeader>
              <SectionTitle>إجراءات سريعة</SectionTitle>
            </SectionHeader>
            <QuickActions>
              <ActionButton to="/create-post">
                <div className="icon">✍️</div>
                <div className="label">مقال جديد</div>
              </ActionButton>
              <ActionButton to="/upload-media">
                <div className="icon">📁</div>
                <div className="label">رفع ملفات</div>
              </ActionButton>
              <ActionButton to="/analytics">
                <div className="icon">📊</div>
                <div className="label">التحليلات</div>
              </ActionButton>
              <ActionButton to="/settings">
                <div className="icon">⚙️</div>
                <div className="label">الإعدادات</div>
              </ActionButton>
            </QuickActions>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>النشاط الأخير</SectionTitle>
            </SectionHeader>
            <ActivityList>
              {mockActivities.map(activity => (
                <ActivityItem key={activity.id}>
                  <ActivityIcon>{activity.icon}</ActivityIcon>
                  <ActivityContent>
                    <ActivityText>{activity.text}</ActivityText>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </Section>
        </Sidebar>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
