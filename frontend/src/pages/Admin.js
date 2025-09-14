import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminHeader = styled.div`
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

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const AdminCard = styled(motion.div)`
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

const CardIcon = styled.div`
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

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CardButton = styled.button`
  width: 100%;
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
`;

const StatsSection = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.color || props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const QuickActionsSection = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const QuickActionButton = styled.button`
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: right;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ActionDescription = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

function Admin() {
  const [stats] = useState({
    totalUsers: 1250,
    totalPosts: 450,
    totalComments: 2300,
    totalViews: 125000,
    activeUsers: 890,
    newUsersToday: 25
  });

  const adminFeatures = [
    {
      title: 'إدارة المستخدمين',
      description: 'إدارة حسابات المستخدمين، الأدوار، والصلاحيات',
      icon: '👥',
      color: '#3b82f6',
      action: 'إدارة المستخدمين'
    },
    {
      title: 'إدارة المحتوى',
      description: 'مراجعة وتعديل المقالات والتصنيفات',
      icon: '📝',
      color: '#10b981',
      action: 'إدارة المحتوى'
    },
    {
      title: 'إدارة التعليقات',
      description: 'مراجعة وموافقة التعليقات الجديدة',
      icon: '💬',
      color: '#f59e0b',
      action: 'إدارة التعليقات'
    },
    {
      title: 'الإحصائيات',
      description: 'عرض إحصائيات مفصلة عن الموقع والمستخدمين',
      icon: '📊',
      color: '#8b5cf6',
      action: 'عرض الإحصائيات'
    },
    {
      title: 'إعدادات الموقع',
      description: 'تعديل إعدادات الموقع العامة والمظهر',
      icon: '⚙️',
      color: '#ef4444',
      action: 'إعدادات الموقع'
    },
    {
      title: 'إدارة الملفات',
      description: 'إدارة الملفات والوسائط المرفوعة',
      icon: '📁',
      color: '#06b6d4',
      action: 'إدارة الملفات'
    }
  ];

  const quickActions = [
    {
      title: 'إنشاء مقال جديد',
      description: 'كتابة مقال جديد للموقع',
      icon: '✍️'
    },
    {
      title: 'مراجعة التعليقات',
      description: 'مراجعة التعليقات المعلقة',
      icon: '👀'
    },
    {
      title: 'إضافة مستخدم',
      description: 'إنشاء حساب مستخدم جديد',
      icon: '👤'
    },
    {
      title: 'نسخ احتياطي',
      description: 'إنشاء نسخة احتياطية من البيانات',
      icon: '💾'
    },
    {
      title: 'تحديث الموقع',
      description: 'تحديث إعدادات الموقع',
      icon: '🔄'
    },
    {
      title: 'مراقبة الأداء',
      description: 'فحص أداء الموقع والخوادم',
      icon: '📈'
    }
  ];

  const handleAdminAction = (action) => {
    console.log(`Admin action: ${action}`);
    // Implement admin actions
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick actions
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <Title>لوحة تحكم الإدارة</Title>
        <Subtitle>إدارة شاملة لجميع جوانب الموقع</Subtitle>
      </AdminHeader>

      <StatsSection>
        <h2 style={{ marginBottom: '2rem', color: '#1e293b' }}>إحصائيات الموقع</h2>
        <StatsGrid>
          <StatItem>
            <StatNumber color="#3b82f6">{stats.totalUsers.toLocaleString()}</StatNumber>
            <StatLabel>إجمالي المستخدمين</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber color="#10b981">{stats.totalPosts}</StatNumber>
            <StatLabel>إجمالي المقالات</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber color="#f59e0b">{stats.totalComments.toLocaleString()}</StatNumber>
            <StatLabel>إجمالي التعليقات</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber color="#8b5cf6">{stats.totalViews.toLocaleString()}</StatNumber>
            <StatLabel>إجمالي المشاهدات</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber color="#ef4444">{stats.activeUsers}</StatNumber>
            <StatLabel>المستخدمين النشطين</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber color="#06b6d4">{stats.newUsersToday}</StatNumber>
            <StatLabel>مستخدمين جدد اليوم</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <AdminGrid>
        {adminFeatures.map((feature, index) => (
          <AdminCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CardIcon color={feature.color}>
              {feature.icon}
            </CardIcon>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
            <CardButton onClick={() => handleAdminAction(feature.action)}>
              {feature.action}
              <i className="fas fa-arrow-left"></i>
            </CardButton>
          </AdminCard>
        ))}
      </AdminGrid>

      <QuickActionsSection>
        <h2 style={{ marginBottom: '2rem', color: '#1e293b' }}>إجراءات سريعة</h2>
        <QuickActionsGrid>
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              onClick={() => handleQuickAction(action.title)}
            >
              <ActionIcon>{action.icon}</ActionIcon>
              <ActionContent>
                <ActionTitle>{action.title}</ActionTitle>
                <ActionDescription>{action.description}</ActionDescription>
              </ActionContent>
            </QuickActionButton>
          ))}
        </QuickActionsGrid>
      </QuickActionsSection>
    </AdminContainer>
  );
}

export default Admin;
