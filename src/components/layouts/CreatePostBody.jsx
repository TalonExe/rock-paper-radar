import { FormProvider, useForm } from 'react-hook-form'
import TopBar from '../ui/TopBar'
import MiddleBar from '../ui/MiddleBar'
import BottomBar from '../ui/BottomBar'
import storage from '../../config/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import userStore from '../../stores/userStore'
import mainAxios from '../../api/mainAxios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const CreatePostBody = () => {
    const navigate = useNavigate();
    const username = userStore((state) => state.username);
    const writePostForm = useForm({
        defaultValues: {
            postTitle: '',
            postLocation: '',
            postPic: null,
            categories: [],
            postDescription: ''
        }
    });

    const onSubmit = async (data) => {
        const {
            postPic,
            postTitle,
            postLocation,
            categories,
            postDescription
        } = data;
        if (categories.length > 0 && postPic) {
            const image = postPic[0];
            const storageRef = ref(storage, `userPosts/${username}/${new Date().toUTCString() + image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', null, (error) => {
                console.log(error);
            }, async () => {
                try {
                    const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    await mainAxios.post('/travelPost', {
                        pictureUrl: imageUrl,
                        postTitle,
                        postLocation,
                        categories,
                        postDescription
                    }, {
                        headers: {
                            authorization: Cookies.get('token'),
                        }
                    });
                    navigate('/user/profile');
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            console.log("Please select a category and upload an image");
        }
    }

    return (
        <FormProvider {...writePostForm}>
            <form className='flex flex-col w-full h-full items-stretch flex-grow' onSubmit={writePostForm.handleSubmit(onSubmit)}>
                <TopBar />
                <MiddleBar />
                <BottomBar />
            </form>
        </FormProvider>
    )
}

export default CreatePostBody