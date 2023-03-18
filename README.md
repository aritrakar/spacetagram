# Spacetagram: Image-sharing from the final frontier

Submission for Shopify Front End Developer Challenge 2022. Demo: [GitHub Pages](https://aritrakar.github.io/spacetagram/).

## The Challenge

We'd like a simple to use interface that makes it easy to:

1. Fetch data from one of NASA’s APIs and display the resulting images (more details under Technical Requirements)
2. Display descriptive data for each image (for example: title, date, description, etc.)
3. Like an image
4. Unlike an image

## Technical requirements

1. Search results should come from NASA’s free APIs, for which you’ll need a free API key from https://api.nasa.gov - you do not need to enter anything more than your first name, last name, and email address (i.e. application url is not required)
   a. We’ve provided screenshots below of demo apps we built using the Astronomy Picture of the Day or Mars Rover Photos APIs (along with Shopify’s open source React component library: Polaris).
   b. You are free to use any NASA API you like
   c. You are free to use any front end framework/component library you like (or none at all!)

2. Each image result should list at least a title, date of capture (ideally in earth_date) and a button to “like” that image.

3. Each image can be “liked”, and a user should be able to undo their “like”

4. The HTML that ends up being served client-side should be accessible and semantic (MDN reference)

## Remarks

### Technologies and libraries

1. React JS
2. React Router
3. Tailwind CSS
4. Headless UI React

### Features Implemented

In addition to satisfying all the technical requirements of the challenge, the following are some extra features that I have implemented:

1. **Like system:** Posts can be liked and unliked. The heart button is animated as well.

2. **Infinite scrolling:** The posts are arranged as Card components. Once you reach the bottom of the screen, a loader is displayed and 15 more posts are fetched. By default, there are 15 posts to start with. Both these numbers can be increased to reduce the number of API calls in a single session. (Note: The limit of the NASA APOD API is 1000 requests per hour.)

3. **Modal:** Each post has a "more..." button (similar to Instagram) when there are more than 140 characters in the description of the post. When clicked, it pops up a modal (unlike Instagram). The modal also contains Like, Share, Open in New Tab, and Close buttons.

4. **Animations:** All the buttons and cards have animations when they are hovered upon and clicked (except posts).

5. **Embedded YouTube videos:** Usage of iframes, when appropriate, helps to embed YouTube videos in posts. Other posts contain either images or GIFs.

6. **Loader:** A space-themed rocket loader is displayed when the posts are being fetched.

7. **Skeletons:** When the API has returned data, the Card components are rendered. Since the application uses HD urls, if available, sometimes the high resolution pictures may take some time to load. In those cases, pulsing gray skeletons (similar to those while loading YouTube videos or Instagram posts) are displayed.

8. **Sharing and unique pages for each post:** I used React Router for the sole purpose of creating shareable links. Each post has a unique date, and they have a unique page assigned to them. The link of that page can be shared with others by clicking the Share button. Once the button is clicked, a modal is displayed with options to share to Facebook, Twitter, WhatsApp, Reddit, LinkedIn, and Email.

9. **Not found page:** Since I'm using React Router, I have also included a space-themed page to handle unknown routes.

10. **Responsive design, accessibility, and best practices:** I made the application as responsive as possible. All features are available on web as well as on mobiles. Furthermore, I included `alt` tags on image tags, included support for screen readers, and documented code where possible and relevant.

11. **Dark mode:** As a fun feature, I added support for dark mode. There is a button on the top right corner which allows the user to switch between Light and Dark modes.

### Future Improvements

1. **Persistence:** While posts can be liked and unliked, there is no persistence, ie. if the user refreshes the tab, the posts will be refetched and hence liked status of posts will be lost.

2. **Caching:** Caching can be used to achieve different kinds of results. Firstly, it could be used to store the posts so that they don't need to be fetched repeatedly. I somewhat achieved this using React Query. However, this messed with the infinite scrolling feature, so I decided against including it. Furthermore, caching could be used to store likes, as mentioned above in Persistence. You can find my attempt at infinite scrolling using caching in `src\components\pages\PostsPageRQ.js`.

3. **Date picker:** Although I got the UI of date pickers to work properly and made progress on updating dates, I did not have time to implement the date picking methods efficiently. This feature is a great future addition.
