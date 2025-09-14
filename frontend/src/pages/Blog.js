import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const PostCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-5px);
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const PostCategory = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const PostExcerpt = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const ReadMoreLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const PostStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

function Blog() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'development', name: 'التطوير' },
    { id: 'design', name: 'التصميم' },
    { id: 'business', name: 'الأعمال' }
  ];

  // Mock data - replace with actual API call
  const mockPosts = [
    {
      id: 1,
      title: 'مقدمة في الذكاء الاصطناعي وتطبيقاته',
      excerpt: 'استكشف عالم الذكاء الاصطناعي وتعلم كيف يغير حياتنا اليومية...',
      category: 'ai',
      author: 'أحمد محمد',
      date: '2024-01-15',
      readTime: '5 دقائق',
      views: 1250,
      likes: 89,
      comments: 23,
      image: '🤖'
    },
    {
      id: 2,
      title: 'أفضل ممارسات تطوير تطبيقات الويب',
      excerpt: 'تعلم أفضل الممارسات والأساليب الحديثة في تطوير تطبيقات الويب...',
      category: 'development',
      author: 'سارة أحمد',
      date: '2024-01-14',
      readTime: '8 دقائق',
      views: 980,
      likes: 67,
      comments: 15,
      image: '💻'
    },
    {
      id: 3,
      title: 'تصميم واجهات المستخدم الحديثة',
      excerpt: 'دليل شامل لتصميم واجهات مستخدم جذابة وسهلة الاستخدام...',
      category: 'design',
      author: 'محمد علي',
      date: '2024-01-13',
      readTime: '6 دقائق',
      views: 756,
      likes: 45,
      comments: 12,
      image: '🎨'
    },
    {
      id: 4,
      title: 'مستقبل التكنولوجيا في 2024',
      excerpt: 'توقعات وتوقعات حول التطورات التكنولوجية القادمة...',
      category: 'technology',
      author: 'فاطمة حسن',
      date: '2024-01-12',
      readTime: '7 دقائق',
      views: 1100,
      likes: 78,
      comments: 19,
      image: '🚀'
    },
    {
      id: 5,
      title: 'ريادة الأعمال في العصر الرقمي',
      excerpt: 'كيف تبدأ مشروعك الخاص في عالم الأعمال الرقمية...',
      category: 'business',
      author: 'خالد إبراهيم',
      date: '2024-01-11',
      readTime: '9 دقائق',
      views: 890,
      likes: 56,
      comments: 8,
      image: '💼'
    },
    {
      id: 6,
      title: 'أساسيات التعلم الآلي للمبتدئين',
      excerpt: 'مقدمة شاملة لتعلم الآلة ومفاهيمه الأساسية...',
      category: 'ai',
      author: 'نور الدين',
      date: '2024-01-10',
      readTime: '10 دقائق',
      views: 1450,
      likes: 95,
      comments: 31,
      image: '🧠'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (loading) {
    return (
      <BlogContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>جاري تحميل المقالات...</p>
        </div>
      </BlogContainer>
    );
  }

  return (
    <BlogContainer>
      <BlogHeader>
        <Title>المدونة</Title>
        <Subtitle>
          اكتشف أحدث المقالات والأفكار في عالم التكنولوجيا والذكاء الاصطناعي
        </Subtitle>
      </BlogHeader>

      <FiltersContainer>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={activeFilter === category.id}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </FilterButton>
        ))}
      </FiltersContainer>

      <PostsGrid>
        {filteredPosts.map((post, index) => (
          <PostCard
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PostImage>{post.image}</PostImage>
            <PostContent>
              <PostMeta>
                <PostCategory>{getCategoryName(post.category)}</PostCategory>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.date}</span>
              </PostMeta>
              
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              
              <PostFooter>
                <ReadMoreLink to={`/post/${post.id}`}>
                  اقرأ المزيد
                  <i className="fas fa-arrow-left"></i>
                </ReadMoreLink>
                
                <PostStats>
                  <StatItem>
                    <i className="fas fa-eye"></i>
                    {post.views}
                  </StatItem>
                  <StatItem>
                    <i className="fas fa-heart"></i>
                    {post.likes}
                  </StatItem>
                  <StatItem>
                    <i className="fas fa-comment"></i>
                    {post.comments}
                  </StatItem>
                </PostStats>
              </PostFooter>
            </PostContent>
          </PostCard>
        ))}
      </PostsGrid>

      <LoadMoreButton>
        تحميل المزيد من المقالات
      </LoadMoreButton>
    </BlogContainer>
  );
}

export default Blog;
