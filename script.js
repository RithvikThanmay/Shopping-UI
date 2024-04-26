document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cart = [];

    // Function to handle adding a product to the cart
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    };

    // Function to update the cart display and total bill
    const updateCart = () => {
        const cartArea = document.getElementById('cart');
        const totalBillElement = document.getElementById('total-bill');
        const quantityInputs = document.querySelectorAll('.quantity-input');

        cartArea.innerHTML = '';

        let totalBill = 0;

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            cartItemDiv.innerHTML = `
                <span>${item.title} - ${item.price}$</span>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}">
                <span>Total: ${item.quantity * item.price}$</span>
            `;

            cartArea.appendChild(cartItemDiv);

            totalBill += item.quantity * item.price;
        });

        totalBillElement.textContent = `Total Bill: ${totalBill}$`;
    };

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const image = document.createElement('img');
                image.src = product.image;
                image.alt = product.title;

                const details = document.createElement('div');
                details.innerHTML = `<h3><strong>Title: </strong>${product.title}</h3>
                                     <div><strong>Category: </strong>${product.category}</div>
                                     <p><strong>Description: </strong>${product.description}</p>
                                     <span><strong>Id: </strong>${product.id}</span>
                                     <span><strong>Rating: </strong>${product.rating.rate}</span>
                                     <span><strong>Rated By: </strong>${product.rating.count}</span>
                                     <div><strong>Price: ${product.price}$</strong></div>
                                     <span><button class="add-to-cart">Add to cart</button><button class="buy-now">Buy Now</button></span>`;

                productDiv.appendChild(image);
                productDiv.appendChild(details);

                productList.appendChild(productDiv);

                // Add event listeners to buttons
                const addToCartButton = details.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', () => addToCart(product));

                const buyNowButton = details.querySelector('.buy-now');
                buyNowButton.addEventListener('click', () => addToCart(product));
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function purchaseClick(){
    alert("Thank you for the purchases, Items will be delivered soon")
}