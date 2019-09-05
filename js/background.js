window.count = {
    "womens": 0,
    "mens": 0,
    "home": 0,
    "lifestyle": 0,
    "beauty": 0
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    window.count["womens"] += request.womens
    window.count["mens"] += request.mens
    window.count["home"] += request.home
    window.count["lifestyle"] += request.lifestyle
    window.count["beauty"] += request.beauty

    sendResponse({
        count: window.count
    })
})

// chrome.browserAction.onClicked.addListener(function () {
//     chrome.tabs.create({ url: 'popup.html' })
// })