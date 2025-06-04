// Config for Decap CMS
window.CMS_MANUAL_INIT = true;

// Initialize the CMS
window.addEventListener('load', function() {
  CMS.init({
    config: {
      // Use the config.yml file for configuration
      load_config_file: true,
      // Make sure to include the base_url from your config.yml
      local_backend: true
    }
  });
});
