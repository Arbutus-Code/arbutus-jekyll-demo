/**
 * Custom Preview Templates for Decap CMS
 * Fixes the preview issue with variable type widgets (sections list)
 */

const h = CMS.h;

const PagePreview = ({ entry, widgetFor, widgetsFor, getAsset }) => {
  const title = entry.getIn(["data", "title"]);
  const sections = entry.getIn(["data", "sections"]);

  return h(
    "div",
    { className: "cms-preview" },
    h("h1", { className: "page-title" }, title),
    sections &&
      sections.map((section, index) => {
        const sectionType = section.get("type");
        const sectionData = section;

        switch (sectionType) {
          case "hero":
            return h(
              "div",
              { key: index, className: "hero-preview" },
              h("h2", {}, sectionData.get("title")),
              sectionData.get("subtitle") &&
                h("p", {}, sectionData.get("subtitle")),
              sectionData.get("image") &&
                h("img", {
                  src: getAsset(sectionData.get("image")),
                  alt: sectionData.get("image_alt") || sectionData.get("title"),
                  style: { maxWidth: "200px", height: "auto" },
                }),
              sectionData.getIn(["cta", "text"]) &&
                h("button", {}, sectionData.getIn(["cta", "text"]))
            );

          case "text_section":
          case "text-section":
            return h(
              "div",
              { key: index, className: "text-section-preview" },
              sectionData.get("heading") &&
                h("h3", {}, sectionData.get("heading")),
              sectionData.get("text") &&
                h("div", {
                  dangerouslySetInnerHTML: { __html: sectionData.get("text") },
                })
            );

          case "split":
            return h(
              "div",
              { key: index, className: "split-section-preview" },
              h(
                "div",
                {
                  style: { display: "flex", gap: "20px", alignItems: "center" },
                },
                sectionData.get("image") &&
                  h("img", {
                    src: getAsset(sectionData.get("image")),
                    alt:
                      sectionData.get("image_alt") ||
                      sectionData.get("heading"),
                    style: {
                      maxWidth: "200px",
                      height: "auto",
                      order:
                        sectionData.get("image_position") === "right" ? 2 : 1,
                    },
                  }),
                h(
                  "div",
                  {
                    style: {
                      flex: 1,
                      order:
                        sectionData.get("image_position") === "right" ? 1 : 2,
                    },
                  },
                  sectionData.get("heading") &&
                    h("h3", {}, sectionData.get("heading")),
                  sectionData.get("text") &&
                    h("div", {
                      dangerouslySetInnerHTML: {
                        __html: sectionData.get("text"),
                      },
                    })
                )
              )
            );

          case "featured_cards":
            const cards = sectionData.get("cards");
            return h(
              "div",
              { key: index, className: "featured-cards-preview" },
              sectionData.get("title") && h("h3", {}, sectionData.get("title")),
              h(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  },
                },
                cards &&
                  cards.map((card, cardIndex) =>
                    h(
                      "div",
                      {
                        key: cardIndex,
                        style: {
                          border: "1px solid #ddd",
                          padding: "15px",
                          borderRadius: "8px",
                        },
                      },
                      card.get("media_type") === "icon" &&
                        card.get("icon") &&
                        h(
                          "div",
                          { style: { fontSize: "24px", marginBottom: "10px" } },
                          `Icon: ${card.get("icon")}`
                        ),
                      card.get("image") &&
                        card.get("media_type") !== "icon" &&
                        h("img", {
                          src: getAsset(card.get("image")),
                          alt: card.get("image_alt") || card.get("title"),
                          style: {
                            maxWidth: "100%",
                            height: "150px",
                            objectFit: "cover",
                            marginBottom: "10px",
                          },
                        }),
                      h("h4", {}, card.get("title")),
                      h("p", {}, card.get("description")),
                      h(
                        "button",
                        {
                          style: {
                            padding: "8px 16px",
                            backgroundColor: "#007cba",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                          },
                        },
                        card.get("cta_text") || "Learn More"
                      )
                    )
                  )
              )
            );

          case "cta":
            return h(
              "div",
              {
                key: index,
                className: "cta-preview",
                style: {
                  backgroundColor: "#f8f9fa",
                  padding: "30px",
                  textAlign: sectionData.get("center_content")
                    ? "center"
                    : "left",
                  borderRadius: "8px",
                  margin: "20px 0",
                },
              },
              h("h3", {}, sectionData.get("title")),
              h("p", {}, sectionData.get("description")),
              sectionData.getIn(["image", "url"]) &&
                h("img", {
                  src: getAsset(sectionData.getIn(["image", "url"])),
                  alt: sectionData.getIn(["image", "alt"]),
                  style: {
                    maxWidth: "300px",
                    height: "auto",
                    margin: "15px 0",
                  },
                }),
              h(
                "div",
                { style: { marginTop: "20px" } },
                sectionData.getIn(["primary_button", "text"]) &&
                  h(
                    "button",
                    {
                      style: {
                        padding: "12px 24px",
                        backgroundColor: "#007cba",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        marginRight: "10px",
                      },
                    },
                    sectionData.getIn(["primary_button", "text"])
                  ),
                sectionData.getIn(["secondary_button", "text"]) &&
                  h(
                    "button",
                    {
                      style: {
                        padding: "12px 24px",
                        backgroundColor: "transparent",
                        color: "#007cba",
                        border: "2px solid #007cba",
                        borderRadius: "4px",
                      },
                    },
                    sectionData.getIn(["secondary_button", "text"])
                  )
              )
            );

          case "team":
          case "team_members":
            const members = sectionData.get("members");
            return h(
              "div",
              { key: index, className: "team-preview" },
              sectionData.get("heading") &&
                h("h3", {}, sectionData.get("heading")),
              h(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                  },
                },
                members &&
                  members.map((member, memberIndex) =>
                    h(
                      "div",
                      {
                        key: memberIndex,
                        style: { textAlign: "center", padding: "15px" },
                      },
                      sectionData.get("show_images") !== false &&
                        member.get("image") &&
                        h("img", {
                          src: getAsset(member.get("image")),
                          alt: member.get("name"),
                          style: {
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "10px",
                          },
                        }),
                      h("h4", {}, member.get("name")),
                      member.get("title") &&
                        h(
                          "p",
                          { style: { fontStyle: "italic", margin: "5px 0" } },
                          member.get("title")
                        ),
                      member.get("bio") &&
                        h(
                          "p",
                          { style: { fontSize: "14px" } },
                          member.get("bio")
                        )
                    )
                  )
              )
            );

          case "contact_form":
            return h(
              "div",
              {
                key: index,
                className: "contact-form-preview",
                style: {
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                },
              },
              sectionData.get("title") && h("h3", {}, sectionData.get("title")),
              h("p", {}, "Contact Form Preview"),
              h(
                "div",
                { style: { display: "grid", gap: "15px" } },
                h("input", {
                  placeholder: "Name",
                  style: { padding: "10px", border: "1px solid #ccc" },
                }),
                h("input", {
                  placeholder: "Email",
                  style: { padding: "10px", border: "1px solid #ccc" },
                }),
                h("input", {
                  placeholder: "Subject",
                  style: { padding: "10px", border: "1px solid #ccc" },
                }),
                h("textarea", {
                  placeholder: "Message",
                  style: {
                    padding: "10px",
                    border: "1px solid #ccc",
                    minHeight: "100px",
                  },
                }),
                h(
                  "button",
                  {
                    style: {
                      padding: "12px 24px",
                      backgroundColor: "#007cba",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    },
                  },
                  sectionData.get("submit_text") || "Send Message"
                )
              )
            );

          case "contact_form_socials":
            return h(
              "div",
              { key: index, className: "contact-form-socials-preview" },
              sectionData.get("title") && h("h3", {}, sectionData.get("title")),
              h(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "30px",
                  },
                },
                h(
                  "div",
                  {},
                  h("p", {}, "Contact Form"),
                  h(
                    "div",
                    { style: { display: "grid", gap: "10px" } },
                    h("input", {
                      placeholder: "Name",
                      style: { padding: "8px", border: "1px solid #ccc" },
                    }),
                    h("input", {
                      placeholder: "Email",
                      style: { padding: "8px", border: "1px solid #ccc" },
                    }),
                    h("textarea", {
                      placeholder: "Message",
                      style: {
                        padding: "8px",
                        border: "1px solid #ccc",
                        minHeight: "80px",
                      },
                    })
                  )
                ),
                h(
                  "div",
                  {},
                  h("p", {}, "Social Links"),
                  h(
                    "div",
                    { style: { display: "flex", gap: "10px" } },
                    h(
                      "span",
                      {
                        style: {
                          padding: "8px",
                          backgroundColor: "#007cba",
                          color: "white",
                          borderRadius: "4px",
                        },
                      },
                      "Twitter"
                    ),
                    h(
                      "span",
                      {
                        style: {
                          padding: "8px",
                          backgroundColor: "#007cba",
                          color: "white",
                          borderRadius: "4px",
                        },
                      },
                      "Facebook"
                    ),
                    h(
                      "span",
                      {
                        style: {
                          padding: "8px",
                          backgroundColor: "#007cba",
                          color: "white",
                          borderRadius: "4px",
                        },
                      },
                      "LinkedIn"
                    )
                  )
                )
              )
            );

          case "social_links":
            return h(
              "div",
              { key: index, className: "social-links-preview" },
              sectionData.get("heading") &&
                h("h3", {}, sectionData.get("heading")),
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                  },
                },
                h(
                  "span",
                  {
                    style: {
                      padding: "10px",
                      backgroundColor: "#007cba",
                      color: "white",
                      borderRadius: "4px",
                    },
                  },
                  "Twitter"
                ),
                h(
                  "span",
                  {
                    style: {
                      padding: "10px",
                      backgroundColor: "#007cba",
                      color: "white",
                      borderRadius: "4px",
                    },
                  },
                  "Facebook"
                ),
                h(
                  "span",
                  {
                    style: {
                      padding: "10px",
                      backgroundColor: "#007cba",
                      color: "white",
                      borderRadius: "4px",
                    },
                  },
                  "LinkedIn"
                ),
                h(
                  "span",
                  {
                    style: {
                      padding: "10px",
                      backgroundColor: "#007cba",
                      color: "white",
                      borderRadius: "4px",
                    },
                  },
                  "GitHub"
                )
              )
            );

          default:
            return h(
              "div",
              {
                key: index,
                className: "unknown-section-preview",
                style: {
                  padding: "20px",
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "4px",
                  margin: "10px 0",
                },
              },
              h("h4", {}, `Unknown Section Type: ${sectionType}`),
              h(
                "p",
                {},
                "This section type is not yet supported in the preview."
              )
            );
        }
      })
  );
};

// Register the preview template
CMS.registerPreviewTemplate("pages", PagePreview);

// Add custom styles for the preview
CMS.registerPreviewStyle(`
  .cms-preview {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .page-title {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }
  
  .hero-preview {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .text-section-preview, .split-section-preview, .featured-cards-preview, .team-preview {
    margin-bottom: 30px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
  
  .text-section-preview h3, .split-section-preview h3, .featured-cards-preview h3, .team-preview h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
`);
