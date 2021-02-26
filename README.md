## Task for oBundle

Create a product called Special Item which will be assigned to a new category called Special Items. Be sure to add at least 2 images during the product creation

The Special Item should be the only item which shows in this category - create a feature that will show the product's second image when it is hovered on.
Add a button at the top of the category page labeled Add All To Cart. When clicked, the product will be added to the cart. Notify the user that the product has been added.
If the cart has an item in it - show a button next to the Add All To Cart button which says Remove All Items. When clicked it should clear the cart and notify the user.
Both buttons should utilize the Storefront API for completion.

- Bonus
  If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone, etc). This should utilize the data that is rendered via Handlebars on the Customer Object.

### Results

This was my first experience with BigCommerce so I had to spend a good amount of time reading the docs and getting familiar with Stencil. It has some similarities to Shopify and 11ty which I have more experience with.

I took the tasks in order, creating the product and category from the GUI. I figured out how to make my own templates and link them to the product and category. I found a solution for changing the picture that didn't require me to get too far in to the object model but that wouldn't get me through the next steps.

The new buttons required using the API and the docs were pretty good on that front, where I ran into trouble was with the css and the status of the cart. I first tried to get the cart from the context, which seemed to work but then I started getting strange behavior. After a cart was deleted, it would still be referenced in the context, so I had to do another API call to get /cart to make sure that there really was a cart. That issue tripped me up the most in this process.

The docs were not accurate or possibly just incomplete in that the description of how to add css did not work. But I was able to add css directly to the \_category.scss file to implement some styling and hide the Remove All button.

The Bonus funtionality was pretty straight forward. The Customer object was available in the context and easily accessible with handlebars, {{ customer.name }}

### Links

Github repo: [https://github.com/jamrod/oBundle-test](https://github.com/jamrod/oBundle-test)

Store: [https://jcr-enterprises.mybigcommerce.com](https://jcr-enterprises.mybigcommerce.com)

Preview Code: nil49cd83x

### Snippets

Show 2nd picture on mouseover of thumbnail-

```
newImageSelect() {
        const thumbs = document.querySelectorAll(".productView-thumbnail-link")

        thumbs.forEach(thumb => {
            thumb.addEventListener('mouseover', thumb.click)
        })
    }
```

Check for a shoping cart, get id and set visibility on "Remove All" button

```
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
```
