import PageManager from "./page-manager";

export default class Custom extends PageManager {
    constructor(context) {
        super(context);
    }
    onReady() {
        this.newButtons()
    }
    newButtons() {
        const addAll = document.querySelector("#add-all")
        const removeAll = document.querySelector("#remove-all")
        const products = jsContext.categoryProducts
        let currentCart = jsContext.currentCart
        getCart('/api/storefront/carts')
            .then(data => checkCart(data))
            .catch(err => console.log(err))

        function checkCart(data) {
            if (data.length > 0) {
                currentCart = data.id
                if (data[0].lineItems.physicalItems.length > 0) {
                    removeAll.style.visibility = "visible"
                }
            } else {
                currentCart = null
            }
        }


        addAll.addEventListener('click', addAllToCart)
        removeAll.addEventListener('click', removeAllFromCart)

        function addAllToCart() {
            let items = {
                "lineItems": []
            }
            let text = ""
            products.forEach(product => {
                items["lineItems"].push({
                    "quantity": 1,
                    "productId": product.id
                })
                text += `Added ${product.name} to your cart\n`
            })
            if (currentCart) {
                addCartItem('/api/storefront/carts/', currentCart, items)
                    .then(data => afterPost(data, text, false))
                    .catch(err => console.log(err))
            } else {
                createCart("/api/storefront/carts", items, false)
                    .then(data => afterPost(data, text))
                    .catch(err => console.log(err))
            }

        }

        function removeAllFromCart() {
            let url = '/api/storefront/carts/' + currentCart
            deleteCart(url)
                .then(data => afterPost(data, "Cart is now empty", true))
                .catch(err => console.log(err))
        }

        function createCart(url, cartItems) {
            return fetch(url, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cartItems),
            })
                .then(response => response.json())
        }

        function addCartItem(url, cartId, cartItems) {
            return fetch(url + cartId + '/items', {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cartItems),
            })
                .then(response => response.json())
        }

        function deleteCart(url) {
            return fetch(url, {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }

        function afterPost(data, str, empty) {
            const alertSpace = document.querySelector('#alert-space')
            alertSpace.textContent = str
            if (empty) {
                currentCart = null
                removeAll.style.visibility = "hidden"
            } else {
                currentCart = data.id
                removeAll.style.visibility = "visible"
            }
        }

        function getCart(url) {
            return fetch(url, {
                method: "GET",
                credentials: "same-origin"
            })
                .then(response => response.json())
        }


    }


}
