---
title: jQuery Shine animation effect
author: peter
date: Sat, 13 Nov 2010 18:16:39 GMT
template: article.hbs
comments: true
---

I've been diving deeper into jQuery lately, because a few clients have been requesting Flash-like functionality for their websites, and I've been avoiding Flash since before Steve Jobs made it cool to do so. I have to say, there is more and more that jQuery can do that Flash used to only do. I recently came across one great example of this while researching button effects for a personal project (release coming soon). Addy from AddyOsmani.com posted this great article about a shine effect using jQuery called [&quot;ShineTime – A Kick-Ass New jQuery &amp;amp; CSS3 Gallery With Animated Shine Effects.&quot;](http://addyosmani.com/blog/shinetime/) The best part of the effect is that it's so simple to implement and if you're at all comfortable with jQuery and CSS, the method used with background-position opens up a world of possibility with other effects other than shine, which at least I wasn't aware of. Check out [his demo](http://www.addyosmani.com/resources/shinetime) to see the effect in action.

The entire thing really boils down to a few lines of jQuery Javascript code and some CSS. When a event happens, such as a hover or a page load, a shine PNG image is changed from a background position of off the screen to one that crosses to the other side off the screen. With a little modification, I made the effect display a few seconds after the page loads using setTimeout, rather than when you hover over an element, which produced a great little embellishment for a button or a logo when a visitors comes to the site. It's a great little effect that you used to only be able to do with Flash.
