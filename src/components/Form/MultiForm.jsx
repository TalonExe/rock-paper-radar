import React, { useState } from 'react'
import SignInForm from './SignInForm'
import PersonalForm from './PersonalForm'
import { Link } from 'react-router-dom'

const MultiForm = () => {
    const [page, setPage] = useState(0)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        username: ""
    });

    const FormTitles = ["Sign Up", "Personal Information"]

    const PageDisplay = () => {
        if (page === 0) {
            return <SignInForm formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <PersonalForm formData={formData} setFormData={setFormData} />;
        }
    }

    return (
        <div className='w-2/3 h-full bg-[#f5f5f5] flex flex-col p-20 justify-center items-center'>
            <div className='mb-20'>
                <ul className="steps">
                    {FormTitles.map((title) => {
                        return <li className="step step-primary text-wrap">{title}</li>
                    }
                    )}
                </ul>
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
                <div className="w-full flex flex-col justify-center items-center mb-2">
                    <h3 className="text-center text-5xl font-bold mb-4">{FormTitles[page]}</h3>
                    <p className="text-base font-light mt-1 mb-2">Step {page + 1} of {FormTitles.length}</p>
                </div>
                <div className='flex flex-col justify-center items-center w-full mb-12'>
                    {PageDisplay()}
                </div>

                <div className='w-full flex flex-row justify-center gap-20'>
                    <Link className='btn min-w-28' onClick={() => {
                        setPage((currPage) => currPage - 1)
                    }} disabled={page == 0}>
                        Previous
                    </Link>
                    <Link to={page === FormTitles.length - 1 ? "/posts" : ""} className='btn min-w-28' onClick={() => {
                        setPage((currPage) => currPage + 1)
                    }}>
                        {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    </Link>
                </div>
                <div className="w-full flex flex-col my-6">

                    <div className="w-full flex items-center justify-center py-2 my-4">
                        <div className="w-full h-[1px] bg-black/40"></div>
                        <p className="text-xs absolute text-black/80 bg-white px-2">
                            Already Have An Account?
                        </p>
                    </div>

                    <Link to="/signin" className="w-full text-[#7091E6] my-2 bg-white font-semibold border-2 border-[#7091E6] rounded-md p-2 text-center fle x items-center justify-center">
                        Sign In
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default MultiForm
