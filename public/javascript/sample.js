if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var addCartItemButtons = document.getElementsByClassName('btn-add');
    for (var i = 0; i < addCartItemButtons.length; i++) {
        var button = addCartItemButtons[i]
        button.addEventListener('click', add);
    }
}
function add(event){
    var buttonClicked = event.target;
    var adds =  buttonClicked.parentElement.parentElement;
    var q = 0;
    var o_price = parseInt(adds.getElementsByClassName("price")[0].innerText);
    var quantity = adds.getElementsByClassName("abc")[0];
    var price = adds.getElementsByClassName("cdf")[0];
    console.log(quantity.innerText+"--------------"+price.innerText)
    var sum = (function a(){
        ++q;
        quantity.innerText = ""+q;
        price.innerText = ""+o_price*q;
    })();
    return sum;
    // var updateClickCount = (function(){
    //     var counter = 0;
    
    //     return function(){
    //         ++counter;
    //         document.getElementById("spnCount").innerHTML = counter;
    //     }
    // })();    
}
