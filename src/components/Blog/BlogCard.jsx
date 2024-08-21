import { Link } from "react-router-dom"
import ReadMore from "../ui/ReadMore"
import Dropdown from "../ui/Dropdown"
import DeleteBlogModal from "./DeleteBlogModal"
import EditBlogModal from "./EditBlogModal"

const BlogCard = ({blogId, image, title, description}) => {

    const items = [
        {
            label: "Edit Blog",
            action: () => document.getElementById(`editBlog${blogId}`).showModal(),
            modal: <DeleteBlogModal
                        blogId={blogId}
                    />
        },
        {
            label: "Delete Blog",
            action: () => document.getElementById(`deleteBlog${blogId}`).showModal(),
            modal: <EditBlogModal
                        blogId={blogId}
                    />
        },
    ]

  return (
            <div className="card bg-base-100 mx-8 mt-4 shadow-xl max-h-[500px]">    
            <Link to="/admin/blog-view">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                </Link>
                <div className="card-body flex flex-col">
                    <div className="flex justify-between">
                       <h2 className="card-title">
                        {title}
                    </h2> 
                        <Dropdown
                            items={items}
                        />
                    </div>
                    
                    <ReadMore>{description}</ReadMore>
                </div>
            </div>
        
  )
}

export default BlogCard
