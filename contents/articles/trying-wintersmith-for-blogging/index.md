---
title: Trying Wintersmith for blogging
author: peter
date: 2014-03-22 13:37
template: article.hbs
---

I've used WordPress, Drupal, and other platforms in past for personal blogs, and for the most part, they've always been
overkill for what I needed the site to do. The idea of using a static site generator like [Wintersmith](http://www.wintersmith.io) for its the simplicity and performance sounded pretty appealing, so I'm giving it a try.

<span class="more"></span>

I know there are more popular tools out there like Jekyll/Octopress that do similar things, but they're built in Ruby, and I'd rather use something built in Node with JavaScript, which I'm much more familiar with.

Cool things about Wintersmith:
- avoid the LAMP stack for a simple site, and see HUGE performance improvements because of it
- get to use Node.js and leverage all the cool things being built in that community
- no database to worry about, so I can use git exclusively for deployment since everything is in code
- get to try [Handlebars.js](http://handlebarsjs.com/) templating (Wintersmith comes with Jade templates, but it's easy to swap out)

We'll see how this experiment goes. I'm not saying that I would ditch using something like Drupal all together, and this isn't really something that I could use for client projects, but for my own person coding, tinkering and writing, it seems pretty cool.

I'm slowly going to be building more of this blog out and I'll post more about my experience as I go. You can find the code for it on <a href="https://github.com/petethedude/wintersmith-blog" target="_blank">github</a>.