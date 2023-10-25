const Url = require("../models/url.model");
const dns = require("dns");
const util = require("util");
const dnsLookup = util.promisify(dns.lookup);

// Redirect to the original url using the short url
const redirectToUrl = async (req, res) => {
  try {
    const { url } = req.params;

    // Check if the url is a positive integer
    if (!/^\d+$/.test(url)) {
      return (
        res
          // .status(400)
          .json({ error: "Wrong format" })
      );
    }

    const shortUrl = parseInt(url, 10);
    const foundUrl = await Url.findOne({ short_url: shortUrl });
    if (!foundUrl) {
      return (
        res
          // .status(404)
          .json({ error: "No short URL found for the given input" })
      );
    }

    res
      // .status(302)
      .redirect(foundUrl.original_url);
  } catch (error) {
    console.log(error);
    res
      // .status(500)
      .json({ error: "Internal Server Error" });
  }
};

const createShortUrl = async (req, res) => {
  const { url } = req.body;

  const regex =
    /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\/\S*)?$/;
  if (!regex.test(url)) {
    return (
      res
        // .status(400)
        .json({ error: "invalid url" })
    );
  }

  // check whether the url is valid using dns lookup
  try {
    const hostname = new URL(url).hostname;
    await dnsLookup(hostname);
  } catch (error) {
    return (
      res
        // .status(400)
        .json({ error: "invalid url" })
    );
  }

  const foundUrl = await Url.findOne({ original_url: url });
  if (foundUrl) {
    return (
      res
        // .status(200)
        .json({
          original_url: foundUrl.original_url,
          short_url: foundUrl.short_url,
        })
    );
  }

  const count = await Url.countDocuments();

  const newUrl = new Url({
    original_url: url,
    short_url: count + 1,
  });

  try {
    const savedUrl = await newUrl.save();
    res
      // .status(201)
      .json({
        original_url: savedUrl.original_url,
        short_url: savedUrl.short_url,
      });
  } catch (error) {
    console.log(error);
    res
      // .status(500)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = {
  redirectToUrl,
  createShortUrl,
};
