// admin/init-cms.js
if (window.CMS && window.CMS.initCMS) {
  const { initCMS } = window.CMS;
  console.log("Attempting CMS.init via init-cms.js (deferred script)");
  initCMS({
    config: {
      load_config_file: true,
    },
  });
} else {
  console.error(
    "Decap CMS object or initCMS function not found in init-cms.js (deferred script)."
  );
  const rootDiv = document.getElementById("nc-root");
  if (rootDiv) {
    rootDiv.innerHTML =
      '<p style="padding: 20px; text-align: center; font-family: sans-serif;">Error: Decap CMS could not be loaded (initCMS not found - deferred). Please check the console.</p>';
  }
}
