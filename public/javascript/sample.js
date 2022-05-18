if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var addCartItemButtons = document.getElementsByClassName('btn-add')
    for (var i = 0; i < addCartItemButtons.length; i++) {
        var button = addCartItemButtons[i]
        button.addEventListener('click', add)
    }
    
}
// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.getElementsByClassName()
//     updateCartTotal()
// }
var add = (function(){
    var buttonClicked = event.target
   var add =  buttonClicked.parentElement.getElementsByClassName("abc");
    updateCartTotal()
    var q = 0,price=0;
    var quantity = document.getElementsByClassName("abc")[0];
    var price = document.getElementsByClassName("cdf")[0];
    function a(){
        ++q;
        quantity.innerText = ""+q;
    }
    return a;    
})(event);
