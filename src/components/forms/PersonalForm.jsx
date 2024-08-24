import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import countriesList from '../../utils/countriesList';

const PersonalForm = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className="w-full flex flex-col max-w-[300px]">
            <div className="w-full flex flex-col">
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Birth Date</p>
                    <ErrorMessage errors={errors} name="birthDate" as="p" className="text-red-600" />
                </div>
                <input
                    type="date"
                    className="placeholder: pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2 [color-scheme:light]"
                    {...register("birthDate", { required: "*required" })}
                />
                <p className="text-base text-black mt-1">Gender</p>
                <div className='flex flex-row gap-8'>
                    <div className="flex flex-row">
                        <label className="label justify-start gap-4 cursor-pointer">
                            <input type="radio" name="radio-10" className="radio checked:bg-blue-500" defaultChecked value="male"
                                {...register("gender")}
                            />
                            <span className="label-text text-black">Male</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label justify-start gap-4 cursor-pointer">
                            <input type="radio" name="radio-10" className="radio checked:bg-red-500" defaultChecked value="female"
                                {...register("gender")}
                            />
                            <span className="label-text text-black">Female</span>
                        </label>
                    </div>
                </div>
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Country</p>
                    <ErrorMessage errors={errors} name="country" as="p" className="text-red-600" />
                </div>
                <select
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("country", { required: "Country is required" })}
                >
                    <option value="">Select a country</option>
                    {countriesList.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
                <div className='flex justify-between w-full mt-2'>
                    <p className="text-base text-black">Phone Number</p>
                    <ErrorMessage errors={errors} name="phoneNumber" as="p" className="text-red-600" />
                </div>
                <input
                    type="text"
                    placeholder="Enter Number (e.g., +1-1234567890)"
                    className="placeholder: pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+\d{1,3}-\d+$/,
                            message: "Phone number must be in the format: +[country code]-[number]"
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default PersonalForm