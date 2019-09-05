# Affinity Tracker

Affinity Tracker is a chrome extension that is built using vanilla Javascript.

Affinity Tracker tracks user shopping patterns on [Urban Outfitters](https://www.urbanoutfitters.com "urban outfitters") and saves the values to local storage. Affinity tracker also reorders content on the [New Arrivals](https://www.urbanoutfitters.com/new-arrivals) page based off the shopping patterns.

## Features

### Affinities
- Affinity Tracker will track 5 affinities (Womens, Mens, Home, Lifestyle, Beauty)
- When a user views a item that fall under any of these 5 affinities, their scores for those affinities will increase by 1
- When a user adds a item to their cart, the scores for respective affinities will increase by 3
- Values are saved to local storage

### New Arrivals Page
- Using DOM maniputation techniques, the new arrivals page will be reorganize to display categories that the user has a high affinity for towards the top on the page.
