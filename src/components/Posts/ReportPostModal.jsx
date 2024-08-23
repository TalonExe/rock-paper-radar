import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import userStore from "../../stores/userStore";

const ReportPostModal = ({ id }) => {
  const { register, formState: { errors }, getValues } = useForm();
  const createpostreport = userStore((state) => state.createPostReport);

  const handleReport = () => {
    createpostreport(id, getValues("reportContent"));
    document.getElementById(`reportPostModal${id}`).close();
  };

  return (
    <>
      <dialog id={`reportPostModal${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning!!!</h3>
          <p className="py-4">Precaution: please do not simply report post or we will take action on you as well for misconduct.</p>
          <div className="modal-action">
            <div className='flex flex-col w-full'>
              <div className='flex w-full mt-2'>
                <p className="text-base w-full">Report Content :</p>
                <ErrorMessage errors={errors} name="reportContent" as="p" className="text-red-600" />
                <input
                  type="text"
                  placeholder="Enter Report Content"
                  className="pl-2 w-full h-10 text-black py-2 my-2 bg-[#EDE8F5] rounded-md border border-[#7091E6] outline-none focus:border-2"
                  {...register("reportContent", { required: "*required" })}
                />
              </div>
              <div className='flex justify-between w-full mt-2'>
                <button className="btn bg-red-600 text-white" onClick={handleReport}>Report</button>
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ReportPostModal