import FileInput from "../ui/FileInput"
import Select from "../ui/BadgeSelect"
import Badge from "../ui/Badge"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'

const MiddleBar = () => {
    const [badges, setBadges] = useState([]);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const {register, formState:{errors}} = useFormContext();
    useEffect(() => {
        register("postPic", {
            onChange: (event) => {
                setImg(URL.createObjectURL(event.target.files[0]));
                setImgName(event.target.files[0].name);
            }
        });
    }, []);
    return (
    <div className='flex flex-row border-solid border-2'>
                <div className='flex flex-col bg-white items-center px-8 py-4 border-solid border-r-2'>
                    <span className="text-lg mb-8">Add Pictures</span>
                    <FileInput />
                    <ErrorMessage errors={errors} name="postPic" as="p" className="text-red-600" />
                </div>
                <div className='flex flex-col w-full bg-white items-start px-8 py-4 border-solid border-r-2'>
                    <span className="text-lg mb-8">Uploaded Picture</span>
                    <div className='flex flex-row items-center'>
                        <div className="avatar mr-4">
                            <div className="w-20 rounded">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <span>{imgName}</span>
                    </div>
                </div>
                <div className=" flex flex-col bg-white w-full">
                    <span className="text-lg mb-8 px-8 pt-4">Tags</span>
                    <div className="flex flex-row px-8 pt-2">
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
