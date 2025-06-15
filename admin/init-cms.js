// admin/init-cms.js
window.addEventListener("load", function () {
  if (window.CMS && window.CMS.initCMS) {
    const { initCMS } = window.CMS;
    console.log("Attempting CMS.init via init-cms.js (on window.load)");
    initCMS({
      config: {
        // By setting load_config_file: true (or omitting it, as true is the default
        // when a config object is passed to init), Decap CMS will attempt to
        // fetch /admin/config.yml.
        // We will need to ensure admin/config.yml exists and has the minimal content.
        load_config_file: true,
      },
    });
  } else {
    console.error("Decap CMS object or initCMS function not found in init-cms.js.");
    const rootDiv = document.getElementById('nc-root');
    if (rootDiv) {
      rootDiv.innerHTML = '<p style="padding: 20px; text-align: center; font-family: sans-serif;">Error: Decap CMS could not be loaded (initCMS not found). Please check the console.</p>';
    }
  }
});
