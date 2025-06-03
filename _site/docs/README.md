# Arbutus Jekyll Theme Demo Site

This repository contains a complete demo site for the Arbutus Jekyll Theme. It showcases all available components, layouts, and features of the theme in a fictional conservation organization website.

## Getting Started

To use this demo as a starting point for your own site, follow these steps:

### 1. Basic Setup

1. Clone or download this repository
2. Update the `_config.yml` file with your site information
3. Replace the favicon and logo files with your own
4. Customize the content in the Markdown files
5. Run `bundle install` and `bundle exec jekyll serve` to preview your site

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

Replace the following files with your own versions:

- `favicon.ico` - 16x16, 32x32 ICO file
- `favicon.svg` - Vector version of your favicon
- `favicon-16x16.png` - 16x16 PNG version
- `favicon-32x32.png` - 32x32 PNG version
- `apple-touch-icon.png` - 180x180 PNG for iOS
- `apple-touch-icon-precomposed.png` - Alternative iOS icon
- `android-chrome-192x192.png` - 192x192 PNG for Android
- `android-chrome-512x512.png` - 512x512 PNG for Android

Update the `site.webmanifest` file with your site name and theme colors:

```json
{
  "name": "Your Site Name",
  "short_name": "Short Name",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#your-color-code",
  "background_color": "#your-color-code",
  "display": "standalone"
}
```

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

The demo includes a GitHub Actions workflow for deployment. To use it:

1. Update the `deploy.yml` file in `.github/workflows/`
2. Set the appropriate secrets in your GitHub repository:
   - `HOST`: Your server hostname
   - `USERNAME`: SSH username
   - `SSH_KEY`: SSH private key
   - `PORT`: SSH port (usually 22)
3. Update the target path in the workflow file

## Image Credits

- [Chantal Michelle](https://pixabay.com/users/tsoh2018-16142604/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5970576)
- [Nanc](https://pixabay.com/users/nanc-387154/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=422203)
- [Beachfan1000](https://pixabay.com/users/beachfan1000-2050665/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1198592)
- [Jan Clark](https://pixabay.com/users/clark6918-12779880/) on [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4274508)
- [Seval Torun](https://unsplash.com/@sevaltorun) on [Unsplash](https://unsplash.com/photos/a-small-tree-in-the-middle-of-a-rocky-area-mILclb9MtgU)
- [Jasper Garratt](https://unsplash.com/@jaspergarrattphotography) on [Unsplash](https://unsplash.com/photos/a-tree-on-a-rocky-island-81gqncU8uCo)
- [Annette Witteman](https://unsplash.com/@annettewitteman) on [Unsplash](https://unsplash.com/photos/a-view-of-a-body-of-water-with-trees-in-the-foreground-vJ2fK6r-MFU)
