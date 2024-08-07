import FileInput from "../ui/FileInput"
import Select from "../ui/BadgeSelect"
import Badge from "../ui/Badge"
import Lucas from "../../assets/images/Lucas.jpg"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'

const MiddleBar = () => {
    const [badges, setBadges] = useState([])
    const {formState:{errors}} = useFormContext()

    return (
    <div className='flex flex-row border-solid border-2'>
                <div className='flex flex-col bg-white items-center px-8 py-4 border-solid border-r-2'>
                    <span className="text-lg mb-8">Add Pictures</span>
                    <FileInput />
                    <ErrorMessage errors={errors} name="postPic" as="p" className="text-red-600" />
                </div>
                <div className='flex flex-col w-full bg-white items-start px-8 py-4 border-solid border-r-2'>
                    <span className="text-lg mb-8">Upload Pictures</span>
                    <div className='flex flex-row items-center'>
                        <div className="avatar mr-4">
                            <div className="w-16 rounded">
                                <img src={Lucas} alt="" />
                            </div>
                        </div>

                        <span>Image.jpg</span>
                    </div>
                </div>
                <div className=" flex flex-col bg-white w-full">
                    <div className="flex flex-row px-8 py-4">
                        <Select
                            badges={badges}
                            setBadges={setBadges}
                        />
                    </div>
                    <div className="px-8 py-4">
                        {
                            badges.map((categories) => {
                                return <Badge key={categories} category={categories} />
                            })
                        }
                        
                    </div>
                </div>
            </div>
  )
}

export default MiddleBar
