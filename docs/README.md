# Arbutus Jekyll Theme Demo Site

This repository contains a complete demo site for the Arbutus Jekyll Theme. It showcases all available components, layouts, and features of the theme in a fictional conservation organization website.

## Features

- **12 Flexible Components**: Hero, text sections, split layouts, featured cards, CTAs, contact forms, team members, and more
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Content Management**: Integrated with Decap CMS (formerly Netlify CMS) for easy content editing
- **SEO Optimized**: Built-in SEO tags, structured data, and performance optimization
- **Ruby 3.4+ Compatible**: Updated for the latest Ruby versions
- **Automated Deployment**: GitHub Actions workflow for seamless deployment

## Getting Started

### Prerequisites

- **Ruby 3.0+** (Ruby 3.4+ recommended)
- **Bundler** (`gem install bundler`)
- **Git** for version control

### 1. Basic Setup

1. **Clone this repository**:

   ```bash
   git clone https://github.com/your-username/your-site-name.git
   cd your-site-name
   ```

2. **Install dependencies**:

   ```bash
   bundle install
   ```

3. **Start development server**:

   ```bash
   bundle exec jekyll serve
   ```

   Your site will be available at `http://localhost:4000`

4. **Update site configuration** (see Configuration section below)
5. **Customize content** in the Markdown files
6. **Replace branding assets** (logos, favicons, etc.)

### 2. Configuration (`_config.yml`)

The `_config.yml` file contains all site-wide settings. Here are the key areas to update:

```yaml
# Site information
title: Your Site Title
description: Your site description
logo: path/to/your/logo.svg  # Header logo
footer_logo: path/to/your/footer-logo.svg  # Optional different logo for footer
baseurl: ""  # Leave empty for root domain, or set to "/subdirectory" for subdirectory
url: "https://yourdomain.com"  # Your domain name

# Contact information
contact:
  address: "Your Address"
  email: "your.email@example.com"
  phone: "+1 555-555-5555"

# Social media links
socials:
  - name: Twitter
    url: "https://twitter.com/youraccount"
    icon: twitter
  # Add more social platforms as needed
```

### 3. Favicon and Site Icons

Update the favicon and site icons in the admin panel or directly in the `_data/favicon_settings.yml` file.

## Content Creation Guide

### Page Structure

All pages use the same basic structure in the front matter:

```yaml
---
layout: page  # or another layout like 'post'
title: Page Title
sections:
  - type: component_type  # e.g., hero, text-section, split, etc.
    # component-specific parameters
  - type: another_component
    # parameters
---
```

### Available Components

The Arbutus theme includes the following components:

#### 1. Hero (`hero`)

```yaml
- type: hero
  title: Main Headline  # Required
  subtitle: Supporting text that explains more  # Optional
  image: path/to/image.svg  # Optional hero image
  image_alt: Image description  # Optional, defaults to title if not provided
  cta:  # Optional
    text: Button Text  # Required if cta is provided
    url: /link/to/page/  # Required if cta is provided
```

#### 2. Text Section (`text-section`)

```yaml
- type: text-section
  heading: Section Title
  text: |
    Markdown content goes here.
    
    ## You can use headings
    
    * And bullet points
    * Another point
```

#### 3. Split Section (`split`)

```yaml
- type: split
  image: /path/to/image.jpg  # Optional, but recommended
  image_alt: Image description  # Optional, defaults to heading if not provided
  image_position: left  # Optional, 'left' or 'right', defaults to 'left'
  image_caption: Image caption  # Optional
  heading: Section Title  # Optional, but recommended
  text: |  # Optional, but recommended
    Content with **markdown** support
```

#### 4. CTA Section (`cta`)

```yaml
- type: cta
  title: Call to Action Title  # Required
  description: Supporting text to encourage action  # Required
  center_content: true  # Optional, centers the content
  image:  # Optional
    url: /path/to/image.jpg  # Required if image is provided
    alt: Image description  # Optional
  primary_button:  # Optional
    text: Primary Button  # Required if primary_button is provided
    url: /primary-link/  # Required if primary_button is provided
  secondary_button:  # Optional
    text: Secondary Button  # Required if secondary_button is provided
    url: /secondary-link/  # Required if secondary_button is provided
```

#### 5. Featured Cards (`featured_cards`)

```yaml
- type: featured_cards
  title: Section Title  # Optional
  cards:  # Required
    - title: Card Title  # Required
      description: Card description text  # Required
      url: /card-link/  # Required
      cta_text: Read More  # Optional, defaults to "Learn More"
      media_type: image  # Optional, e.g., 'image' or 'icon'
      image: /path/to/image.jpg  # Optional, used if media_type is image
      image_alt: Image description  # Optional, defaults to card title
      icon: icon-name  # Optional, used if media_type is icon
    # Add more cards as needed
```

#### 6. Contact Form (`contact_form`)

```yaml
- type: contact_form
  title: Contact Us  # Optional
  access_key: your_web3forms_access_key  # Required, from site.web3forms.access_key in _config.yml
  subject: Form Subject Line  # Optional
  hcaptcha_sitekey: your_hcaptcha_key  # Optional, from site.web3forms.hcaptcha_sitekey
```

#### 7. Contact Form with Socials (`contact_form_socials`)

