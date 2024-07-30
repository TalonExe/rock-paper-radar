import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import SignInForm from './SignInForm'
import PersonalForm from './PersonalForm'

const MultiForm = () => {
    const signInForm = useForm()
    const onSubmit = (data) => {
        console.log(data);
    }
    const [page, setPage] = useState(0)

    const FormTitles = ["Sign Up", "Personal Information"]

    const PageDisplay = () => {
        if (page === 0) {
            return <SignInForm />;
        } else if (page === 1) {
            return <PersonalForm />;
        }
    }

    return (
        <FormProvider {...signInForm}>
            <form className='w-2/3 h-full bg-[#f5f5f5] flex flex-col p-20 justify-center items-center' onSubmit={signInForm.handleSubmit(onSubmit)}>
                <div className='mb-20'>
                    <ul className="steps">
                        {FormTitles.map((title) => {

                            return <li key={title} className="step step-primary text-wrap">{title}</li>
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
                        {
                            page == FormTitles.length - 1 ?
                                <input
                                    type='submit'
                                    className='btn max-w-28'
                                    onClick={() => {
                                        if (page == 0) {
                                            signInForm.trigger().then((res) => res ? setPage((currPage) => currPage + 1 ) : setPage(page))
                                        }
                                    }}
                                    value={page == FormTitles.length - 1 ? "Submit" : "Next"} /> :
                                <a

                                    className='btn min-w-28'
                                    onClick={() => {
                                        if (page == 0) {
                                            signInForm.trigger().then((res) => res ? setPage((currPage) => currPage + 1) : setPage(page))
                                    }
                                    }
                                    }
                                >{page == FormTitles.length - 1 ? "Submit" : "Next"}</a>

                        }
                    </div>
                    <div className="max-w-[300px] w-full flex flex-col items-center my-6">

                        <div className="w-full flex items-center justify-center py-2 my-4">
                            <div className="w-full h-[1px] bg-black/40"></div>
                            <p className="text-xs absolute text-black/80 bg-[#f5f5f5] px-2">
                                Already Have An Account?
                            </p>
                        </div>

                        <Link to='/signin' className="w-full text-[#7091E6] my-2 bg-white font-semibold border-2 border-[#7091E6] rounded-md p-2 text-center flex items-center justify-center">
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </FormProvider>

    )
}

export default MultiForm