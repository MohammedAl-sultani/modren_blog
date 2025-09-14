import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  background: ${props => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
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

const Section = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const SectionButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
  }
`;

const PostImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const PostMeta = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const PostStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;

  &.published {
    background: #d1fae5;
    color: #065f46;
  }

  &.draft {
    background: #fef3c7;
    color: #92400e;
  }

  &.archived {
    background: #fee2e2;
    color: #991b1b;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const QuickActions = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
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
  margin-bottom: 1rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const RecentActivity = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

function Dashboard() {
  const [stats] = useState({
    totalPosts: 25,
    publishedPosts: 18,
    draftPosts: 5,
    totalViews: 12500,
    totalLikes: 890,
    totalComments: 234
  });

  const [recentPosts] = useState([
    {
      id: 1,
      title: 'مقدمة في الذكاء الاصطناعي',
      status: 'published',
      views: 1250,
      likes: 89,
      date: '2024-01-15',
      image: '🤖'
    },
    {
      id: 2,
      title: 'أفضل ممارسات التطوير',
      status: 'published',
      views: 980,
      likes: 67,
      date: '2024-01-14',
      image: '💻'
    },
    {
      id: 3,
      title: 'تصميم واجهات المستخدم',
      status: 'draft',
      views: 0,
      likes: 0,
      date: '2024-01-13',
      image: '🎨'
    }
  ]);

  const [recentActivity] = useState([
    {
      type: 'comment',
      text: 'تعليق جديد على مقال "الذكاء الاصطناعي"',
      time: 'منذ ساعتين',
      icon: '💬',
      color: '#3b82f6'
    },
    {
      type: 'like',
      text: 'إعجاب جديد بمقال "أفضل ممارسات التطوير"',
      time: 'منذ 4 ساعات',
      icon: '❤️',
      color: '#ef4444'
    },
    {
      type: 'view',
      text: 'زيارة جديدة لمقال "تصميم واجهات المستخدم"',
      time: 'منذ 6 ساعات',
      icon: '👁️',
      color: '#10b981'
    },
    {
      type: 'publish',
      text: 'تم نشر مقال جديد',
      time: 'منذ يوم',
      icon: '📝',
      color: '#8b5cf6'
    }
  ]);

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>لوحة التحكم</Title>
        <Subtitle>مرحباً بك في لوحة تحكم المدونة</Subtitle>
      </DashboardHeader>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatIcon color="#3b82f6">
            <i className="fas fa-file-alt"></i>
          </StatIcon>
          <StatNumber>{stats.totalPosts}</StatNumber>
          <StatLabel>إجمالي المقالات</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatIcon color="#10b981">
            <i className="fas fa-eye"></i>
          </StatIcon>
          <StatNumber>{stats.totalViews.toLocaleString()}</StatNumber>
          <StatLabel>إجمالي المشاهدات</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatIcon color="#ef4444">
            <i className="fas fa-heart"></i>
          </StatIcon>
          <StatNumber>{stats.totalLikes}</StatNumber>
          <StatLabel>إجمالي الإعجابات</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StatIcon color="#8b5cf6">
            <i className="fas fa-comments"></i>
          </StatIcon>
          <StatNumber>{stats.totalComments}</StatNumber>
          <StatLabel>إجمالي التعليقات</StatLabel>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <MainContent>
          <Section>
            <SectionHeader>
              <SectionTitle>المقالات الأخيرة</SectionTitle>
              <SectionButton>عرض الكل</SectionButton>
            </SectionHeader>
            
            <PostList>
              {recentPosts.map((post) => (
                <PostItem key={post.id}>
                  <PostImage>{post.image}</PostImage>
                  <PostInfo>
                    <PostTitle>{post.title}</PostTitle>
                    <PostMeta>
                      {post.views} مشاهدة • {post.likes} إعجاب • {post.date}
                    </PostMeta>
                  </PostInfo>
                  <PostStatus className={post.status}>
                    {getStatusText(post.status)}
                  </PostStatus>
                </PostItem>
              ))}
            </PostList>
          </Section>
        </MainContent>

        <Sidebar>
          <QuickActions>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>إجراءات سريعة</h3>
            
            <ActionButton>
              <i className="fas fa-plus"></i>
              كتابة مقال جديد
            </ActionButton>
            
            <ActionButton>
              <i className="fas fa-upload"></i>
              رفع ملف
            </ActionButton>
            
            <ActionButton>
              <i className="fas fa-cog"></i>
              إعدادات الحساب
            </ActionButton>
          </QuickActions>

          <RecentActivity>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>النشاط الأخير</h3>
            
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon color={activity.color}>
                  {activity.icon}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>{activity.text}</ActivityText>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </RecentActivity>
        </Sidebar>
      </ContentGrid>
    </DashboardContainer>
  );
}

export default Dashboard;
