require 'yaml'
require 'fileutils'
require 'json'
require 'mini_magick'

Jekyll::Hooks.register :site, :after_init do |site|
  yaml_path = File.join(site.source, '_data', 'favicon_settings.yml')
  
  if File.exist?(yaml_path)
    begin
      settings = YAML.load_file(yaml_path)
      
      favicon_source_dir = File.join(site.source, 'assets', 'media', 'favicons')
      site_root = site.source
      
      favicons_data = []
      
      if settings['favicon_ico']
        ico_path = settings['favicon_ico'].split('/').last
        source_path = File.join(favicon_source_dir, ico_path)
        dest_path = File.join(site_root, 'favicon.ico')
        if File.exist?(source_path)
          FileUtils.cp(source_path, dest_path)
          Jekyll.logger.info "Favicon Generator:", "Copied favicon.ico to site root"
          
          favicons_data << {
            'rel' => 'icon',
            'type' => 'image/x-icon',
            'href' => '/favicon.ico'
          }
        end
      end
      
      if settings['favicon_svg']
        svg_path = settings['favicon_svg'].split('/').last
        source_path = File.join(favicon_source_dir, svg_path)
        dest_path = File.join(site_root, 'favicon.svg')
        if File.exist?(source_path)
          FileUtils.cp(source_path, dest_path)
          Jekyll.logger.info "Favicon Generator:", "Copied favicon.svg to site root"
          
          favicons_data << {
            'rel' => 'icon',
            'type' => 'image/svg+xml',
            'href' => '/favicon.svg'
          }
        end
      end
      
      if settings['favicon_png']
        png_path = settings['favicon_png'].split('/').last
        source_path = File.join(favicon_source_dir, png_path)
        
        if File.exist?(source_path)
          begin
            favicon_sizes = [
              { name: 'favicon-16x16.png', size: '16x16', rel: 'icon' },
              { name: 'favicon-32x32.png', size: '32x32', rel: 'icon' },
              { name: 'apple-touch-icon.png', size: '180x180', rel: 'apple-touch-icon' },
              { name: 'android-chrome-192x192.png', size: '192x192', rel: nil },
              { name: 'android-chrome-512x512.png', size: '512x512', rel: nil }
            ]
            
            favicon_sizes.each do |favicon|
              image = MiniMagick::Image.open(source_path)
              
              dimensions = favicon[:size].split('x').map(&:to_i)
              image.resize "#{dimensions[0]}x#{dimensions[1]}!"
              
              dest_path = File.join(site_root, favicon[:name])
              image.write dest_path
              
              if favicon[:rel]
                favicons_data << {
                  'rel' => favicon[:rel],
                  'type' => 'image/png',
                  'sizes' => favicon[:size],
                  'href' => "/#{favicon[:name]}"
                }
              end
            end
            
            Jekyll.logger.info "Favicon Generator:", "Resized PNG favicons to various sizes"
          rescue => e
            Jekyll.logger.error "Favicon Generator:", "Error resizing images: #{e.message}"
          end
        end
      end
      
      if settings['manifest']
        manifest_data = {
          'name' => settings['manifest']['name'],
          'short_name' => settings['manifest']['short_name'],
          'icons' => [
            {
              'src' => '/android-chrome-192x192.png',
              'sizes' => '192x192',
              'type' => 'image/png'
            },
            {
              'src' => '/android-chrome-512x512.png',
              'sizes' => '512x512',
              'type' => 'image/png'
            }
          ],
          'theme_color' => settings['manifest']['theme_color'],
          'background_color' => settings['manifest']['background_color'],
          'display' => settings['manifest']['display']
        }
        
        File.write(File.join(site_root, 'site.webmanifest'), JSON.pretty_generate(manifest_data))
        Jekyll.logger.info "Favicon Generator:", "Generated site.webmanifest"
        
        favicons_data << {
          'rel' => 'manifest',
          'href' => '/site.webmanifest'
        }
      end
      
      File.write(File.join(site.source, '_data', 'favicons.yml'), favicons_data.to_yaml)
      Jekyll.logger.info "Favicon Generator:", "Generated _data/favicons.yml for templates"
      
    rescue => e
      Jekyll.logger.error "Favicon Generator:", "Error generating favicons: #{e.message}"
    end
  else
    Jekyll.logger.warn "Favicon Generator:", "_data/favicon_settings.yml not found, skipping favicon generation"
  end
end
