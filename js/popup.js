chrome.runtime.getBackgroundPage(function(backgroundPage) {
    const bgCount = backgroundPage.count
    
    let sorted = {};

    // sort categories from highest affinity to lowest affinity
    let keys = Object.keys(bgCount);
    keys.sort(function (a, b) {
        return bgCount[a] - bgCount[b]
    }).reverse().forEach(function (k) {
        sorted[k] = bgCount[k];
    });

    // store values of each category into localStorage under the value of CSE_Challenge
    // render scores onto div elements
    Object.keys(sorted).forEach(function (affinity) {

        localStorage.setItem(
            "CSE_Challenge", JSON.stringify(sorted)
        )
        
        const div = document.createElement('div')
        div.textContent = `${affinity}: ${JSON.parse(localStorage.getItem("CSE_Challenge"))[affinity]}`
        document.body.appendChild(div)
    })
})
