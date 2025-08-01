/**
 * Content Components Preview Functions
 * Handles text, image, and content-focused sections
 */

/**
 * Renders a text section preview
 */
function renderTextSection(section, index) {
  return h(
    "div",
    {
      key: index,
      className: "text-section-preview",
      style: {
        padding: "2rem 0",
        marginBottom: "2rem",
      },
    },
    section.get("heading") &&
      h(
        "h3",
        {
          style: {
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
            textAlign: "center",
          },
        },
        section.get("heading")
      ),
    section.get("text") &&
      h(
        "div",
        {
          style: {
            fontSize: "1.125rem",
            lineHeight: "1.6",
            color: "#374151",
            maxWidth: "800px",
            margin: "0 auto",
          },
        },
        section.get("text")
      )
  );
}

/**
 * Renders an image section preview
 */
function renderImageSection(section, index, getAsset) {
  return h(
    "div",
    {
      key: index,
      className: "image-preview",
      style: {
        textAlign: "center",
        marginBottom: "2rem",
      },
    },
    section.get("src") &&
      h(
        section.get("caption") ? "figure" : "div",
        {
          style: {
            display: "inline-block",
            maxWidth: "100%",
          },
        },
        h("img", {
          src: getAsset(section.get("src")),
          alt: section.get("alt") || "Image",
          style: {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "0.5rem",
            width: section.get("width") || "auto",
            height: section.get("height") || "auto",
          },
        }),
        section.get("caption") &&
          h(
            "figcaption",
            {
              style: {
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.5rem",
                fontStyle: "italic",
              },
            },
            section.get("caption")
          )
      )
  );
}

/**
 * Renders a split section preview
 */
function renderSplitSection(section, index, getAsset) {
  return h(
    "div",
    {
      key: index,
      className: "split-preview",
      style: {
        display: "grid",
        gridTemplateColumns: section.get("image_position") === "right" ? "1fr 1fr" : "1fr 1fr",
        gap: "2rem",
        alignItems: "center",
        padding: "2rem 0",
        marginBottom: "2rem",
      },
    },
    section.get("image_position") === "right" ? [
      h(
        "div",
        { key: "content" },
        section.get("heading") &&
          h(
            "h3",
            {
              style: {
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "1rem",
              },
            },
            section.get("heading")
          ),
        section.get("text") &&
          h(
            "div",
            {
              style: {
                fontSize: "1.125rem",
                lineHeight: "1.6",
                color: "#374151",
              },
            },
            section.get("text")
          )
      ),
      section.get("image") &&
        h(
          "div",
          { key: "image", style: { textAlign: "center" } },
          h("img", {
            src: getAsset(section.get("image")),
            alt: section.get("image_alt") || "Split section image",
            style: {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
            },
          }),
          section.get("image_caption") &&
            h(
              "p",
              {
                style: {
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginTop: "0.5rem",
                  fontStyle: "italic",
                },
              },
              section.get("image_caption")
            )
        ),
    ] : [
      section.get("image") &&
        h(
          "div",
          { key: "image", style: { textAlign: "center" } },
          h("img", {
            src: getAsset(section.get("image")),
            alt: section.get("image_alt") || "Split section image",
            style: {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
            },
          }),
          section.get("image_caption") &&
            h(
              "p",
              {
                style: {
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginTop: "0.5rem",
                  fontStyle: "italic",
                },
              },
              section.get("image_caption")
            )
        ),
      h(
        "div",
        { key: "content" },
        section.get("heading") &&
          h(
            "h3",
            {
              style: {
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "1rem",
              },
            },
            section.get("heading")
          ),
        section.get("text") &&
          h(
            "div",
            {
              style: {
                fontSize: "1.125rem",
                lineHeight: "1.6",
                color: "#374151",
              },
            },
            section.get("text")
          )
      ),
    ]
  );
}

// Export content component functions
window.ContentPreviewComponents = {
  renderTextSection,
  renderImageSection,
  renderSplitSection,
};
