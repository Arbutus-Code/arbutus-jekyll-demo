source "https://rubygems.org"

# Jekyll version compatible with the theme
gem "jekyll", "~> 4.3.0"
gem "webrick"
gem "bigdecimal"
gem "csv"      # Required for Ruby 3.4+
gem "logger"   # Required for Ruby 3.4+
gem "base64"   # Required for Ruby 3.4+

# For local development, use the local path
gem "arbutus-theme", path: "../arbutus-jekyll-theme"

# For production, use the GitHub reference
# gem "arbutus-theme", github: "Arbutus-Code/arbutus-jekyll-theme"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end

# Note: For GitHub Actions deployment, we'll use a different configuration
# in the workflow file that specifies Jekyll 3.9.0