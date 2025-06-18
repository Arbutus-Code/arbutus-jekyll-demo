# Arbutus Code Jekyll Demo

This is a demo site for the Arbutus Code Jekyll theme.

## Admin Panel Features

### Brand Colors Management

The site's brand colors can be edited through the admin panel and are automatically applied during the build process:

1. **Editing Colors**: 
   - Log in to the admin panel
   - Navigate to "Brand Colors" > "Brand Palette"
   - Use the color pickers to adjust the brand colors
   - Save changes

2. **How It Works**:
   - Colors are stored in `_data/brand_colors.yml`
   - During the Jekyll build process (locally or via GitHub Actions), the `_plugins/brand_colors_generator.rb` script generates `_sass/_brand.scss` with the updated colors
   - The SCSS file is then compiled into the site's CSS

3. **Important Notes**:
   - Do not edit `_sass/_brand.scss` directly as it will be overwritten during build
   - Always use the admin panel to ensure consistency between the YAML data and SCSS variables
   - If you need to add new color variables, add them to both `_data/brand_colors.yml` and update the admin config in `admin/config.yml`

### Favicon and Web Manifest Management

Favicons and the site's web manifest can be managed through the admin panel:

1. **Editing Favicons**:
   - Navigate to "Site Configuration" > "Site Settings"
   - Scroll to the "Favicons" section
   - Add or edit favicon entries with appropriate rel, type, sizes, and file path
   - For regular favicons, set rel to "icon" or "apple-touch-icon"
   - For the web manifest, set rel to "manifest"

2. **File Paths**:
   - All favicon and manifest files are stored in the site root for proper browser access
   - Use paths like `/favicon.ico` or `/site.webmanifest`

### Navigation Management

Site navigation can be edited through the admin panel:

1. **Editing Navigation**:
   - Navigate to "Navigation" > "Navigation"
   - Edit the main navigation links and footer navigation links
   - Each link requires a name and URL path

## Development

### Local Development

```bash
bundle install
bundle exec jekyll serve
```

### Admin Panel

The admin panel is available at `/admin/` when the site is running.
