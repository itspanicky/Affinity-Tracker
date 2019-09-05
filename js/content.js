window.addEventListener("load", function () {

    let count = {
        "Women's ": 0,
        "Men's ": 0,
        "Home ": 0,
        "Lifestyle ": 0,
        "Beauty ": 0
    }

    let category = document.getElementsByClassName('c-breadcrumb__a')                   // tracks categories on product page
    let cart = document.getElementsByClassName("c-cart__product-count")                 // tracks number in cart
    let cartCount = cart[0] ? cart[0].innerHTML : 0
    let parentContainer = document.getElementsByClassName('dom-landing-page-modules')   // tracks category rows on new arrivals page
    let button = document.getElementsByClassName('js-add-to-cart')                      // tracks button on product page

    if (button[0]) {
        button[0].addEventListener('click', function () {
            setTimeout(function() {
            
                let newCart = document.getElementsByClassName("c-cart__product-count")

                if (newCart[0] && newCart[0].innerHTML > cartCount) {
                    if (category[0]) addAffinityCount(category, count, 3)

                    cartCount = newCart[0].innerHTML
                    sendMessage(count)
                }
            }, 3000)
        }, false);
    }

    if (category[0]) addAffinityCount(category, count, 1)
    sendMessage(count)



    // add affinity count to category when page is visited
    function addAffinityCount(category, count, num) {
        for (let i = 0; i < category.length; i++) {

            let affinity = category[i].innerText;
            if (affinity) {
                count[affinity] = num
            }
        }
    }

    // send count to background.js
    function sendMessage(count) {
        chrome.runtime.sendMessage({
            womens: count["Women's "],
            mens: count["Men's "],
            home: count["Home "],
            lifestyle: count["Lifestyle "],
            beauty: count["Beauty "]
        }, function (response) {

            // reset count
            count = {
                "Women's ": 0,
                "Men's ": 0,
                "Home ": 0,
                "Lifestyle ": 0,
                "Beauty ": 0
            }

            // receive counts back from background.js
            sort(response.count)
        })
    }

    // sort categories from highest affinity to lowest affinity; if on /new-arrivals page - reorder view
    function sort(count) {
        let sorted = {}
        let keys = Object.keys(count);
        keys.sort(function (a, b) {
            return count[a] - count[b]
        }).reverse().forEach(function (k) {
            sorted[k] = count[k];
        });

        if (parentContainer[0]) {
            parentContainer[0].style.display = "flex";
            parentContainer[0].style.flexDirection = "column";
            let womensDiv = parentContainer[0].children[1];
            let mensDiv = parentContainer[0].children[3];
            let homeDiv = parentContainer[0].children[5];
            let lifestyleDiv = parentContainer[0].children[7];
            let beautyDiv = parentContainer[0].children[9];
            
            womensDiv.style.order = `${Object.keys(sorted).indexOf("womens")}`;
            mensDiv.style.order = `${Object.keys(sorted).indexOf("mens")}`;
            homeDiv.style.order = `${Object.keys(sorted).indexOf("home")}`;
            lifestyleDiv.style.order = `${Object.keys(sorted).indexOf("lifestyle")}`;
            beautyDiv.style.order = `${Object.keys(sorted).indexOf("beauty")}`;
        }
    }

}, false)