import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminHeader = styled.div`
  margin-bottom: 3rem;
`;

const AdminTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const AdminSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
`;

const AdminLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    order: 2;
  }
`;

const SidebarTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background: ${props => props.active ? `${props.theme.colors.primary}10` : 'transparent'};

  &:hover {
    background: ${props => props.theme.colors.primary}10;
    color: ${props => props.theme.colors.primary};
  }
`;

const MainContent = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;

  .icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .number {
    font-size: 1.75rem;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.25rem;
  }

  .label {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  background: ${props => props.theme.colors.surface};
  padding: 1rem;
  text-align: right;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
`;

const TableRow = styled.tr`
  &:hover {
    background: ${props => props.theme.colors.surface};
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
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

  &.danger {
    background: ${props => props.theme.colors.error};
    color: white;

    &:hover {
      background: #dc2626;
    }
  }

  &.success {
    background: ${props => props.theme.colors.success};
    color: white;

    &:hover {
      background: #059669;
    }
  }
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
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  background: white;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

// Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalViews: 0
  });

  useEffect(() => {
    // Mock data
    setStats({
      totalUsers: 1250,
      totalPosts: 342,
      totalComments: 1890,
      totalViews: 45670
    });
  }, []);

  return (
    <div>
      <h2>لوحة التحكم الرئيسية</h2>
      <StatsGrid>
        <StatCard>
          <div className="icon">👥</div>
          <div className="number">{stats.totalUsers.toLocaleString()}</div>
          <div className="label">إجمالي المستخدمين</div>
        </StatCard>
        <StatCard>
          <div className="icon">📝</div>
          <div className="number">{stats.totalPosts}</div>
          <div className="label">إجمالي المقالات</div>
        </StatCard>
        <StatCard>
          <div className="icon">💬</div>
          <div className="number">{stats.totalComments}</div>
          <div className="label">إجمالي التعليقات</div>
        </StatCard>
        <StatCard>
          <div className="icon">👀</div>
          <div className="number">{stats.totalViews.toLocaleString()}</div>
          <div className="label">إجمالي المشاهدات</div>
        </StatCard>
      </StatsGrid>
    </div>
  );
};

// Users Management Component
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock data
    setUsers([
      { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'admin', status: 'active', joinDate: '2024-01-01' },
      { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'author', status: 'active', joinDate: '2024-01-02' },
      { id: 3, name: 'محمد حسن', email: 'mohamed@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-03' }
    ]);
  }, []);

  return (
    <div>
      <h2>إدارة المستخدمين</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>الاسم</TableHeader>
            <TableHeader>البريد الإلكتروني</TableHeader>
            <TableHeader>الدور</TableHeader>
            <TableHeader>الحالة</TableHeader>
            <TableHeader>تاريخ الانضمام</TableHeader>
            <TableHeader>الإجراءات</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span style={{ 
                  color: user.status === 'active' ? '#10b981' : '#ef4444',
                  fontWeight: '500'
                }}>
                  {user.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>
                <Button className="primary" style={{ marginLeft: '0.5rem' }}>تعديل</Button>
                <Button className="danger">حذف</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Posts Management Component
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Mock data
    setPosts([
      { id: 1, title: 'مستقبل الذكاء الاصطناعي', author: 'أحمد محمد', status: 'published', views: 1250, date: '2024-01-15' },
      { id: 2, title: 'استراتيجيات التسويق الرقمي', author: 'فاطمة علي', status: 'draft', views: 0, date: '2024-01-14' },
      { id: 3, title: 'نصائح للتوازن بين العمل والحياة', author: 'محمد حسن', status: 'pending', views: 0, date: '2024-01-13' }
    ]);
  }, []);

  return (
    <div>
      <h2>إدارة المقالات</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>العنوان</TableHeader>
            <TableHeader>المؤلف</TableHeader>
            <TableHeader>الحالة</TableHeader>
            <TableHeader>المشاهدات</TableHeader>
            <TableHeader>التاريخ</TableHeader>
            <TableHeader>الإجراءات</TableHeader>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>
                <span style={{ 
                  color: post.status === 'published' ? '#10b981' : 
                         post.status === 'draft' ? '#f59e0b' : '#64748b',
                  fontWeight: '500'
                }}>
                  {post.status === 'published' ? 'منشور' : 
                   post.status === 'draft' ? 'مسودة' : 'في الانتظار'}
                </span>
              </TableCell>
              <TableCell>{post.views}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>
                <Button className="primary" style={{ marginLeft: '0.5rem' }}>تعديل</Button>
                <Button className="danger">حذف</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Settings Component
const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'مدونة احترافية',
    siteDescription: 'منصة متقدمة للمحتوى الرقمي',
    allowRegistration: true,
    moderateComments: true
  });

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <div>
      <h2>إعدادات الموقع</h2>
      <FormGroup>
        <Label>اسم الموقع</Label>
        <Input 
          value={settings.siteName}
          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
        />
      </FormGroup>
      <FormGroup>
        <Label>وصف الموقع</Label>
        <TextArea 
          value={settings.siteDescription}
          onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
        />
      </FormGroup>
      <FormGroup>
        <Label>السماح بالتسجيل</Label>
        <Select 
          value={settings.allowRegistration}
          onChange={(e) => setSettings({...settings, allowRegistration: e.target.value === 'true'})}
        >
          <option value="true">نعم</option>
          <option value="false">لا</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>مراجعة التعليقات</Label>
        <Select 
          value={settings.moderateComments}
          onChange={(e) => setSettings({...settings, moderateComments: e.target.value === 'true'})}
        >
          <option value="true">نعم</option>
          <option value="false">لا</option>
        </Select>
      </FormGroup>
      <Button className="success" onClick={handleSave}>حفظ الإعدادات</Button>
    </div>
  );
};

const Admin = () => {
  const location = useLocation();

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>لوحة تحكم الإدارة</AdminTitle>
        <AdminSubtitle>إدارة شاملة لجميع جوانب الموقع</AdminSubtitle>
      </AdminHeader>

      <AdminLayout>
        <Sidebar>
          <SidebarTitle>القائمة</SidebarTitle>
          <SidebarMenu>
            <MenuItem to="/admin" active={location.pathname === '/admin'}>
              <span>📊</span>
              لوحة التحكم
            </MenuItem>
            <MenuItem to="/admin/users" active={location.pathname === '/admin/users'}>
              <span>👥</span>
              المستخدمين
            </MenuItem>
            <MenuItem to="/admin/posts" active={location.pathname === '/admin/posts'}>
              <span>📝</span>
              المقالات
            </MenuItem>
            <MenuItem to="/admin/comments" active={location.pathname === '/admin/comments'}>
              <span>💬</span>
              التعليقات
            </MenuItem>
            <MenuItem to="/admin/categories" active={location.pathname === '/admin/categories'}>
              <span>📂</span>
              التصنيفات
            </MenuItem>
            <MenuItem to="/admin/media" active={location.pathname === '/admin/media'}>
              <span>📁</span>
              الوسائط
            </MenuItem>
            <MenuItem to="/admin/analytics" active={location.pathname === '/admin/analytics'}>
              <span>📈</span>
              التحليلات
            </MenuItem>
            <MenuItem to="/admin/settings" active={location.pathname === '/admin/settings'}>
              <span>⚙️</span>
              الإعدادات
            </MenuItem>
          </SidebarMenu>
        </Sidebar>

        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainContent>
      </AdminLayout>
    </AdminContainer>
  );
};

export default Admin;
