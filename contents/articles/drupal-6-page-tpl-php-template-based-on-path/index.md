---
title: Drupal 6 page.tpl.php template based on path
author: peter
date: Sat, 05 Nov 2011 17:28:28 GMT
template: article.hbs
comments: true
---

Use custom page.tpl.php files based on the URL path alias of your pages to create custom template files. Add the following code to your theme's template.php file.

``` php
function phptemplate_engine_preprocess_page(&$variables) {
  $alias = drupal_get_path_alias($_GET['q']);

  if ($alias != $_GET['q']) {
    $template_filename = 'page';

    foreach (explode('/', $alias) as $path_part) {
      $template_filename = $template_filename . '-' . $path_part;
      $variables['template_files'][] = $template_filename;
    }
  }
}
```

Create a copy of page.tpl.php and rename it to page-YOURPATH.tpl.php and begin to make your own custom edits specific to that path. Now, if you've got a www.yoursite.com/blog path, then Drupal will pick up page-blog.tpl.php as the template for that page. The above code is for Drupal 6\. You may need to clear Drupal's cache after you've done this for it to take effect.
