
const URL = require('../models/url');
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
     const body = req.body;
     if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL:body.url,
        visitHistory: [],
    });
  return res.render("home",{id: shortID})
};


async function handleGetAnalytics(req,res) {
  console.log(req.params)
  const shortId = req.params.shortId;
  const result =  await URL.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics : result.visitHistory
  });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};