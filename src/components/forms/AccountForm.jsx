import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const AccountForm = () => {
    const { register, formState: { errors }, watch } = useFormContext();
    return (
        <div className="w-full flex flex-col max-w-[300px]">
            <div className="w-full flex flex-col">
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Email</p>
                    <ErrorMessage errors={errors} name="email" as="p" className="text-red-600" />
                </div>
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("email", { required: "*required" })}
                />
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Password</p>
                    <ErrorMessage errors={errors} name="password" as="p" className="text-red-600" />
                </div>
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("password", { 
                        required: "*required",
                        minLength: {
                            value: 8,
                            message: "Password must be between 8 and 16 characters long"
                        },
                        maxLength: {
                            value: 16,
                            message: "Password must be between 8 and 16 characters long"
                        }
                    })}
                />
                <div className="flex justify-between w-full mt-2">
                    <p className="text-base text-black">Re-enter Password</p>
                    <ErrorMessage errors={errors} name="confirmPassword" as="p" className="text-red-600" />
                </div>
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("confirmPassword", {
                        required: "*required",
                        validate: (val) => {
                            if (watch('password') != val) {
                                return "*Passwords do not match";
                            }
                        }
                    })}
                />
            </div>
        </div>
    );
};

export default AccountForm;