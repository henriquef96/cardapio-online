import { useState, useEffect } from 'react';
import Logo from '../images/hamb-1.png'
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;
}

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const restaurantIsOpen = checkRestaurantOpen();
        setIsOpen(restaurantIsOpen);

        if (!restaurantIsOpen) {
            Toastify({
                text: "Ops, o restaurante está fechado!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(200, 0, 0), red)",
                },
            }).showToast();
        }
    }, []);

    const statusClass = isOpen ? 'bg-green-500' : 'bg-red-600';

    return (
        <header className='w-full h-[300px] bg-home bg-cover bg-center'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <img src={Logo} alt="Logo Web Burger" className='w-32 h-32 rounded-full shadow-lg hover:scale-110 duration-300' />

                <h1 className='text-4xl mt-4 mb-2 font-bold text-white'>Dev.Burger</h1>

                <span className='text-white'>Rua das Nações, 565 - Curitiba - PR</span>

                <div className={`px-4 py-1 rounded-lg mt-5 ${statusClass}`}>
                    <span className='text-white'>Seg a Dom - 18:00 às 23:00</span>
                </div>
            </div>
        </header>
    );
}
