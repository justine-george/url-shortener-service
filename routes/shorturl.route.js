const express = require("express");

const {
  redirectToUrl,
  createShortUrl,
} = require("../controllers/url.controller");

const router = express.Router();

router.get("/shorturl/:url", redirectToUrl);

router.post("/shorturl", createShortUrl);

module.exports = router;
