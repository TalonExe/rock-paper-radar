import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => (
  <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <figure className="relative h-48">
      <img src={post.blogPicture} alt={post.blogTitle} className="w-full h-full object-cover" />
    </figure>
    <div className="card-body p-4">
      <h2 className="card-title text-xl font-bold mb-2 text-gray-800">{post.blogTitle}</h2>
      <p className="text-gray-600 mb-4">
        {post.blogContent.length > 50
          ? `${post.blogContent.substring(0, 50)}...`
          : post.blogContent}
      </p>
      <div className="card-actions justify-end">
        <Link
          to={`/blogs/${post.id}`}
          className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  </div>
);

export default BlogCard;