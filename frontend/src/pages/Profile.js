import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 3rem 2rem;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  margin: 0 auto 1rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ProfileBio = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const EditButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TabsContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const PostTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
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
`;

const PostActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const SettingsForm = styled.form`
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
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

function Profile() {
  const [activeTab, setActiveTab] = useState('posts');
  const [user] = useState({
    name: 'أحمد محمد',
    bio: 'مطور ومهتم بالذكاء الاصطناعي',
    email: 'ahmed@example.com',
    joinDate: '2023-01-15',
    location: 'الرياض، السعودية',
    website: 'https://ahmed.dev',
    postsCount: 25,
    followersCount: 1200,
    followingCount: 350
  });

  const [userPosts] = useState([
    {
      id: 1,
      title: 'مقدمة في الذكاء الاصطناعي',
      status: 'published',
      views: 1250,
      likes: 89,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'أفضل ممارسات التطوير',
      status: 'published',
      views: 980,
      likes: 67,
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'تصميم واجهات المستخدم',
      status: 'draft',
      views: 0,
      likes: 0,
      date: '2024-01-13'
    }
  ]);

  const [settings, setSettings] = useState({
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
    bio: 'مطور ومهتم بالذكاء الاصطناعي',
    location: 'الرياض، السعودية',
    website: 'https://ahmed.dev'
  });

  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
    // Implement save settings
  };

  const getStatusText = (status) => {
    return status === 'published' ? 'منشور' : 'مسودة';
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <EditButton>
          <i className="fas fa-edit"></i>
          تعديل الملف الشخصي
        </EditButton>
        
        <ProfileAvatar>{user.name.charAt(0)}</ProfileAvatar>
        <ProfileName>{user.name}</ProfileName>
        <ProfileBio>{user.bio}</ProfileBio>
        
        <ProfileStats>
          <StatItem>
            <StatNumber>{user.postsCount}</StatNumber>
            <StatLabel>مقال</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{user.followersCount}</StatNumber>
            <StatLabel>متابع</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{user.followingCount}</StatNumber>
            <StatLabel>متابع</StatLabel>
          </StatItem>
        </ProfileStats>
      </ProfileHeader>

      <ProfileContent>
        <Sidebar>
          <InfoCard>
            <CardTitle>معلومات الحساب</CardTitle>
            <InfoItem>
              <InfoLabel>البريد الإلكتروني</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>تاريخ الانضمام</InfoLabel>
              <InfoValue>{user.joinDate}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>الموقع</InfoLabel>
              <InfoValue>{user.location}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>الموقع الإلكتروني</InfoLabel>
              <InfoValue>
                <a href={user.website} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </InfoValue>
            </InfoItem>
          </InfoCard>

          <InfoCard>
            <CardTitle>الإحصائيات</CardTitle>
            <InfoItem>
              <InfoLabel>إجمالي المشاهدات</InfoLabel>
              <InfoValue>15,420</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>إجمالي الإعجابات</InfoLabel>
              <InfoValue>1,250</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>إجمالي التعليقات</InfoLabel>
              <InfoValue>340</InfoValue>
            </InfoItem>
          </InfoCard>
        </Sidebar>

        <MainContent>
          <TabsContainer>
            <TabsHeader>
              <Tab 
                active={activeTab === 'posts'} 
                onClick={() => setActiveTab('posts')}
              >
                المقالات
              </Tab>
              <Tab 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
              >
                الإعدادات
              </Tab>
            </TabsHeader>

            <TabContent>
              {activeTab === 'posts' && (
                <PostsGrid>
                  {userPosts.map((post) => (
                    <PostCard key={post.id}>
                      <PostTitle>{post.title}</PostTitle>
                      <PostMeta>
                        <span>{post.views} مشاهدة • {post.likes} إعجاب</span>
                        <PostStatus className={post.status}>
                          {getStatusText(post.status)}
                        </PostStatus>
                      </PostMeta>
                      <PostActions>
                        <ActionButton title="تعديل">
                          <i className="fas fa-edit"></i>
                        </ActionButton>
                        <ActionButton title="حذف">
                          <i className="fas fa-trash"></i>
                        </ActionButton>
                        <ActionButton title="مشاركة">
                          <i className="fas fa-share"></i>
                        </ActionButton>
                      </PostActions>
                    </PostCard>
                  ))}
                </PostsGrid>
              )}

              {activeTab === 'settings' && (
                <SettingsForm onSubmit={handleSaveSettings}>
                  <FormGroup>
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={settings.firstName}
                      onChange={handleSettingsChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={settings.lastName}
                      onChange={handleSettingsChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={settings.email}
                      onChange={handleSettingsChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="bio">نبذة شخصية</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={settings.bio}
                      onChange={handleSettingsChange}
                      placeholder="اكتب نبذة عن نفسك..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="location">الموقع</Label>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      value={settings.location}
                      onChange={handleSettingsChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <Input
                      type="url"
                      id="website"
                      name="website"
                      value={settings.website}
                      onChange={handleSettingsChange}
                    />
                  </FormGroup>

                  <SaveButton type="submit">
                    حفظ التغييرات
                  </SaveButton>
                </SettingsForm>
              )}
            </TabContent>
          </TabsContainer>
        </MainContent>
      </ProfileContent>
    </ProfileContainer>
  );
}

export default Profile;
