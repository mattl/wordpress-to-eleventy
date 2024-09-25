# WordPress to Eleventy tool

A tool to help you migrate from WordPress to Eleventy, but also can be used with WordPress to make a static website.

1. Clone this repo.
2. `npm install`
3. `DOMAIN_NAME=example.com npx eleventy --output=_site`

* This will assume https://
* This now supports wordpress.com blogs
* You'll need https://nodejs.org/ or something similar installed on your computer

## What this is supposed to do

You should get a static copy of your WordPress pages and posts in _site.

I set up a [demo site](https://suchexample.wordpress.com) with a post and a couple pages you can see it here:

`DOMAIN_NAME=suchexample.wordpress.com npx eleventy --output=_site`

## What this doesn't do

It doesn't move over any images, in fact it doesn't know about your `wp-content` folder at all.

based on https://www.sitepoint.com/wordpress-headless-cms-eleventy/

# Buzzwords

* "Synergy!" -- [Todd](https://toddpresta.com)
