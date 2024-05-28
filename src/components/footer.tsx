function ShowModal() {
    const cartModal = document.getElementById("cart-modal")!;
    cartModal.style.display = "flex"
}

export function Footer() {
    return (
        <footer className='w-full py-3 fixed bottom-0 flex items-center justify-center'>
            <button id='cart-btn' className='flex items-center gap-2 text-white font-bold' onClick={ShowModal}>(<span id='cart-count' >0</span>) Ver carrinho
                <i className='fa fa-cart-plus text-lg text-white'></i>
            </button>
        </footer>
    )
}