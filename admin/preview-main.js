/**
 * Main Preview Template Coordinator
 * Combines all modular preview components and registers the main template
 */

// Main preview template using createClass API
var PagePreview = createClass({
  render: function () {
    try {
      var entry = this.props.entry;
      var getAsset = this.props.getAsset;

      // Add null checks for entry data
      if (!entry || typeof entry.getIn !== "function") {
        return h(
          "div",
          { className: "cms-preview-error" },
          "Error: Invalid entry data"
        );
      }

      var title = entry.getIn(["data", "title"]) || "Untitled Page";
      var sections = entry.getIn(["data", "sections"]);

      return h(
        "div",
        { className: "cms-preview" },
        h("h1", { className: "page-title" }, title),
        h(
          "div",
          { className: "sections-preview" },
          sections
            ? sections.map(
                function (section, index) {
                  if (!section || typeof section.get !== "function") {
                    return h("div", { key: index }, "Invalid section data");
                  }

                  var sectionType = section.get("type");
                  
                  // Skip sections without a valid type
                  if (!sectionType) {
                    return h("div", { key: index }, "Section missing type");
                  }

                  // Route to appropriate component renderer
                  switch (sectionType) {
                    // Content Components
                    case "text-section":
                      return (
                        window.ContentPreviewComponents?.renderTextSection(
                          section,
                          index
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "image":
                      return (
                        window.ContentPreviewComponents?.renderImageSection(
                          section,
                          index,
                          getAsset
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "split":
                      return (
                        window.ContentPreviewComponents?.renderSplitSection(
                          section,
                          index,
                          getAsset
                        ) || this.renderFallback(sectionType, index)
                      );

                    // Interactive Components
                    case "hero":
                      return (
                        window.InteractivePreviewComponents?.renderHeroSection(
                          section,
                          index,
                          getAsset
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "cta":
                      return (
                        window.InteractivePreviewComponents?.renderCtaSection(
                          section,
                          index,
                          getAsset
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "featured_cards":
                      return (
                        window.InteractivePreviewComponents?.renderFeaturedCardsSection(
                          section,
                          index,
                          getAsset
                        ) || this.renderFallback(sectionType, index)
                      );

                    // Social & Form Components
                    case "team":
                    case "team_members":
                      return (
                        window.SocialFormPreviewComponents?.renderTeamSection(
                          section,
                          index,
                          getAsset
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "social_links":
                      return (
                        window.SocialFormPreviewComponents?.renderSocialLinksSection(
                          section,
                          index
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "contact_form":
                      return (
                        window.SocialFormPreviewComponents?.renderContactFormSection(
                          section,
                          index
                        ) || this.renderFallback(sectionType, index)
                      );
                    case "contact_form_socials":
                      return (
                        window.SocialFormPreviewComponents?.renderContactFormSocialsSection(
                          section,
                          index
                        ) || this.renderFallback(sectionType, index)
                      );

                    default:
                      return this.renderFallback(sectionType, index);
                  }
                }.bind(this)
              )
            : h("p", {}, "No sections found")
        )
      );
    } catch (error) {
      console.error("Preview template error:", error);
      return h(
        "div",
        { className: "cms-preview-error" },
        "Error rendering preview: " + (error.message || "Unknown error")
      );
    }
  },

  /**
   * Renders a fallback preview for unknown or unsupported section types
   */
  renderFallback: function (sectionType, index) {
    return h(
      "div",
      {
        key: index,
        style: {
          padding: "2rem",
          backgroundColor: "#f8fafc",
          border: "2px dashed #cbd5e1",
          borderRadius: "0.5rem",
          textAlign: "center",
          marginBottom: "2rem",
        },
      },
      h("h4", {}, "Section Type: " + sectionType),
      h(
        "p",
        { style: { color: "#6b7280", fontSize: "0.875rem" } },
        "This section type is not yet supported in the preview, but will render correctly on the live site."
      )
    );
  },
});

// Register the preview template
CMS.registerPreviewTemplate("pages", PagePreview);
