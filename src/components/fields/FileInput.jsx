import { useFormContext } from "react-hook-form"

const FileInput = ({ onChange }) => {
    const { register } = useFormContext();
    return (
        <div className="flex items-center justify-center">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                <div className="flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                </div>
                <input 
                    id="dropzone-file" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    {...register("postPic", { 
                        required: "*required",
                        onChange: (e) => {
                            if (e.target.files && e.target.files[0]) {
                                onChange(e);
                            }
                        }
                    })} 
                />
            </label>
        </div>
    )
}

export default FileInput