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
  getItem()
 
  updateCartTotal()
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  
  for(var i = 0; i < removeCartItemButtons.length; i++)
  {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i = 0; i < quantityInputs.length; i++)
{
var input = quantityInputs[i]
input.addEventListener('change'  , quantityChanged)
}


}

function removeCartItem(event)
{
  
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  var cartItem =  buttonClicked.parentElement.parentElement
  var foodId = cartItem.getElementsByClassName('cart-item-foodid')[0].innerText
  var cartData = JSON.parse(localStorage.getItem('cartData'));
  const filtered = cartData.filter(data => data.foodId !== foodId);
  localStorage.setItem('cartData', JSON.stringify(filtered));
  

  updateCartTotal()
}

function quantityChanged(event)
{
var cartData = JSON.parse(localStorage.getItem('cartData'));

var input = event.target
var cartItem =  input.parentElement.parentElement

var foodId = cartItem.getElementsByClassName('cart-item-foodid')[0].innerText

if(isNaN(input.value) || input.value <= 0)
{
  input.value = 1;
}


for(var i = 0 ; i < cartData.length ; i++)
{
 if(cartData[i]['foodId'] == foodId) 
 {
  
cartData[i]['quantity'] = input.value
break
 }
}
localStorage.setItem('cartData', JSON.stringify(cartData));
updateCartTotal()

}


function updateCartTotal()
{
  var cartData = JSON.parse(localStorage.getItem('cartData'))

var total = 0
var quantity = 0
for(var i = 0 ; i < cartData.length ; i++)
{
  var price = parseFloat((cartData[i]['price']).replace('₹', ''))
  var quantity = parseInt(cartData[i]['quantity'])
  
  total = total + (price * quantity)
}
total = Math.round(total*100)/100
 
 document.getElementsByClassName('cart-total-price')[0].innerText = '₹' +total


}

function getItem()
{

 
  if(localStorage.getItem('cartData') != null)
  {
    var cartData = JSON.parse(localStorage.getItem('cartData'))

    

    for(var i = 0 ; i < cartData.length ; i++)
    {
      var cartRow = document.createElement('div');
      cartRow.classList.add('cart-row')
    var title = cartData[i]['title']
    var price = cartData[i]['price']
    var imageSrc = cartData[i]['imageSrc']
    var quantity = parseInt(cartData[i]['quantity'])
    var restId = cartData[i]['restId']
    var foodId = cartData[i]['foodId']
    
  
      var cartItems = document.getElementsByClassName('cart-items')[0];
var cartRowContents = `    <div class="cart-item cart-column">
                    <img class="cart-item-image" src=${imageSrc} width="100" height="100">
                    <span class="cart-item-restid">${restId}</span>
                    <span class="cart-item-foodid">${foodId }</span>
                    <span class="cart-item-title">${title}</span>
                </div>  
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value=${quantity}>
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>`
cartRow.innerHTML = cartRowContents;
updateCartTotal();
cartItems.append(cartRow);
  }
    
    



  }



}
// window.onload = getItem; 