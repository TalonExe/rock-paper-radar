import MultiForm from '../../components/forms/MultiForm';

const SignUp = () => {
    return (
        <div>
            <div className="w-screen h-screen bg-sign-in-bg bg-cover bg-no-repeat">
                <div className="bg-[rgba(0,0,0,0.55)] flex w-full h-full">
                    <div className=" w-full h-full p-20">
                        <h1 className="text-5xl text-white font-bold capitalize pb-10">Plan your next adventure with us</h1>
                        <p className="text-3xl text-white font-light capitalize">discover local hidden gems</p>
                    </div>
                    <MultiForm />
                </div>
            </div>
        </div>
    );
};

export default SignUp;