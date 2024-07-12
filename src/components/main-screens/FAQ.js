import React from 'react'
import Accordion from '../Accordion'

const FAQ = () => {
    return (
        <div className='flex justify-center w-full p-4 space-x-4 font-poppins'>
            {/* section left */}
            <div className='flex flex-col w-1/2 space-y-4'>
                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="How does DressLend work?"
                        answer="DressLend is an online rental platform for 
                        traditional and contemporary Nepali attire and 
                        accessories. Users can browse our diverse inventory, 
                        select items for their specific needs, and rent them 
                        for a specified period. The platform offers a seamless 
                        experience, from browsing to booking, all through our 
                        user-friendly web application."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="How long can I rent the items for?"
                        answer="The rental period for each item is typically 
                        specified on the product page. You can choose from various 
                        rental durations depending on your needs. Please check the 
                        details of the specific item you wish to rent for more 
                        information."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="How do I return the rented items?"
                        answer="Returning items is straightforward. After your default 3 days rental 
                        period is over, you'll receive a call from the service to return the item. We will send 
                        our staff to get the item wherever you want and if you are outside 
                        the valley, it will cost you accordingly."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="Can I try on the items before renting?"
                        answer="Currently, DressLend does not offer a try-on service before renting. 
                        However, we provide detailed product descriptions, high-quality images, and size 
                        guides to help you make an informed decision."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="How can I contact DressLend customer support?"
                        answer="You can contact DressLend customer support through our website’s 
                        contact form, email, or phone. Our support team is available to assist you with any 
                        questions or issues you may have regarding your rentals."
                    />
                </div>
            </div>

            {/* section right */}
            <div className='flex flex-col w-1/2 space-y-4'>
                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="What kinds of items can I rent?"
                        answer="DressLend offers a wide variety of items, including traditional
                        Nepali garments like Dhaka topi, daura suruwal, and saris, as well as contemporary 
                        fashion items. Additionally, we have a selection of accessories and jewelry 
                        to complement your outfit."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="What happens if I damage an item?"
                        answer="If an item is damaged during your rental period, 
                        please contact DressLend customer support immediately. 
                        Depending on the extent of the damage, you may be charged a repair 
                        fee or the full replacement cost of the item."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="Are the items cleaned before and after rental?"
                        answer="Yes, all items are professionally cleaned and inspected 
                        before and after each rental to ensure they are in excellent 
                        condition for the next user."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="What payment methods do you accept?"
                        answer="DressLend accepts various payment methods, 
                        including major credit cards, debit cards, and online payment services. 
                        Details are provided during the checkout process."
                    />
                </div>

                <div className="p-2 bg-gray-200 rounded-lg flex-1">
                    <Accordion
                        title="Procedure to return the rented items"
                        answer="Pack the Items: Once your rental period is over, 
                        place the items back in the original packaging or another secure package.
                        Attach the Return Label: Use the pre-paid return label provided by DressLend.
                        Drop Off: Take the package to the nearest courier service specified
                        in the return instructions or if you are inside the valley, you can contact the DressLend and 
                        we'll send our staff to pick up the item. 
                        Confirm Return: Once the package is shipped, 
                        please notify DressLend by contacting customer support."
                    />
                </div>
            </div>
        </div>
    )
}

export default FAQ
