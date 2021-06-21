# TODO: add the following

1. Explain setup of stripe webhooks + local dev CLI for stripe https://stripe.com/docs/stripe-cli || webhooks https://dashboard.stripe.com/webhooks
2. Add a build hook https://app.netlify.com/sites/rawelegance/settings/deploys#environment
3. run `brew install stripe/stripe-cli/stripe`
4. run `stripe login`
5. run `stripe listen --forward-to localhost:8888/.netlify/functions/handle-product-update`
6. Add the generated `whsec_xyz` product key to `.env.development` as `STRIPE_WEBHOOK_SECRET=whsec_xyz`
7. Explain setting up netlify functions in local dev, including the need for the `netlify dev` CLI tool https://docs.netlify.com/functions/build-with-javascript/ || https://www.netlify.com/products/dev/
8. Stop and the restart your `netlify dev` process (which also serves the gatsby project) **NOTE:** this webhook will trigger an automated rebuild for your netlify deployment, but because Gatsby is a static site generator that uses `gatsby-source-stripe` requiring you to configure stripe and add a product before anything shows up here, you will need to kill `netlify dev` and restart the process each time you make a change to the Stripe Products API data
9. You can add a `featured` key to a product in Stripe's custom metadata to have it appear in the `featured` section of the home page
10. more to come...

# Gatsby Ecommerce

## [Demo Store](https://ecommerce-gatsby.netlify.com/)

## 🧐

This is a rewrite of [Sarah Drasner's Ecommerce Store with Netlify Functions and Stripe](https://github.com/sdras/ecommerce-netlify). Sarah's store was built with Nuxt. This version is written in Gatsby.

Check out Sarah's [blog post](https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/) on building the site, and where I also learnt how to use Netlify functions.

## 🤓

Gatsby is traditionally used as a static site generator. However, in this project the `/product` route is generated dynamically using the Gatsby createPage API. See [gatsby-node.js](./gatsby-node.js). To stop the client side router serving the 404 page on `/product` requests, I added a [server redirect](.netlify.toml) and a [rather obscure conditional check](./src/pages/404.js). Credit to [@samburgers](https://github.com/gatsbyjs/gatsby/issues/5329#issuecomment-484741119) because otherwise I would still be trying to solve this issue today.

The Context API and Local Storage were used for state management. Storing the cart locally means that the user can leave the site, return days later and their product selections will remain. Using the Context API with a dynamically generated route (`/product`) gave me a headache. I ended up following instructions for configuring Redux with Gatsby, thankfully the same approach worked. See [gatsby-browser](./gatsby-browser.js) & [gatsby-ssr.js](./gatsby-ssr.js) - both are required.

Local Storage doesn't exist when running Gatsby build as it's part of the browser API and Gatsby doesn't build in the browser. I read about various workarounds [here](https://github.com/gatsbyjs/gatsby/issues/309) and [here](https://github.com/gatsbyjs/gatsby/issues/14480), and then ended up [putting the code](./src/context/cart.js) in a useEffect hook to run when the component mounts.

[React Stripe Elements](https://github.com/stripe/react-stripe-elements) was used for the credit card component. It uses the higher order component pattern and doesn't currently support hooks (much sadness). Stripe was otherwise fun to use.

### 🏗

```
Clone repository
- `npm install`
- `npm start` to develop
- `npm run build` to build
- `npm run serve` to serve built site
```
