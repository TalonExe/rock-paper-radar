import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import Input from '../fields/Input'
import SearchInput from '../fields/SearchInput'
import BadgeSelect from '../fields/BadgeSelect'
import userStore from '../../stores/userStore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import storage from '../../config/firebaseConfig'

const EditPlanModal = ({ id, planTitle, tags, pictureUrl, location, duration }) => {
    const [badges, setBadges] = useState(tags.map(tag => tag.name) || []);
    const [_, setImg] = useState(pictureUrl || null);
    const [imgName, setImgName] = useState("");
    const [currentLocation, setCurrentLocation] = useState(location || "");
    const [imagePreview, setImagePreview] = useState(pictureUrl || null);

    const [hours, setHours] = useState(Math.floor(duration / 60));
    const [minutes, setMinutes] = useState(duration % 60);

    const planEditForm = useForm({
        defaultValues: {
            planTitle: planTitle || "",
            planPic: [],
            durationHours: hours,
            durationMinutes: minutes
        }
    });

    const editTravelPlan = userStore((state) => state.editTravelPlan);
    const getUserTravelPlans = userStore((state) => state.getUserTravelPlans);
    const username = userStore((state) => state.username);

    const onSubmit = async (data) => {
        try {
            const totalMinutes = (parseInt(data.durationHours) || 0) * 60 + (parseInt(data.durationMinutes) || 0);
            const updatedData = {
                title: data.planTitle,
                duration: totalMinutes,
                location: data.location,
                categories: badges,
                pictureUrl: pictureUrl
            };

            if (data.planPic && data.planPic.length > 0) {
                const image = data.planPic[0];
                const storageRef = ref(storage, `userPlans/${username}/${new Date().toUTCString() + imgName}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                
                await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', null, reject, async () => {
                        try {
                            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            updatedData.pictureUrl = imageUrl;
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }

            await editTravelPlan(id, updatedData);
            await getUserTravelPlans();
            document.getElementById(`editPlanModal${id}`).close();
        } catch (error) {
            console.error("Error updating plan:", error);
        }
    }

    const removeBadge = (badgeToRemove) => {
        setBadges(badges.filter(badge => badge !== badgeToRemove));
    };

    const handleModalClose = () => {
        planEditForm.reset();
        setBadges(tags.map(tag => tag.name) || []);
        setImg(pictureUrl || null);
        setImgName("");
        setCurrentLocation(location || "");
        setHours(Math.floor(duration / 60));
        setMinutes(duration % 60);
    };

    return (
        <FormProvider {...planEditForm}>
            <dialog id={`editPlanModal${id}`} className="modal" onClose={handleModalClose}>
                <div className="modal-box w-11/12 max-w-6xl h-5/6 overflow-y-auto p-8 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                    </form>
                    <form className='flex flex-col space-y-8' onSubmit={planEditForm.handleSubmit(onSubmit)}>
                        <h3 className='text-3xl font-bold text-center mb-6'>Edit Travel Plan</h3>

                        <div className='bg-gray-100 p-6 rounded-lg'>
                            <h4 className='text-xl font-semibold mb-4'>Basic Information</h4>
                            <div className='flex justify-between items-center'>
                                <div className='w-1/2'>
                                    <Input
                                        type="text"
                                        left="Title"
                                        placeholder="Enter Title"
                                        registerInput="planTitle"
                                        required="*required"
                                        inputValue={planTitle}
                                    />
                                </div>
                                <div className='w-1/2 flex items-center justify-end gap-10'>
                                    <span className="text-lg font-medium mr-4">{currentLocation}</span>
                                    <SearchInput setLocation={setCurrentLocation} required={false}/>
                                </div>
                            </div>
                        </div>

                        <div className='bg-gray-100 p-6 rounded-lg'>
                            <h4 className='text-xl font-semibold mb-4'>Picture</h4>
                            <div className='flex flex-col md:flex-row gap-12'>
                                <div className='w-full md:w-1/2 space-y-2'>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...planEditForm.register("planPic", {
                                            onChange: (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setImagePreview(reader.result);
                                                        setImgName(file.name);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }
                                        })}
                                        className="file-input file-input-bordered w-full"
                                    />
                                </div>
                                <div className='w-full md:w-1/2 space-y-2'>
                                    <div className='flex items-center space-x-4'>
                                        <div className="avatar">
                                            <div className="w-24 h-24 rounded">
                                                {imagePreview && <img src={imagePreview} alt="Uploaded preview" className="w-full h-full object-cover" />}
                                            </div>
                                        </div>
                                        <span className="text-sm">{imgName || "No image selected"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-gray-100 p-6 rounded-lg'>
                            <h4 className='text-xl font-semibold mb-4'>Tags</h4>
                            <BadgeSelect badges={badges} setBadges={setBadges} />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {badges.map((badge, index) => (
                                    <div key={index} className="badge badge-outline bg-[#EDE8F5] text-[#7091E6] mr-4 mb-2">
                                        {badge}
                                        <button onClick={() => removeBadge(badge)} className="ml-2 text-xs font-bold">
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='bg-gray-100 p-6 rounded-lg'>
                            <h4 className='text-xl font-semibold mb-4'>Duration</h4>
                            <div className="flex space-x-4">
                                <Input
                                    left="Hours"
                                    placeholder="Enter Hours"
                                    registerInput="durationHours"
                                    type="number"
                                    inputValue={hours}
                                />
                                <Input
                                    left="Minutes"
                                    placeholder="Enter Minutes"
                                    registerInput="durationMinutes"
                                    type="number"
                                    inputValue={minutes}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn bg-[#7091E6] w-full mt-6 text-white' onClick={() => planEditForm.handleSubmit(onSubmit)()}>Submit</button>
                    </form>
                </div>
            </dialog>
        </FormProvider>
    )
}

export default EditPlanModal