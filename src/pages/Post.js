import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PostCategory = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PostImage = styled.div`
  height: 400px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.secondary}20);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const PostContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;

  h2 {
    color: ${props => props.theme.colors.text};
    margin: 2rem 0 1rem;
    font-size: 1.75rem;
  }

  h3 {
    color: ${props => props.theme.colors.text};
    margin: 1.5rem 0 0.75rem;
    font-size: 1.5rem;
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
    font-size: 0.875rem;
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
  gap: 1rem;
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.liked ? props.theme.colors.error : 'transparent'};
  color: ${props => props.liked ? 'white' : props.theme.colors.text};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const CommentsTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const CommentForm = styled.form`
  background: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
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

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Comment = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const CommentDate = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const CommentContent = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });

  // Mock data for demonstration
  const mockPost = {
    id: parseInt(id),
    title: 'مستقبل الذكاء الاصطناعي في تطوير الويب',
    category: 'technology',
    author: 'أحمد محمد',
    date: '2024-01-15',
    readTime: '5 دقائق',
    image: '🤖',
    content: `
      <p>في عالم يتطور بسرعة البرق، أصبح الذكاء الاصطناعي (AI) أحد أهم التقنيات التي تشكل مستقبل تطوير الويب. من التطبيقات البسيطة إلى الأنظمة المعقدة، يغير الذكاء الاصطناعي الطريقة التي نطور بها ونفكر بها في التطبيقات الرقمية.</p>

      <h2>التطورات الحديثة في الذكاء الاصطناعي</h2>
      
      <p>شهدنا في السنوات الأخيرة تطورات مذهلة في مجال الذكاء الاصطناعي، خاصة في مجالات معالجة اللغة الطبيعية (NLP) والتعلم الآلي (Machine Learning). هذه التطورات فتحت آفاقاً جديدة لتطوير تطبيقات ويب أكثر ذكاءً وفعالية.</p>

      <h3>أهم التطبيقات الحالية</h3>
      
      <ul>
        <li><strong>المساعدات الذكية:</strong> مثل ChatGPT وClaude التي تساعد المطورين في كتابة الكود</li>
        <li><strong>التوليد التلقائي للمحتوى:</strong> إنشاء نصوص وصور ومقاطع فيديو تلقائياً</li>
        <li><strong>التخصيص الذكي:</strong> تخصيص تجربة المستخدم بناءً على سلوكه وتفضيلاته</li>
        <li><strong>التحليل التنبؤي:</strong> توقع سلوك المستخدمين وتحسين الأداء</li>
      </ul>

      <blockquote>
        "الذكاء الاصطناعي ليس مجرد تقنية جديدة، بل هو تحول جذري في طريقة تفكيرنا في حل المشاكل وتطوير الحلول."
      </blockquote>

      <h2>التحديات والفرص</h2>
      
      <p>رغم الإمكانيات الهائلة للذكاء الاصطناعي، إلا أن هناك تحديات يجب مواجهتها:</p>

      <h3>التحديات</h3>
      <ul>
        <li>الحاجة إلى بيانات عالية الجودة</li>
        <li>التكاليف المرتفعة للحوسبة</li>
        <li>مخاوف الخصوصية والأمان</li>
        <li>الحاجة إلى خبراء متخصصين</li>
      </ul>

      <h3>الفرص</h3>
      <ul>
        <li>تحسين تجربة المستخدم بشكل كبير</li>
        <li>أتمتة المهام المتكررة</li>
        <li>اتخاذ قرارات أسرع وأدق</li>
        <li>إنشاء منتجات وخدمات مبتكرة</li>
      </ul>

      <h2>مستقبل تطوير الويب</h2>
      
      <p>في المستقبل القريب، نتوقع أن نرى:</p>
      
      <ol>
        <li><strong>التطوير بمساعدة الذكاء الاصطناعي:</strong> أدوات تساعد المطورين في كتابة كود أفضل وأسرع</li>
        <li><strong>التطبيقات الذكية:</strong> تطبيقات تفهم المستخدم وتتكيف مع احتياجاته</li>
        <li><strong>التخصيص المتقدم:</strong> تجارب مخصصة لكل مستخدم بشكل فريد</li>
        <li><strong>الأتمتة الكاملة:</strong> أتمتة معظم عمليات التطوير والصيانة</li>
      </ol>

      <p>الذكاء الاصطناعي يفتح آفاقاً جديدة لتطوير الويب، ويوفر فرصاً هائلة لإنشاء تطبيقات أكثر ذكاءً وفعالية. المطورون الذين يتبنون هذه التقنيات اليوم سيكونون في المقدمة غداً.</p>
    `
  };

  const mockComments = [
    {
      id: 1,
      author: 'محمد علي',
      date: '2024-01-16',
      content: 'مقال رائع! أتفق معك تماماً في أن الذكاء الاصطناعي سيغير مستقبل التطوير.'
    },
    {
      id: 2,
      author: 'فاطمة أحمد',
      date: '2024-01-16',
      content: 'شكراً لك على هذا التحليل الشامل. هل يمكنك كتابة مقال عن أفضل أدوات الذكاء الاصطناعي للمطورين؟'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPost(mockPost);
      setComments(mockComments);
      setLikes(42);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.content) {
      const comment = {
        id: comments.length + 1,
        author: newComment.name,
        date: new Date().toISOString().split('T')[0],
        content: newComment.content
      };
      setComments([comment, ...comments]);
      setNewComment({ name: '', email: '', content: '' });
    }
  };

  if (loading) {
    return (
      <PostContainer>
        <LoadingSpinner>جاري تحميل المقال...</LoadingSpinner>
      </PostContainer>
    );
  }

  if (!post) {
    return (
      <PostContainer>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>المقال غير موجود</h2>
          <Link to="/blog">العودة إلى المدونة</Link>
        </div>
      </PostContainer>
    );
  }

  return (
    <PostContainer>
      <PostHeader>
        <PostCategory>التكنولوجيا</PostCategory>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <span>بواسطة {post.author}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </PostMeta>
      </PostHeader>

      <PostImage>{post.image}</PostImage>

      <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

      <PostActions>
        <ActionButton liked={liked} onClick={handleLike}>
          {liked ? '❤️' : '🤍'} {likes} إعجاب
        </ActionButton>
        <ActionButton>
          📤 مشاركة
        </ActionButton>
        <ActionButton>
          🔖 حفظ
        </ActionButton>
      </PostActions>

      <CommentsSection>
        <CommentsTitle>التعليقات ({comments.length})</CommentsTitle>
        
        <CommentForm onSubmit={handleCommentSubmit}>
          <FormGroup>
            <Label htmlFor="name">الاسم *</Label>
            <Input
              type="text"
              id="name"
              value={newComment.name}
              onChange={(e) => setNewComment({...newComment, name: e.target.value})}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              type="email"
              id="email"
              value={newComment.email}
              onChange={(e) => setNewComment({...newComment, email: e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">التعليق *</Label>
            <TextArea
              id="content"
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">إرسال التعليق</SubmitButton>
        </CommentForm>

        <CommentsList>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>{comment.date}</CommentDate>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </Comment>
          ))}
        </CommentsList>
      </CommentsSection>
    </PostContainer>
  );
};

export default Post;
