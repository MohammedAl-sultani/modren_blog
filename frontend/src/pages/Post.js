import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
`;

const PostCategory = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;

  h2, h3, h4 {
    margin: 2rem 0 1rem;
    color: ${props => props.theme.colors.text};
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-right: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    border-right: 4px solid ${props => props.theme.colors.primary};
    padding-right: 1rem;
    margin: 2rem 0;
    font-style: italic;
    color: ${props => props.theme.colors.textSecondary};
  }

  code {
    background: ${props => props.theme.colors.surface};
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }

  pre {
    background: ${props => props.theme.colors.surface};
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.liked ? props.theme.colors.error : 'transparent'};
  color: ${props => props.liked ? 'white' : props.theme.colors.text};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.liked ? props.theme.colors.error : props.theme.colors.surface};
  }
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ShareButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.border};
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.theme.colors.text};

  &:hover {
    background: ${props => props.theme.colors.surface};
    transform: translateY(-2px);
  }

  &.facebook:hover { color: #4267b2; }
  &.twitter:hover { color: #1da1f2; }
  &.linkedin:hover { color: #0077b5; }
  &.whatsapp:hover { color: #25d366; }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  margin-bottom: 3rem;
`;

const AuthorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const AuthorBio = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const AuthorStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CommentsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const CommentForm = styled.form`
  background: ${props => props.theme.colors.surface};
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const CommentSubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 4rem;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState('');

  // Mock post data
  const mockPost = {
    id: 1,
    title: 'مقدمة في الذكاء الاصطناعي وتطبيقاته في الحياة اليومية',
    category: { id: 'ai', name: 'الذكاء الاصطناعي' },
    author: {
      name: 'أحمد محمد',
      bio: 'خبير في الذكاء الاصطناعي والتعلم الآلي',
      avatar: 'أ',
      postsCount: 25,
      followersCount: 1200
    },
    content: `
      <p>الذكاء الاصطناعي (AI) هو أحد أكثر المجالات تطوراً في عصرنا الحالي. إنه يغير الطريقة التي نعيش ونعمل بها بشكل جذري.</p>
      
      <h2>ما هو الذكاء الاصطناعي؟</h2>
      <p>الذكاء الاصطناعي هو فرع من علوم الحاسوب يهدف إلى إنشاء آلات قادرة على التفكير والتعلم مثل البشر. يتضمن هذا المجال عدة تقنيات متقدمة مثل:</p>
      
      <ul>
        <li>التعلم الآلي (Machine Learning)</li>
        <li>التعلم العميق (Deep Learning)</li>
        <li>معالجة اللغة الطبيعية (NLP)</li>
        <li>الرؤية الحاسوبية (Computer Vision)</li>
      </ul>
      
      <h2>تطبيقات الذكاء الاصطناعي</h2>
      <p>يستخدم الذكاء الاصطناعي في العديد من المجالات:</p>
      
      <h3>1. الرعاية الصحية</h3>
      <p>يساعد الذكاء الاصطناعي في تشخيص الأمراض وتطوير الأدوية الجديدة وتحسين نتائج العلاج.</p>
      
      <h3>2. النقل</h3>
      <p>السيارات ذاتية القيادة هي أحد أهم تطبيقات الذكاء الاصطناعي في مجال النقل.</p>
      
      <h3>3. التمويل</h3>
      <p>يستخدم في تحليل المخاطر المالية واكتشاف الاحتيال وإدارة المحافظ الاستثمارية.</p>
      
      <blockquote>
        "الذكاء الاصطناعي سيكون إما أفضل شيء حدث للبشرية، أو الأسوأ. نحن لا نعرف بعد."
        <br />- ستيفن هوكينغ
      </blockquote>
      
      <h2>المستقبل</h2>
      <p>مع تطور التكنولوجيا، سنشهد المزيد من التطبيقات المذهلة للذكاء الاصطناعي. من المهم أن نستعد لهذا المستقبل ونضمن استخدام هذه التقنيات لصالح البشرية.</p>
    `,
    image: '🤖',
    publishedAt: '2024-01-15',
    readTime: '5 دقائق',
    views: 1250,
    likes: 89,
    comments: 23
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPost(mockPost);
      setLikesCount(mockPost.likes);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    toast.success(liked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب بالمقال');
  };

  const handleShare = (platform) => {
    toast.success(`تم مشاركة المقال على ${platform}`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('يرجى كتابة تعليق');
      return;
    }
    toast.success('تم إرسال التعليق');
    setComment('');
  };

  if (loading) {
    return (
      <PostContainer>
        <LoadingSpinner>
          <i className="fas fa-spinner fa-spin"></i>
          <br />
          جاري تحميل المقال...
        </LoadingSpinner>
      </PostContainer>
    );
  }

  if (!post) {
    return (
      <PostContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h1>المقال غير موجود</h1>
          <p>المقال الذي تبحث عنه غير موجود أو تم حذفه.</p>
          <Link to="/blog">العودة للمدونة</Link>
        </div>
      </PostContainer>
    );
  }

  return (
    <PostContainer>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PostHeader>
          <PostCategory to={`/category/${post.category.id}`}>
            {post.category.name}
          </PostCategory>
          
          <PostTitle>{post.title}</PostTitle>
          
          <PostMeta>
            <MetaItem>
              <i className="fas fa-user"></i>
              {post.author.name}
            </MetaItem>
            <MetaItem>
              <i className="fas fa-calendar"></i>
              {post.publishedAt}
            </MetaItem>
            <MetaItem>
              <i className="fas fa-clock"></i>
              {post.readTime}
            </MetaItem>
            <MetaItem>
              <i className="fas fa-eye"></i>
              {post.views} مشاهدة
            </MetaItem>
          </PostMeta>
        </PostHeader>

        <PostImage>{post.image}</PostImage>

        <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

        <PostActions>
          <ActionButtons>
            <ActionButton liked={liked} onClick={handleLike}>
              <i className={`fas ${liked ? 'fa-heart' : 'fa-heart-o'}`}></i>
              {likesCount} إعجاب
            </ActionButton>
            
            <ActionButton>
              <i className="fas fa-bookmark"></i>
              حفظ
            </ActionButton>
          </ActionButtons>

          <ShareButtons>
            <ShareButton 
              className="facebook" 
              onClick={() => handleShare('Facebook')}
              title="مشاركة على Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </ShareButton>
            
            <ShareButton 
              className="twitter" 
              onClick={() => handleShare('Twitter')}
              title="مشاركة على Twitter"
            >
              <i className="fab fa-twitter"></i>
            </ShareButton>
            
            <ShareButton 
              className="linkedin" 
              onClick={() => handleShare('LinkedIn')}
              title="مشاركة على LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </ShareButton>
            
            <ShareButton 
              className="whatsapp" 
              onClick={() => handleShare('WhatsApp')}
              title="مشاركة على WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </ShareButton>
          </ShareButtons>
        </PostActions>

        <AuthorSection>
          <AuthorAvatar>{post.author.avatar}</AuthorAvatar>
          <AuthorInfo>
            <AuthorName>{post.author.name}</AuthorName>
            <AuthorBio>{post.author.bio}</AuthorBio>
            <AuthorStats>
              <span>{post.author.postsCount} مقال</span>
              <span>{post.author.followersCount} متابع</span>
            </AuthorStats>
          </AuthorInfo>
        </AuthorSection>

        <CommentsSection>
          <CommentsHeader>
            <CommentsTitle>التعليقات ({post.comments})</CommentsTitle>
          </CommentsHeader>

          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentTextarea
              placeholder="اكتب تعليقك هنا..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <CommentSubmitButton type="submit">
              إرسال التعليق
            </CommentSubmitButton>
          </CommentForm>
        </CommentsSection>
      </motion.div>
    </PostContainer>
  );
}

export default Post;
