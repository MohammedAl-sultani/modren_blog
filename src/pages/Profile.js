import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  margin: 0 auto 1rem;
  position: relative;
`;

const AvatarUpload = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ProfileTitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
    display: block;
  }
  
  .label {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSection = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  background: white;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }

  &:disabled {
    background: ${props => props.theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const PostsList = styled.div`
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
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.secondary}20);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const PostContent = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
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
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    location: '',
    interests: []
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('user')) || {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        bio: 'مطور ويب ومهتم بالذكاء الاصطناعي',
        website: 'https://ahmed.dev',
        location: 'القاهرة، مصر',
        interests: ['التكنولوجيا', 'البرمجة', 'الذكاء الاصطناعي'],
        avatar: '👨‍💻',
        joinDate: '2024-01-01',
        stats: {
          posts: 12,
          followers: 150,
          following: 75
        }
      };
      
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        bio: userData.bio,
        website: userData.website,
        location: userData.location,
        interests: userData.interests
      });
      
      // Mock posts data
      setPosts([
        {
          id: 1,
          title: 'مستقبل الذكاء الاصطناعي في تطوير الويب',
          status: 'published',
          views: 1250,
          date: '2024-01-15',
          image: '🤖'
        },
        {
          id: 2,
          title: 'استراتيجيات التسويق الرقمي الفعالة',
          status: 'draft',
          views: 0,
          date: '2024-01-14',
          image: '📈'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save profile logic
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio,
      website: user.website,
      location: user.location,
      interests: user.interests
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <ProfileContainer>
        <LoadingSpinner>جاري تحميل الملف الشخصي...</LoadingSpinner>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>
          {user.avatar}
          <AvatarUpload type="file" accept="image/*" />
        </ProfileAvatar>
        <ProfileName>{user.name}</ProfileName>
        <ProfileTitle>{user.bio}</ProfileTitle>
        
        <ProfileStats>
          <StatItem>
            <span className="number">{user.stats.posts}</span>
            <span className="label">مقالات</span>
          </StatItem>
          <StatItem>
            <span className="number">{user.stats.followers}</span>
            <span className="label">متابعون</span>
          </StatItem>
          <StatItem>
            <span className="number">{user.stats.following}</span>
            <span className="label">متابع</span>
          </StatItem>
        </ProfileStats>
      </ProfileHeader>

      <ProfileContent>
        <ProfileSection>
          <SectionTitle>المعلومات الشخصية</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="name">الاسم الكامل</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="bio">نبذة شخصية</Label>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!editing}
              placeholder="اكتب نبذة عن نفسك..."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="website">الموقع الشخصي</Label>
            <Input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={!editing}
              placeholder="https://example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="location">الموقع</Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!editing}
              placeholder="المدينة، البلد"
            />
          </FormGroup>

          <ButtonGroup>
            {editing ? (
              <>
                <Button className="primary" onClick={handleSave}>
                  حفظ التغييرات
                </Button>
                <Button className="secondary" onClick={handleCancel}>
                  إلغاء
                </Button>
              </>
            ) : (
              <Button className="primary" onClick={() => setEditing(true)}>
                تعديل الملف الشخصي
              </Button>
            )}
          </ButtonGroup>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>مقالاتي الأخيرة</SectionTitle>
          <PostsList>
            {posts.map(post => (
              <PostItem key={post.id}>
                <PostImage>{post.image}</PostImage>
                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>
                    {post.views} مشاهدة • {post.date}
                    <PostStatus className={post.status}>
                      {post.status === 'published' ? 'منشور' : 'مسودة'}
                    </PostStatus>
                  </PostMeta>
                </PostContent>
              </PostItem>
            ))}
          </PostsList>
        </ProfileSection>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
