import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import mainAxios from '../../api/mainAxios'
import storage from '../../config/firebaseConfig'
import Cookies from 'js-cookie'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import userStore from '../../stores/userStore';
import AccountForm from './AccountForm';
import PersonalForm from './PersonalForm';
import ProfileForm from './ProfileForm';

const MultiForm = () => {
    const setUsername = userStore((state) => state.setUsername);
    const signUpForm = useForm();
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        try {
            const {
                gender,
                birthDate,
                country,
                phoneNumber,
                email,
                password,
                confirmPassword,
                username,
                profilePicture,
                description
            } = formData;

            const image = profilePicture[0];
            const storageRef = ref(storage, `profilePictures/${new Date().toUTCString() + image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', null, (error) => {
                console.log(error);
            }, async () => {
                try {
                    const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    const response = await mainAxios.post('/user/register', {
                        username,
                        password,
                        confirmPassword,
                        email,
                        birthDate,
                        gender,
                        country,
                        phoneNumber,
                        profileDescription: description,
                        profilePictureUrl: imageUrl
                    });
                    const { data, accessToken } = response.data;
                    Cookies.set('token', accessToken, { expires: 30, path: '/' });
                    Cookies.set('username', data.username, { expires: 30, path: '/' });
                    Cookies.set('profilePictureUrl', data.profilePictureUrl, { expires: 30, path: '/' });
                    setUsername(data.username);
                    navigate('/user/profile');
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const [page, setPage] = useState(1);

    const FormTitles = ["Sign Up", "Personal Information", "User Profile"];

    const PageDisplay = () => {
        if (page === 1) {
            return <AccountForm />;
        } else if (page === 2) {
            return <PersonalForm />;
        } else if (page === 3) {
            return <ProfileForm />;
        }
    }
    return (
        <FormProvider {...signUpForm}>
            <form className='w-full h-full p-20 flex flex-col justify-center items-center' onSubmit={signUpForm.handleSubmit(onSubmit)}>
                <div className='flex flex-col justify-center items-center w-fit bg-white rounded-md p-12'>
                    <div className="w-full flex flex-col justify-center items-center mb-2 pt-6">
                        <h3 className="text-center text-black text-4xl font-bold mb-4">{FormTitles[page - 1]}</h3>
                        <p className="text-base text-black font-light mt-1 mb-2">Step {page} of {FormTitles.length}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full mb-8'>
                        {PageDisplay()}
                    </div>
                    <div className='w-full flex flex-row justify-center gap-20'>
                        <Link className='btn min-w-28 bg-[#7091E6] text-white border-2 border-[#7091E6] hover:bg-[#5A7AD1] hover:border-[#5A7AD1] transition-colors duration-300' onClick={() => {
                            setPage((currPage) => currPage - 1)
                        }} disabled={page === 1}>
                            Previous
                        </Link>
                        {
                            page === FormTitles.length ?
                                <input
                                    type='submit'
                                    className='btn max-w-28 bg-[#7091E6] text-white border-2 border-[#7091E6] hover:bg-[#5A7AD1] hover:border-[#5A7AD1] transition-colors duration-300'
                                    value='Submit' /> :
                                <a
                                    className='btn min-w-28 bg-[#7091E6] text-white border-2 border-[#7091E6] hover:bg-[#5A7AD1] hover:border-[#5A7AD1] transition-colors duration-300'
                                    onClick={() => {
                                        if (page < 3) {
                                            signUpForm.trigger().then((res) => res ? setPage((currPage) => currPage + 1) : setPage(page))
                                        }
                                    }}
                                >Next</a>
                        }
                    </div>
                    <div className="max-w-[300px] w-full flex flex-col items-center my-6">
                        <div className="w-full flex items-center justify-center py-2 my-4">
                            <div className="w-full h-[1px] bg-black/40"></div>
                            <p className="text-xs absolute text-black/80 bg-white px-2">
                                Already Have An Account?
                            </p>
                        </div>
                        <Link to='/auth/signin' className="w-full text-[#7091E6] my-2 bg-white font-semibold border-2 border-[#7091E6] rounded-md p-2 text-center flex items-center justify-center hover:bg-[#5A7AD1] hover:border-[#5A7AD1] transition-colors duration-300">
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </FormProvider>

    )
}

export default MultiForm