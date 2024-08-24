import { useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';


const BottomBar = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className='flex flex-col bg-white justify-start border-solid border-b-2 border-x-2 h-[100%] pt-4 items-stretch flex-grow'>
      <div className='flex flex-row justify-between items-center px-8'>
        <span className="text-xl">Description</span>
        <ErrorMessage errors={errors} name="blogDescription" as="p" className="text-red-600" />
        <button type='submit' className="btn text-white bg-[#7091E6]">Publish</button>
      </div>
      <textarea
        name="blogDescription"
        className="textarea bg-[#E6E6E6] mx-8 my-4 h-full flex-grow resize-none"
        placeholder="Type a description"
        {...register("postDescription", { required: "*required" })}
      >
      </textarea>
    </div>
  )
}

export default BottomBar