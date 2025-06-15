window.CMS_MANUAL_INIT = true;

window.addEventListener("load", function () {
  CMS.init({
    config: {
      load_config_file: true,
    },
  });
});
