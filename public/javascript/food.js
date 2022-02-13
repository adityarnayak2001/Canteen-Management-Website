if(document.readyState == 'loading')
{
  document.addEventListener('DOMContentLoaded' , ready)
}
else
{
  ready()
}

function ready()
{
var addToCartButtons = document.getElementsByClassName('cart-button ')
for(var i = 0; i < addToCartButtons.length; i++)
{
  var button = addToCartButtons[i]
  button.addEventListener('click' , addToCartClicked)
}
}







function addToCartClicked(event)
{
var button = event.target
var shopItem = button.parentElement.parentElement.parentElement
console.log(shopItem);
var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText                            //getting inner text of title , price , ImageSrc
var imageSrc = shopItem.getElementsByClassName('food-image')[0].src
var quantity = 1
var foodId = shopItem.getElementsByClassName('shop-item-foodid')[0].innerText
addItemToCart(title, price, quantity , foodId , imageSrc)
}


function addItemToCart(title , price, quantity , foodId , imageSrc)
{

if(localStorage.getItem('cartData') == null)
{                                                      
  localStorage.setItem('cartData','[]')                //adding item to cart
}


var cartData = JSON.parse(localStorage.getItem('cartData'))
var exist = false
console.log('cart data'+cartData.length)
for(var i = 0 ; i < cartData.length ; i++)
{
  
  console.log(cartData[0]['foodId'])
if(cartData[i]['foodId']==foodId)
{
 
var count = cartData[i]['quantity']
count = count + 1

console.log('count is' )
console.log(count)
cartData[i]['quantity'] = count
exist = true
break;
}
}
if(exist == false){
cartData.push({
  title: title,
  price: price,
  quantity: quantity,
  foodId:foodId,
  imageSrc:imageSrc
})

}

localStorage.setItem('cartData' ,JSON.stringify(cartData) )
}

