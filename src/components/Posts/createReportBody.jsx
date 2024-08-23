import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'


const CreateReportBody = ({id}) => {
    const { register, formState: { errors }, getValues } = useFormContext();
    const createpostreport = userStore((state) => state.createpostreport);
    
    return (
        <div className="w-full flex flex-col max-w-[300px]">
            <div className="w-full flex flex-col">
            <div className='flex justify-between w-full mt-2'>
                    <p className="text-base">Report Content</p>
                    <ErrorMessage errors={errors} reportContent="Report Content" as="p" className="text-red-600" />
            </div>
            <input
                    type="text"
                    placeholder="Enter Report Content"
                    className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                    {...register("reportContent", { required: "*required" })}
            />
            <button className="flex items-center mr-6" aria-label="Submit"
                    onClick={() => {
                        const reportContent = getValues("reportContent");
                        createpostreport(id, reportContent);
                    }} >Submit</button>
            </div>
        </div>
    )
}   

export default CreateReportBody