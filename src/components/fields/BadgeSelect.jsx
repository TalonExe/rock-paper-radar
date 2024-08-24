import { useFieldArray, useFormContext } from "react-hook-form";

const BadgeSelect = ({badges,setBadges}) => {
    const {register} = useFormContext()
    const {append} = useFieldArray({name:"categories"})
    register("categories");
    
    return (
        <select defaultValue={"DEFAULT"} className="select select-bordered w-full max-w-xs" onChange={(e) =>{ 
            if (!badges.includes(e.target.value)){
                setBadges([...badges,e.target.value])
                append(e.target.value)
            }  
            }}>
            <option disabled value="DEFAULT">Select tags for your post</option>
            <option value={"Adventure"}>Adventure</option>
            <option value={"Food"}>Food</option>
            <option value={"Scenery"}>Scenery</option>
            <option value={"Nature"}>Nature</option>
            <option value={"Historical"}>Historical</option>
        </select>
    )
}

export default BadgeSelect