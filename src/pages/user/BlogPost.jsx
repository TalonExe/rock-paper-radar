import HorizontalNavbar from "../../components/layouts/HorizontalNavbar";
import userStore from "../../stores/userStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/layouts/Footer";

const BlogPost = () => {
    const { id } = useParams();
    const blog = userStore((state) => state.blog);
    const getBlogById = userStore((state) => state.getBlogById);
    useEffect(() => {
        getBlogById(id);
    }, [id]);

    if (!blog) {
        return (
            <div className="bg-gray-800 min-h-screen min-w-screen flex items-center justify-center">
                <HorizontalNavbar />
                <p className="text-white text-2xl">Blog post not found or still loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen min-w-screen">
            <HorizontalNavbar />
            <article className="max-w-4xl mx-auto px-4 py-8 bg-gray-700 shadow-lg rounded-lg mt-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">{blog.blogTitle}</h1>
                    <div className="flex items-center justify-between text-white">
                        <span>By Rock Paper Radar Editor Team</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                </header>
                <img src={blog.blogPicture} alt={blog.blogTitle} className="w-full h-96 object-cover rounded-lg mb-8" />
                <div className="prose prose-lg max-w-none text-white">
                    <p>{blog.blogContent}</p>
                </div>
            </article>
            <Footer />
        </div>
    )
}

export default BlogPost;