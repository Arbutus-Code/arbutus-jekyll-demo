console.log("CMS custom script loaded");

CMS.registerWidget(
  "text",
  window.DECAP_CMS_WIDGETS.text.control,
  window.DECAP_CMS_WIDGETS.text.preview
);
