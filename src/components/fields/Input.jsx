import { useFormContext } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'

const Input = ({ left = "", placeholder = "", registerInput = "", required = "", inputValue = "", type = "text" }) => {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="form-control w-full max-w-md">
            <div className='flex justify-between w-full mb-2'>
                <p className="label-text">{left}</p>
                <ErrorMessage errors={errors} name={registerInput} as="p" className="text-red-600" />
            </div>
            <label className="input input-bordered flex items-center gap-2">
                <input type={type} className="grow" placeholder={placeholder} {...register(registerInput, { required: required })} defaultValue={inputValue} />
            </label>
        </div>
    )
}

export default Input