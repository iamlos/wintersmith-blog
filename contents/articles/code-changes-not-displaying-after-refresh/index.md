---
title: "PSA: Why your code changes are not displaying after browser refresh"
author: peter
date: 2014-03-28 13:37
template: article.hbs
comments: true
---

After weeks of frustration, I finally figured out why my PHP code changes on my local development box weren't always coming up in the browser after several refreshes. As it turns out, it's a new OPCache setting as of PHP 5.5 that comes with MAMP.
<span class="more"></span>

I upgraded my installation of MAMP several weeks ago, which I use for local development, and everything seemed normal, but then I started to notice that when I was writing some PHP, my changes wouldn't reflect in the browser after several refreshes. At first, I thought this might be a Chrome caching issue, so I would keep refreshing over and over, and sometimes even cleared the cache to see the changes in my code. You can imagine that this might slow your coding down quite a bit.

It turns out, my new version of MAMP, which shipped with PHP 5.5.3, has OPcache enabled by default. After making the php.ini edits below, my development environment was back to normal. I just wish I knew about this sooner.

First, open your php.ini file found here:
/Applications/MAMP/bin/php/php5.5.3/conf/php.ini

Then, comment out this block of code by adding ';' to the beginning of each line, like I've done below. Don't forget to restart MAMP for this to take effect.

```
[OPcache]
;zend_extension="/Applications/MAMP/bin/php/php5.5.3/lib/php/extensions/no-debug-non-zts-20121212/opcache.so"
;  opcache.memory_consumption=128
;  opcache.interned_strings_buffer=8
;  opcache.max_accelerated_files=4000
;  opcache.revalidate_freq=60
;  opcache.fast_shutdown=1
;  opcache.enable_cli=1
```

That's it. I wish I knew that a few weeks ago.