import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const ProfileForm = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className="w-full flex flex-col max-w-[300px] justify-center items-center">
            <div className="w-full flex flex-col">
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Username</p>
                    <ErrorMessage errors={errors} name="username" as="p" className="text-red-600" />
                </div>
                <input
                    type="text"
                    placeholder="Enter Username"
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 4,
                            message: "Username must be at least 4 characters long"
                        },
                        maxLength: {
                            value: 10,
                            message: "Username must not exceed 10 characters"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: "Username can only contain letters, numbers, and underscores"
                        }
                    })}
                />
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Profile Picture</p>
                    <ErrorMessage errors={errors} name="profilePicture" as="p" className="text-red-600" />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="my-2"
                    {...register("profilePicture", {
                        required: "Profile picture is required",
                        validate: {
                            fileSize: (files) => files[0]?.size < 5000000 || "File size must be less than 5MB",
                            fileType: (files) => 
                                ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) || 
                                "File must be JPEG, PNG, or GIF"
                        }
                    })}
                />
                <div className="flex justify-between w-full mt-2">
                    <p className="text-base text-black">Description</p>
                    <ErrorMessage errors={errors} name="description" as="p" className="text-red-600" />
                </div>
                <textarea
                    placeholder="Enter Description"
                    rows="4"
                    cols="8"
                    name="description"
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("description", {
                        required: "Description is required",
                        maxLength: {
                            value: 50,
                            message: "Description must not exceed 50 characters"
                        }
                    })}
                >
                </textarea>
            </div>
        </div>
    )
};

export default ProfileForm;