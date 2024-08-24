import HorizontalNavbar from '../../components/layouts/HorizontalNavbar';
import BlogCard from '../../components/ui/BlogCard';
import userStore from '../../stores/userStore';
import { useEffect } from 'react';

const BlogPage = () => {
  const blogPosts = userStore((state) => state.blogPosts);
  const getBlogPosts = userStore((state) => state.getBlogPosts);
  useEffect(() => {
    getBlogPosts();
  }, []);
  return (
    <div className='bg-gray-800 min-h-screen'>
      <HorizontalNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Rock Paper Radar Travel Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts?.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;