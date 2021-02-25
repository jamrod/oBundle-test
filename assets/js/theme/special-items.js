import PageManager from "./page-manager";

export default class Custom extends PageManager {
    constructor(context) {
        super(context);
    }
    onReady() {
        // alert("Hello world!");
        this.newButtons()
    }
    newButtons() {
        const addAll = document.querySelector("#add-all")
        const removeAll = document.querySelector("#remove-all")
        const products = jsContext.categoryProducts

        addAll.addEventListener('click', addAllToCart)
        removeAll.addEventListener('click', removeAllFromCart)

        function addAllToCart() {
            console.log("Adding...")
            let items = {
                "lineItems": []
            }
            products.forEach(product => {
                items["lineItems"].push({
                    "quantity": 1,
                    "productId": product.id
                })
            })
            createCart("/api/storefront/carts", items)
                .then(data => console.log(JSON.stringify(data)))
                .catch(err => console.log(err))
        }

        function removeAllFromCart() {
            console.log("Removing...")
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

    }


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
        .then(response => response.json());
};