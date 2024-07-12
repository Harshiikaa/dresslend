import React from 'react'
import question from '../../assets/images/question.png';
import FAQ from '../../components/main-screens/FAQ';

const Help = () => {
    return (
        <div>
            {/* Help */}
            <div className='bg-gradient-to-r'>
                <p className="text-center text-base font-semibold text-black-500 ">
                    Help
                </p>
                <p className="text-center text-2xl font-extrabold text-gray-700">
                    Do you have questions?
                </p>
                {/* <div className='flex justify-center min-h-screen'> */}
                <div className='flex justify-center'>
                    <img className='h-32 w-32 object-cover al' src={question} alt='' ></img>
                </div>

                {/* questions section */}
                <div className="w-full ">
                    <div className="p-4 w-50 ">
                        <FAQ />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Help
