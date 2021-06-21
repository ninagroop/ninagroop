require("dotenv").config()

const fetch = require("node-fetch").default

const NETLIFY_WEBHOOK_ID = process.env.NETLIFY_WEBHOOK_ID
const DEPLOY_PASSWORD = process.env.DEPLOY_PASSWORD

const API_ENDPOINT = "https://api.netlify.com/build_hooks/" + NETLIFY_WEBHOOK_ID

exports.handler = async (event, context) => {
  const code = event.queryStringParameters.code
  if (code !== DEPLOY_PASSWORD) {
    return {
      statusCode: 403,
      body: "FAIL",
    }
  }
  return fetch(API_ENDPOINT, { method: "POST" })
    .then(data => ({
      statusCode: 200,
      body: "SUCCESS",
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}
