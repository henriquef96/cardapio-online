import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Hamb_1 from '../images/hamb-1.png'
import Hamb_2 from '../images/hamb-2.png'
import Hamb_3 from '../images/hamb-3.png'
import Hamb_4 from '../images/hamb-4.png'
import Hamb_5 from '../images/hamb-5.png'
import Hamb_6 from '../images/hamb-6.png'
import Hamb_7 from '../images/hamb-7.png'
import Hamb_8 from '../images/hamb-8.png'
import Refri_1 from '../images/refri-1.png'
import Refri_2 from '../images/refri-2.png'
import Refri_3 from '../images/refri-3.png'

export interface CartProps {
    name: string;
    price: number;
    qtd: number;
}

export let cart: CartProps[] = [];

function menu(event: MouseEvent) {
    const target = event.target as HTMLElement;

    let parentButton = target.closest(".add-to-cart-btn");

    if (parentButton instanceof HTMLElement) {
        const name = parentButton.getAttribute("data-name");
        const price = parentButton.getAttribute("data-price");

        if (price !== null && name !== null) {
            const priceFloat = parseFloat(price);
            addToCart(name, priceFloat);
        }
    }
}

function toastCart() {
    Toastify({
        text: "Item adicionado no carrinho",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, green, #00C21F)",
        },
    }).showToast();
}

function addToCart(name: string, price: number) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qtd += 1;
    } else {
        cart.push({
            name,
            price,
            qtd: 1
        });
    }
    updateCartModal();
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement("div");

            cartItemElement.classList.add("mb-5");

            cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="font-medium">${item.name}</span>
                    <span>Qtd: ${item.qtd}</span>
                    <span class="font-medium">R$ ${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-btn" data-name="${item.name}">Remover</button>
            </div>`;

            total += item.price * item.qtd;

            cartItemsContainer.appendChild(cartItemElement);
        });

        const cartTotal = document.getElementById("cart-total");
        if (cartTotal) {
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        }

        const cartCounter = document.getElementById("cart-count");
        if (cartCounter) {
            cartCounter.textContent = cart.length.toString();
        }

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function (event) {
                const target = event.target as HTMLElement;
                const name = target.getAttribute("data-name");
                if (name) {
                    removeFromCart(name);
                }
            });
        });
    }
}

function removeFromCart(name: string) {
    const item = cart.find(item => item.name === name);
    if (item) {
        if (item.qtd > 1) {
            item.qtd -= 1;
        } else {
            cart = cart.filter(item => item.name !== name);
        }
    }
    updateCartModal();
}

interface MenuItemProps {
    type: 'comida' | 'bebida';
    src: string;
    alt?: string;
    nome?: string;
    descricao?: string;
    preco: number
    data_name: string;
    data_price: number;
}

function MenuItem({ type, src, alt, nome, descricao, preco, data_name, data_price }: MenuItemProps) {
    return (
        <div className='flex gap-2'>
            <img src={src} alt={alt} className='w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300' />
            <div className='w-full'>
                {type === 'comida' && (
                    <>
                        <span className='font-bold'>{nome}</span>
                        <p className='text-sm'>{descricao}</p>
                    </>
                )}
                {type === 'bebida' && (
                    <span className='font-bold'>{nome}</span>
                )}
                <div className='flex items-center gap-2 justify-between mt-3'>
                    <span className='font-bold text-lg'>R$ {preco}</span>
                    <button data-name={data_name} data-price={data_price} className='bg-black px-5 pt-1 rounded add-to-cart-btn hover:scale-110 duration-300' onClick={toastCart}><i className='fa fa-cart-plus text-lg text-white'></i></button>
                </div>
            </div>
        </div>
    );
}

export function Container() {

    return (
        <main id='menu' onClick={(event) => menu(event as unknown as MouseEvent)}>
            <h2 className='text-2xl md:text-3xl font-bold text-center mt-10 mb-10'>Conheça nosso menu</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-10'>

                <MenuItem type="comida" src={Hamb_1} alt='Hamburger Smash Burger' nome='Smash Burger' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={16.99} data_name='Smash Burger' data_price={16.99} />

                <MenuItem type="comida" src={Hamb_2} alt='Hamburger Clássico Supremo' nome='Clássico Supremo' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={29.99} data_name='Clássico Supremo' data_price={29.99} />

                <MenuItem type="comida" src={Hamb_3} alt='Hamburger Bacon Explosivo' nome='Bacon Explosivo' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={18.99} data_name='Bacon Explosivo' data_price={18.99} />

                <MenuItem type="comida" src={Hamb_4} alt='Hamburger Vegetariano Gourmet' nome='Vegetariano Gourmet' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={19.99} data_name='Vegetariano Gourmet' data_price={19.99} />

                <MenuItem type="comida" src={Hamb_5} alt='Hamburger Frango Crocante' nome='Frango Crocante' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={18.99} data_name='Frango Crocante' data_price={18.99} />

                <MenuItem type="comida" src={Hamb_6} alt='Hamburger Queijo e Cebola' nome='Queijo e Cebola' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={16.99} data_name='Queijo e Cebola' data_price={16.99} />

                <MenuItem type="comida" src={Hamb_7} alt='Hamburger Portobello Suave' nome='Portobello Suave' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={22.99} data_name='Portobello Suave' data_price={22.99} />

                <MenuItem type="comida" src={Hamb_8} alt='Hamburger Picante Mexicano' nome='Picante Mexicano' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={20.99} data_name='Picante Mexicano' data_price={20.99} />

                <MenuItem type="comida" src={Hamb_1} alt='Hamburger Barbecue Rústico' nome='Barbecue Rústico' descricao='Pão de fermentação natural, hamburger artesanal de 200g, queijo prato e maionese da casa.' preco={16.99} data_name='Barbecue Rústico' data_price={16.99} />
            </div>
            <hr />
            <h2 className='text-2xl md:text-3xl font-bold text-center mt-5 mb-10'>Bebidas</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16'>
                <MenuItem type="bebida" src={Refri_1} alt='Coca-Cola' nome="Coca-cola" preco={6.99} data_name='Coca-Cola' data_price={6.99} />
                <MenuItem type="bebida" src={Refri_2} alt='Guarana' nome="Guarana" preco={6.99} data_name='Guarana' data_price={6.99} />
                <MenuItem type="bebida" src={Refri_3} alt='Pepsi' nome="Pepsi" preco={6.99} data_name='Pepsi' data_price={6.99} />
            </div>

        </main>
    )
}
