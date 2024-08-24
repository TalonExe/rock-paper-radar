import { useState } from 'react';
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import openCageApi from '../../api/openCageApi';

const SearchInput = ({ setLocation }) => {
    const { register, formState: { errors } } = useFormContext();
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');
    register('postLocation', {
        onChange: async (event) => {
            try {
                const input = event.target.value;
                setQuery(input);
                if (input.length > 2) {
                    const response = await openCageApi(input).get();
                    setSuggestions(response.data.results);
                } else {
                    setSuggestions([]);
                }

            } catch (error) {
                console.log(error);
            }
        },
        value: query
    });
    function handleSuggestionClick(suggestion) {
        setLocation(suggestion.formatted);
        setQuery(suggestion.formatted);
        setSuggestions([]);
    }
    return (
        <div className="form-control max-h-full relative">
            <div className='flex justify-between w-full mb-2'>
                <p className="label-text">Select Location</p>
                <ErrorMessage errors={errors} name="postLocation" as="p" className="text-red-600" />
            </div>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
                <input value={query} type="text" className="grow" placeholder="Search" {...register("postLocation", { required: "*required" })} />
            </label>
            {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto top-[100%]">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.formatted}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchInput