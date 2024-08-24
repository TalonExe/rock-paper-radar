import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../fields/Input";
import BadgeSelect from "../fields/BadgeSelect";
import Badge from "../ui/Badge";
import SearchInput from "../fields/SearchInput";
import { ErrorMessage } from "@hookform/error-message";
import userStore from "../../stores/userStore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../config/firebaseConfig';

const CreateTravelPlanModal = () => {
    const travelCardForm = useForm();
    travelCardForm.register("durationHours", {
        validate: (value) => {
            const hours = parseInt(value) || 0;
            const minutes = parseInt(travelCardForm.getValues("durationMinutes")) || 0;
            return (hours > 0 || minutes > 0) || "Duration must be greater than 0";
        }
    });

    travelCardForm.register("durationMinutes", {
        validate: (value) => {
            const minutes = parseInt(value) || 0;
            const hours = parseInt(travelCardForm.getValues("durationHours")) || 0;
            return (hours > 0 || minutes > 0) || "Duration must be greater than 0";
        }
    });
    travelCardForm.register("tags", {
        validate: (value) => selectedTags.length > 0 || "At least one tag is required"
    });
    const [selectedTags, setSelectedTags] = useState([]);
    const [location, setLocation] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const createTravelPlan = userStore((state) => state.postTravelPlan);
    const getUserTravelPlans = userStore((state) => state.getUserTravelPlans);
    const username = userStore((state) => state.username);

    const onSubmit = async (data) => {
        try {
            const hours = parseInt(data.durationHours) || 0;
            const minutes = parseInt(data.durationMinutes) || 0;
            const durationInMinutes = hours * 60 + minutes;

            let imageUrl = '';
            if (data.image && data.image[0]) {
                const image = data.image[0];
                const storageRef = ref(storage, `travelPlans/${username}/${new Date().toUTCString() + image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);

                await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', null, reject, async () => {
                        try {
                            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }

            const travelPlanData = {
                title: data.title,
                location: location,
                duration: durationInMinutes,
                tags: selectedTags,
                pictureUrl: imageUrl
            };

            await createTravelPlan(travelPlanData);
            await getUserTravelPlans();
            travelCardForm.reset();
            setSelectedTags([]);
            setLocation('');
            setImagePreview(null);
            document.getElementById('createTravelCardModal').close();
        } catch (error) {
            console.error("Error creating travel plan:", error);
        }
    };

    return (
        <FormProvider {...travelCardForm}>
            <dialog id="createTravelCardModal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Create New Travel Plan</h3>
                    <form onSubmit={travelCardForm.handleSubmit(onSubmit)} className="space-y-6 p-4">
                        {/* Basic Information Section */}
                        <div className="bg-gray-100 p-6 rounded-lg space-y-4">
                            <h4 className="text-xl font-semibold mb-4">Basic Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    left="Title"
                                    placeholder="Enter title"
                                    registerInput="title"
                                    required="Title is required"
                                />
                                <div>
                                    <SearchInput setLocation={setLocation} />
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-700">Selected Location:</p>
                                        <p className="text-base">{location || "No location selected"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Duration Section */}
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Duration</h4>
                            <div className="form-control w-full max-w-md space-y-2">
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Hours"
                                        className="input input-bordered w-1/2"
                                        min="0"
                                        {...travelCardForm.register("durationHours", { required: "Hours are required" })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Minutes"
                                        className="input input-bordered w-1/2"
                                        min="0"
                                        max="59"
                                        {...travelCardForm.register("durationMinutes", { required: "Minutes are required" })}
                                    />
                                </div>
                                <ErrorMessage
                                    errors={travelCardForm.formState.errors}
                                    name="durationHours"
                                    render={({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>}
                                />
                                <ErrorMessage
                                    errors={travelCardForm.formState.errors}
                                    name="durationMinutes"
                                    render={({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>}
                                />
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Upload Image</h4>
                            <div className="form-control w-full space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...travelCardForm.register("image", {
                                        required: "Image is required",
                                        onChange: (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setImagePreview(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }
                                    })}
                                    className="file-input file-input-bordered w-full"
                                />
                                <ErrorMessage
                                    errors={travelCardForm.formState.errors}
                                    name="image"
                                    render={({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>}
                                />
                            </div>
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                                    <div className="w-full h-48 overflow-hidden rounded-lg">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags Section */}
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Tags</h4>
                            <div className="space-y-2">
                                <BadgeSelect
                                    badges={selectedTags}
                                    setBadges={setSelectedTags}
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedTags.map((tag, index) => (
                                        <Badge key={index} category={tag} />
                                    ))}
                                </div>
                            </div>
                            <ErrorMessage
                                errors={travelCardForm.formState.errors}
                                name="tags"
                                render={({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>}
                            />
                        </div>

                        <div className="modal-action flex justify-end space-x-4 mt-6">
                            <button type="button" className="btn btn-outline" onClick={() => document.getElementById('createTravelCardModal').close()}>Cancel</button>
                            <button type="submit" className="btn bg-[#7091E6] hover:bg-[#5a7ac9] text-white" disabled={selectedTags.length === 0}>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </FormProvider>
    );
};

export default CreateTravelPlanModal;