# 🛍 Ecommerce Store with Gatsby, Netlify, and Stripe Products API

Demo site is here: [Gatsby Stripe E-commerce](https://gatsby-stripe-ecommerce.netlify.app/)

This is third generation fork of [Sarah Dresner](https://github.com/mikeesto)'s excellent [boilerplate e-commerce site](https://github.com/sdras/ecommerce-netlify) which [@mikesto](https://github.com/mikeesto) forked and this project forks [his version](https://github.com/mikeesto/ecommerce-gatsby).

This project is the first I'm aware of that uses the new (highly recommended) Stripe Products API. A great solution for those who want to go serverless and not have to deal with auth, this project leans entirely on the Stripe Product API for images, inventory management, and as the data store for the static generated site with the additional layer of not requiring static assets for products and the ability to auto-trigger a Netlify rebuild of the gatsby site when a user's Stripe product catalog changes.

## Getting Started

1. This project leans heavily on Netlify, so the easiest way to get up and running is to start with the [Netlify CLI](https://docs.netlify.com/cli/get-started/). That said, `netlify dev` is your friend for local dev, and `netlify build` is useful to validate the latest build before pushing.
1. You will need to acquire at minimum (Stripe publishable and secret keys)[https://stripe.com/docs/keys#:~:text=Publishable%20API%20keys%20are%20meant,stored%20on%20your%20own%20servers].
1. To enable the available "auto-update / build" functionality where a Stripe webhook that calls Netlify and triggers a rebuild when the Stripe product catalog changes, you will need to set up Stripe via `$ brew install stripe/stripe-cli/stripe`, then `$ stripe login` then [create a Stripe webook](https://stripe.com/docs/api/webhook_endpoints/create). On the Netlify side, [set up a Netlify build webhook](https://app.netlify.com/sites/<your-site>/settings/deploys#environment). Once setup, you can add them to your local dev project in [.env.development](https://github.com/brianfeister/ecommerce-gatsby/blob/master/.env.development.example#L6-L7). You will need to create this file by copying `.env.development.example`.
1. To run this locally, install the stripe-cli via `brew install stripe/stripe-cli/stripe` and start the stripe-cli with `stripe listen --forward-to localhost:8888/.netlify/functions/handle-product-update`. Add the generated `whsec_xyz` product key to `.env.development` as `STRIPE_WEBHOOK_SECRET=whsec_xyz`
1. Stop and the restart your `netlify dev` process (which also serves the gatsby project). **NOTE:** this webhook will trigger an automated rebuild for your netlify deployment, but because Gatsby is a static site generator that uses `gatsby-source-stripe` requiring you to configure stripe and add a product before anything shows up here, you will need to kill `netlify dev` and restart the process each time you make a change to the Stripe Products API data
1. You can add a `featured` key to a product in Stripe's custom metadata to have it appear in the `featured` section of the home page

This is a rewrite of [Sarah Drasner's Ecommerce Store with Netlify Functions and Stripe](https://github.com/sdras/ecommerce-netlify). Sarah's store was built with Nuxt with Vue.js. This version is written in Gatsby with React.

Check out Sarah's [blog post](https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/) on building the site, and where I also learnt how to use Netlify functions.
