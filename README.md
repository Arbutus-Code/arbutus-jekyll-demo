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

Favicons and the site's web manifest can be easily managed through the admin panel:

1. **Uploading Favicon Files**:
   - Navigate to "Favicons" > "Favicon Settings"
   - Upload your favicon files:
     - **Favicon ICO**: Required, will be copied to `/favicon.ico`
     - **Favicon PNG**: Optional but recommended, will be used to generate various sizes
     - **Favicon SVG**: Optional, will be copied to `/favicon.svg`

2. **Configuring Web App Manifest**:
   - In the same section, fill out the Web App Manifest fields:
     - App Name: Full name of your web application
     - Short Name: Short name for app icons
     - Theme Color: Color for browser UI elements
     - Background Color: Color for splash screen
     - Display Mode: How the app should be displayed

3. **How It Works**:
   - Files are uploaded to `/assets/images/favicons/` for organization
   - During build, the plugin automatically:
     - Copies favicon files to the site root
     - Generates different sizes from your PNG (16x16, 32x32, 192x192, 512x512)
     - Creates `site.webmanifest` with your settings
     - Generates `_data/favicons.yml` for use in templates

4. **Important Notes**:
   - All favicon files will be available at the site root (e.g., `/favicon.ico`, `/favicon.svg`)
   - You only need to upload source files - the system handles all the different sizes and formats
   - Changes take effect after the site rebuilds

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
