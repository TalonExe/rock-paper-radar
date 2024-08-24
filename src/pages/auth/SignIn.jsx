import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useNavigate } from 'react-router-dom';
import userStore from '../../stores/userStore';

const SignIn = () => {
    const signInForm = useForm();
    const signIn = userStore(state => state.signIn);
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        try {
            await signIn(formData);
            navigate('/user/profile');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-full h-screen flex items-start ">
            {/* side pic */}
            <div className="relative w-full h-full flex flex-col ">
                <div className="bg-sign-in-bg w-full h-full bg-cover bg-no-repeat"></div>
            </div>
            {/* login form */}
            <FormProvider {...signInForm}>
                <form className="w-1/2 h-full bg-white flex flex-col p-20 justify-center items-center" onSubmit={signInForm.handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col max-w-[300px]">
                        <div className="w-full flex flex-col mb-2">
                            <h3 className="text-5xl font-bold mb-4 text-black">Welcome</h3>
                            <p className="text-base mb-2 text-black">Sign into your account</p>
                        </div>
                        <div className="w-full flex flex-col">
                            <div className='flex justify-between w-full mt-2'>
                                <p className="text-base text-black">Username</p>
                                <ErrorMessage errors={signInForm.formState.errors} name="username" as="p" className="text-red-600" />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2 autofill:bg-[#EDE8F5] autofill:text-black"
                                {...signInForm.register("username", { required: "*required" })}
                            />
                            <div className='flex justify-between w-full mt-2'>
                                <p className="text-base text-black">Password</p>
                                <ErrorMessage errors={signInForm.formState.errors} name="password" as="p" className="text-red-600" />
                            </div>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2 autofill:bg-[#EDE8F5] autofill:text-black"
                                {...signInForm.register("password", { required: "required" })}
                            />
                        </div>
                        <div className="w-full flex flex-col my-6">
                            <button type='submit' className="w-full text-white my-2 bg-[#7091E6] font-semibold rounded-md p-2 text-center flex items-center justify-center cursor-pointer hover:bg-[#7091E6] active:bg-[#7091E6]/50 focus:outline-none">
                                Sign In
                            </button>
                            <div className="w-full flex items-center justify-center py-2 my-4">
                                <div className="w-full h-[1px] bg-black/40"></div>
                                <p className="text-xs absolute text-black/80 bg-white px-2">
                                    {"Don't Have An Account?"}
                                </p>
                            </div>
                            <Link to="/auth/signup" className="w-full text-[#7091E6] my-2 bg-white font-semibold border-2 border-[#7091E6] rounded-md p-2 text-center flex items-center justify-center hover:bg-[#7091E6]/50 active:bg-[#7091E6]/50">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default SignIn;