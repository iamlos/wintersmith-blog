# Default to development if environment is not set.
saved = :production
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "contents/css"
sass_dir = "contents/scss"
images_dir = "contents/img"
javascripts_dir = "contents/js"
generated_images_dir = images_dir + "/generated"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass



##
## This file is only needed for Compass/Sass integration. If you are not using
## Compass, you may safely ignore or delete this file.
##
## If you'd like to learn more about Sass and Compass, see the sass/README.txt
## file for more information.
##



# Require any additional compass plugins installed on your system.
require 'compass'
require 'breakpoint'
require 'susy'

##require 'rgbapng'
##require 'sass-globbing'

##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :development) ? :nested : :compressed

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server omega.
relative_assets = true

# Conditionally enable line comments when in development mode.
line_comments = (environment == :development) ? false : true

# Output debugging info in development mode.
sass_options = (environment == :development) ? {} : {:debug_info => true}

# Add the 'sass' directory itself as an import path to ease imports.
add_import_path 'sass'

sass_options = {:sourcemap => true}