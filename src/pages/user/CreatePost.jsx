import UserLayout from '../../components/layouts/UserLayout'
import Header from '../../components/layouts/Header'
import CreatePostBody from '../../components/layouts/CreatePostBody'
import BackButton from '../../components/navigation/BackButton'

const CreatePost = () => {
    return (
        <UserLayout>
            <Header className="flex flex-row items-center gap-6">
                <BackButton to="/user/profile"/>
                <span className='text-2xl'><b>Write Posts</b></span>
            </Header>
            <CreatePostBody />
        </UserLayout>
    )
}

export default CreatePost