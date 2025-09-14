import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const BlogSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const PostCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const PostImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostCategory = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const PostTitle = styled.h3`
  margin: 1rem 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  line-height: 1.4;
`;

const PostExcerpt = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const PostLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
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

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories] = useState([
    { id: 'all', name: 'الكل' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'business', name: 'الأعمال' },
    { id: 'lifestyle', name: 'نمط الحياة' },
    { id: 'education', name: 'التعليم' },
    { id: 'health', name: 'الصحة' }
  ]);

  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      title: 'مستقبل الذكاء الاصطناعي في تطوير الويب',
      excerpt: 'استكشاف كيف سيغير الذكاء الاصطناعي طريقة تطوير التطبيقات والمواقع الإلكترونية...',
      category: 'technology',
      author: 'أحمد محمد',
      date: '2024-01-15',
      image: '🤖',
      readTime: '5 دقائق'
    },
    {
      id: 2,
      title: 'استراتيجيات التسويق الرقمي الفعالة',
      excerpt: 'تعلم أفضل الطرق لزيادة المبيعات وتحسين العائد على الاستثمار في التسويق الرقمي...',
      category: 'business',
      author: 'فاطمة علي',
      date: '2024-01-14',
      image: '📈',
      readTime: '7 دقائق'
    },
    {
      id: 3,
      title: 'نصائح للحفاظ على التوازن بين العمل والحياة',
      excerpt: 'اكتشف الطرق العملية لتحقيق التوازن المثالي بين مسؤوليات العمل والحياة الشخصية...',
      category: 'lifestyle',
      author: 'محمد حسن',
      date: '2024-01-13',
      image: '⚖️',
      readTime: '4 دقائق'
    },
    {
      id: 4,
      title: 'أهمية التعلم المستمر في العصر الرقمي',
      excerpt: 'لماذا أصبح التعلم المستمر ضرورة حتمية في عالم يتغير بسرعة البرق...',
      category: 'education',
      author: 'سارة أحمد',
      date: '2024-01-12',
      image: '📚',
      readTime: '6 دقائق'
    },
    {
      id: 5,
      title: 'الرياضة والتغذية السليمة للعقل والجسم',
      excerpt: 'كيف تؤثر الرياضة والتغذية على صحة العقل والجسم معاً...',
      category: 'health',
      author: 'علي محمود',
      date: '2024-01-11',
      image: '💪',
      readTime: '8 دقائق'
    },
    {
      id: 6,
      title: 'أحدث تقنيات تطوير التطبيقات المحمولة',
      excerpt: 'استعراض أحدث الأدوات والتقنيات المستخدمة في تطوير التطبيقات المحمولة...',
      category: 'technology',
      author: 'نور الدين',
      date: '2024-01-10',
      image: '📱',
      readTime: '9 دقائق'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <BlogContainer>
        <LoadingSpinner>جاري تحميل المقالات...</LoadingSpinner>
      </BlogContainer>
    );
  }

  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>المدونة</BlogTitle>
        <BlogSubtitle>
          اكتشف أحدث المقالات والأفكار في مختلف المجالات
        </BlogSubtitle>
      </BlogHeader>

      <FiltersSection>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </FilterButton>
        ))}
      </FiltersSection>

      <PostsGrid>
        {filteredPosts.map(post => (
          <PostCard key={post.id}>
            <PostImage>{post.image}</PostImage>
            <PostContent>
              <PostCategory>
                {categories.find(cat => cat.id === post.category)?.name}
              </PostCategory>
              <PostTitle>
                <PostLink to={`/post/${post.id}`}>
                  {post.title}
                </PostLink>
              </PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <PostMeta>
                <span>{post.author} • {post.date}</span>
                <span>{post.readTime}</span>
              </PostMeta>
            </PostContent>
          </PostCard>
        ))}
      </PostsGrid>
    </BlogContainer>
  );
};

export default Blog;