```yaml
- type: contact_form_socials
  title: Get in Touch  # Optional
  heading: Connect With Us  # Optional
  access_key: your_web3forms_access_key  # Required, from site.web3forms.access_key in _config.yml
  subject: Contact Form Subject  # Optional
  hcaptcha_sitekey: your_hcaptcha_key  # Optional, from site.web3forms.hcaptcha_sitekey
  show_titles: true  # Optional, shows social media platform names
```

#### 8. Team Members (`team_members`)

```yaml
- type: team_members
  heading: Our Team  # Optional
  show_images: true  # Optional, boolean, defaults to true
  members:  # Required
    - name: Team Member Name  # Required
      title: Job Title  # Optional
      image: /path/to/image.jpg  # Optional, fallback to default avatar if not provided
      image_alt: Team member photo  # Optional
      bio: Short biography text  # Optional
    # Add more team members
```

### Blog Posts

Create blog posts in the `_posts` directory using the format `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: Post Title
date: 2023-06-01
image: /path/to/featured-image.jpg  # Optional
image_alt: Image description
tags: [tag1, tag2]  # Optional
---

Post content goes here in Markdown format.
```

## Deployment

### Automated Deployment with GitHub Actions

The demo includes a complete GitHub Actions workflow that:
- Builds the Jekyll site with Ruby 3.4
- Installs all required dependencies (including ImageMagick for image processing)
- Uses the latest Arbutus theme from GitHub
- Deploys via rsync to your server

#### Setup Instructions

1. **Configure Repository Secrets** in your GitHub repository settings:
   - `HOST`: Your server hostname or IP address
   - `USERNAME`: SSH username for your server
   - `SSH_KEY`: Your SSH private key (entire contents of your `.pem` or private key file)
   - `PORT`: SSH port (usually 22, but may be different for security)
   - `TARGET`: Target directory on your server (e.g., `/var/www/html` or `/home/user/public_html`)

2. **Update site URL** in `_config.yml`:

   ```yaml
   url: "https://yourdomain.com"  # Your actual domain
   baseurl: ""  # Leave empty for root domain, or "/subdirectory" for subdirectory
   ```

3. **Push to main branch** - deployment happens automatically on every push to `main`

#### Manual Deployment

For manual deployment or other hosting providers:

```bash
# Build the site
bundle exec jekyll build

# Upload the _site directory to your web server
rsync -avz --delete _site/ user@server:/path/to/web/directory/
```

### Hosting Recommendations

- **VPS/Dedicated Server**: Full control, works with the included GitHub Actions workflow
- **GitHub Pages**: Free hosting, but limited to safe plugins (theme features may be restricted)
- **Netlify**: Excellent for Jekyll sites, supports all theme features
- **Vercel**: Good alternative with similar features to Netlify

## Content Management with Decap CMS

### Admin Panel Access

Once deployed, access your admin panel at: `https://yourdomain.com/admin/`

### Setup Requirements

1. **Configure OAuth** for GitHub authentication:
   - Set up a GitHub OAuth App in your GitHub settings
   - Update `admin/config.yml` with your OAuth credentials
   - For local development, set `site_domain: "http://localhost:4000"`
   - For production, set `site_domain: "https://yourdomain.com"`

2. **Admin Configuration**: The `admin/config.yml` file is pre-configured for all theme components with:
   - Proper field validation (required/optional)
   - Rich text editing for markdown content
   - Image upload and management
   - Preview templates for all components

### Content Editing Features

- **Visual Previews**: Real-time preview of all theme components while editing
- **Media Management**: Upload and organize images directly in the CMS
- **Markdown Support**: Rich text editor with markdown preview
- **Component Library**: All 12 theme components available as reusable sections
- **SEO Fields**: Built-in meta description, social sharing, and SEO optimization

## Ruby Compatibility

This theme is compatible with Ruby 3.0+ and has been specifically updated for Ruby 3.4+. The GitHub Actions workflow automatically handles:

- Ruby 3.4 installation
- Required gems for Ruby 3.4+ compatibility (`csv`, `logger`, `base64`)
- ImageMagick for image processing
- All Jekyll plugins and dependencies

For local development, ensure you have Ruby 3.0 or higher installed.

## Image Credits

- [Chantal Michelle](https://pixabay.com/users/tsoh2018-16142604/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5970576)
- [Nanc](https://pixabay.com/users/nanc-387154/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=422203)
- [Beachfan1000](https://pixabay.com/users/beachfan1000-2050665/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1198592)
- [Jan Clark](https://pixabay.com/users/clark6918-12779880/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4274508)
- [Seval Torun](https://unsplash.com/@sevaltorun) on [Unsplash](https://unsplash.com/photos/a-small-tree-in-the-middle-of-a-rocky-area-mILclb9MtgU)
- [Jasper Garratt](https://unsplash.com/@jaspergarrattphotography) on [Unsplash](https://unsplash.com/photos/a-tree-on-a-rocky-island-81gqncU8uCo)
- [Annette Witteman](https://unsplash.com/@annettewitteman) on [Unsplash](https://unsplash.com/photos/a-view-of-a-body-of-water-with-trees-in-the-foreground-vJ2fK6r-MFU)
