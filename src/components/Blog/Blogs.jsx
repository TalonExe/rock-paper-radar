import BlogCard from "./BlogCard"
import bg from "../../assets/images/Wavy-pic.jpg"

const Blogs = () => {
  const dummyData = [{
    id: 1,
    image: bg,
    title: "the walk of faith",
    description: "lorem ipsum dfe efsfdafasfa sdfas fsafsdfas dssdfsf",
    username: "Lucas Monroe",
    date: "12/3/2028",
    tags: ["Fashion", "Bitcoin", "Macademia", "Sunshine", "Rainbows"],
    link: ""
}, {
    id: 2,
    image: bg,
    title: "the walk ofsffs faith",
    description: "lorem ipsum dfe efsfdafasfa sdfas fsafsdfas dssdfsf",
    username: "Lucas Monroe",
    date: "12/3/2028",
    tags: ["Fashion", "Bitcoin", "Macademia", "Sunshine", "Rainbows"],
    link: ""
}, {
    id: 3,
    image: bg,
    title: "the walk of sdfsdafsdfsdf",
    description: "lorem ipsum dfe efsfdafasfa sdfas fsafsdfas dssdfsf",
    username: "Lucas Monroe",
    date: "12/3/2028",
    tags: ["Fashion", "Bitcoin", "Macademia", "Sunshine", "Rainbows"],
    link: ""
},
]


return (
    <div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 bg-opacity-50 '>
            {dummyData.map(({ id, image, title, description, username, date, tags, link }) => {
                return (<BlogCard
                    key={id}
                    image={image}
                    title={title}
                    description={description}
                    username={username}
                    date={date}
                    tags={tags}
                    link={link}
                    hoverable
                />)
            }

            )}
        </div>
    </div>

)
}

export default Blogs
