/**
 * Custom Preview Templates for Decap CMS
 * Fixes the preview issue with variable type widgets (sections list)
 */

// Simple preview template using createClass API
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
            ? sections.map(function (section, index) {
                // Add null checks to prevent errors
                if (!section || typeof section.get !== "function") {
                  return h("div", { key: index }, "Invalid section data");
                }

                var sectionType = section.get("type");

                // Skip sections without a valid type
                if (!sectionType) {
                  return h("div", { key: index }, "Section missing type");
                }

                switch (sectionType) {
                  case "hero":
                    return h(
                      "div",
                      {
                        key: index,
                        className: "hero-preview",
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gap: "2rem",
                          padding: "2.5rem 1rem",
                          background:
                            "linear-gradient(45deg, #374151, #4b5563)",
                          color: "white",
                          borderRadius: "0.5rem",
                          marginBottom: "2rem",
                          "@media (min-width: 768px)": {
                            gridTemplateColumns: "1fr 1fr",
                            gap: "3rem",
                            padding: "3rem 1rem",
                            alignItems: "center",
                          },
                        },
                      },
                      h(
                        "div",
                        { style: { maxWidth: "37.5rem", margin: "0 auto" } },
                        h(
                          "h2",
                          {
                            style: {
                              fontSize: "2.5rem",
                              lineHeight: "1.2",
                              marginBottom: "1rem",
                              fontWeight: "700",
                            },
                          },
                          section.get("title")
                        ),
                        section.get("subtitle") &&
                          h(
                            "p",
                            {
                              style: {
                                fontSize: "1.25rem",
                                lineHeight: "1.6",
                                marginBottom: "2rem",
                                opacity: "0.9",
                              },
                            },
                            section.get("subtitle")
                          ),
                        section.getIn(["cta", "text"]) &&
                          h(
                            "button",
                            {
                              style: {
                                padding: "0.75rem 2rem",
                                backgroundColor: "white",
                                color: "#374151",
                                border: "none",
                                borderRadius: "0.5rem",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                              },
                            },
                            section.getIn(["cta", "text"])
                          )
                      ),
                      section.get("image") &&
                        h(
                          "div",
                          { style: { textAlign: "center" } },
                          h("img", {
                            src: section.get("image")
                              ? getAsset(section.get("image"))
                              : "",
                            alt:
                              section.get("image_alt") || section.get("title"),
                            style: {
                              maxWidth: "100%",
                              height: "auto",
                              borderRadius: "0.5rem",
                              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                            },
                          })
                        )
                    );

                  case "text_section":
                  case "text-section":
                    return h(
                      "div",
                      { key: index, className: "text-section-preview" },
                      section.get("heading") &&
                        h("h3", {}, section.get("heading")),
                      section.get("text") &&
                        h("div", {
                          dangerouslySetInnerHTML: {
                            __html: section.get("text"),
                          },
                        })
                    );

                  case "split":
                    return h(
                      "div",
                      { key: index, className: "split-section-preview" },
                      h(
                        "div",
                        {
                          style: {
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                          },
                        },
                        section.get("image") &&
                          h("img", {
                            src: section.get("image")
                              ? getAsset(section.get("image"))
                              : "",
                            alt:
                              section.get("image_alt") ||
                              section.get("heading"),
                            style: {
                              maxWidth: "200px",
                              height: "auto",
                              order:
                                section.get("image_position") === "right"
                                  ? 2
                                  : 1,
                            },
                          }),
                        h(
                          "div",
                          {
                            style: {
                              flex: 1,
                              order:
                                section.get("image_position") === "right"
                                  ? 1
                                  : 2,
                            },
                          },
                          section.get("heading") &&
                            h("h3", {}, section.get("heading")),
                          section.get("text") &&
                            h("div", {
                              dangerouslySetInnerHTML: {
                                __html: section.get("text"),
                              },
                            })
                        )
                      )
                    );

                  case "featured_cards":
                    var cards = section.get("cards");
                    return h(
                      "div",
                      { key: index, className: "featured-cards-preview" },
                      section.get("title") &&
                        h(
                          "h3",
                          {
                            style: {
                              fontSize: "2rem",
                              fontWeight: "700",
                              marginBottom: "2rem",
                              textAlign: "center",
                            },
                          },
                          section.get("title")
                        ),
                      h(
                        "div",
                        {
                          style: {
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: "1.5rem",
                            "@media (min-width: 768px)": {
                              gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "2rem",
                            },
                          },
                        },
                        cards &&
                          cards.map(function (card, cardIndex) {
                            return h(
                              "div",
                              {
                                key: cardIndex,
                                style: {
                                  background: "white",
                                  borderRadius: "1rem",
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                  overflow: "hidden",
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                  transition: "transform 0.2s, box-shadow 0.2s",
                                },
                              },
                              card.get("image") &&
                                card.get("media_type") !== "icon" &&
                                h(
                                  "div",
                                  {
                                    style: {
                                      width: "100%",
                                      height: "200px",
                                      overflow: "hidden",
                                    },
                                  },
                                  h("img", {
                                    src: card.get("image")
                                      ? getAsset(card.get("image"))
                                      : "",
                                    alt:
                                      card.get("image_alt") ||
                                      card.get("title"),
                                    style: {
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    },
                                  })
                                ),
                              h(
                                "div",
                                {
                                  style: {
                                    padding: "1.5rem",
                                    flex: "1",
                                    display: "flex",
                                    flexDirection: "column",
                                  },
                                },
                                card.get("media_type") === "icon" &&
                                  card.get("icon") &&
                                  h(
                                    "div",
                                    {
                                      style: {
                                        fontSize: "2.5rem",
                                        marginBottom: "1rem",
                                        textAlign: "center",
                                        color: "#6b7280",
                                      },
                                    },
                                    "📦"
                                  ), // Placeholder icon
                                h(
                                  "h4",
                                  {
                                    style: {
                                      fontSize: "1.25rem",
                                      fontWeight: "600",
                                      marginBottom: "0.75rem",
                                      color: "#1f2937",
                                    },
                                  },
                                  card.get("title")
                                ),
                                h(
                                  "p",
                                  {
                                    style: {
                                      fontSize: "1rem",
                                      lineHeight: "1.6",
                                      color: "#6b7280",
                                      marginBottom: "1.5rem",
                                      flex: "1",
                                    },
                                  },
                                  card.get("description")
                                ),
                                h(
                                  "button",
                                  {
                                    style: {
                                      padding: "0.75rem 1.5rem",
                                      backgroundColor: "#374151",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "0.5rem",
                                      fontSize: "0.875rem",
                                      fontWeight: "600",
                                      cursor: "pointer",
                                      alignSelf: "flex-start",
                                    },
                                  },
                                  card.get("cta_text") || "Learn More"
                                )
                              )
                            );
                          })
                      )
                    );

                  case "cta":
                    return h(
                      "div",
                      {
                        key: index,
                        className: "cta-preview",
                        style: {
                          padding: "3rem 2rem",
                          background:
                            "linear-gradient(135deg, #f7f9fb 0%, #e8f4f8 100%)",
                          borderRadius: "1rem",
                          textAlign: section.get("center_content")
                            ? "center"
                            : "left",
                          margin: "2rem 0",
                          display: "grid",
                          gridTemplateColumns: section.get("image")
                            ? "1fr 1fr"
                            : "1fr",
                          gap: "2rem",
                          alignItems: "center",
                        },
                      },
                      h(
                        "div",
                        {},
                        section.get("title") &&
                          h(
                            "h3",
                            {
                              style: {
                                fontSize: "2.25rem",
                                fontWeight: "700",
                                marginBottom: "1rem",
                                color: "#1f2937",
                              },
                            },
                            section.get("title")
                          ),
                        section.get("description") &&
                          h(
                            "p",
                            {
                              style: {
                                fontSize: "1.125rem",
                                lineHeight: "1.6",
                                marginBottom: "2rem",
                                color: "#6b7280",
                              },
                            },
                            section.get("description")
                          ),
                        h(
                          "div",
                          {
                            style: {
                              display: "flex",
                              gap: "1rem",
                              justifyContent: section.get("center_content")
                                ? "center"
                                : "flex-start",
                              flexWrap: "wrap",
                            },
                          },
                          section.getIn(["primary_button", "text"]) &&
                            h(
                              "button",
                              {
                                style: {
                                  padding: "0.75rem 2rem",
                                  backgroundColor: "#374151",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "0.5rem",
                                  fontSize: "1rem",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                },
                              },
                              section.getIn(["primary_button", "text"])
                            ),
                          section.getIn(["secondary_button", "text"]) &&
                            h(
                              "button",
                              {
                                style: {
                                  padding: "0.75rem 2rem",
                                  backgroundColor: "transparent",
                                  color: "#374151",
                                  border: "2px solid #374151",
                                  borderRadius: "0.5rem",
                                  fontSize: "1rem",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                },
                              },
                              section.getIn(["secondary_button", "text"])
                            )
                        )
                      ),
                      section.get("image") &&
                        h(
                          "div",
                          { style: { textAlign: "center" } },
                          h("img", {
                            src: section.get("image")
                              ? getAsset(section.get("image"))
                              : "",
                            alt:
                              section.get("image_alt") || section.get("title"),
                            style: {
                              maxWidth: "100%",
                              height: "auto",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            },
                          })
                        )
                    );

                  case "team":
                  case "team_members":
                    var members = section.get("members");
                    return h(
                      "div",
                      { key: index, className: "team-preview" },
                      section.get("title") &&
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
                          section.get("title")
                        ),
                      section.get("description") &&
                        h(
                          "p",
                          {
                            style: {
                              fontSize: "1.125rem",
                              lineHeight: "1.6",
                              textAlign: "center",
                              marginBottom: "2rem",
                              color: "#6b7280",
                            },
                          },
                          section.get("description")
                        ),
                      h(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "2rem",
                          },
                        },
                        members &&
                          members.map(function (member, memberIndex) {
                            return h(
                              "div",
                              {
                                key: memberIndex,
                                style: {
                                  flex: "1 1 210px",
                                  maxWidth: "25rem",
                                  background: "#f7f9fb",
                                  borderRadius: "1rem",
                                  padding: "1.2rem 1rem",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                  textAlign: "center",
                                },
                              },
                              section.get("show_images") !== false &&
                                member.get("image") &&
                                h(
                                  "div",
                                  {
                                    style: {
                                      width: "7rem",
                                      height: "7rem",
                                      marginBottom: "0.7rem",
                                    },
                                  },
                                  h("img", {
                                    src: member.get("image")
                                      ? getAsset(member.get("image"))
                                      : "",
                                    alt: member.get("name"),
                                    style: {
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      background: "#e0e0e0",
                                    },
                                  })
                                ),
                              h(
                                "h4",
                                {
                                  style: {
                                    fontWeight: "600",
                                    fontSize: "1.1rem",
                                    marginBottom: "0.2rem",
                                  },
                                },
                                member.get("name")
                              ),
                              member.get("title") &&
                                h(
                                  "p",
                                  {
                                    style: {
                                      color: "#6b7280",
                                      fontSize: "0.98rem",
                                      marginBottom: "0.5rem",
                                    },
                                  },
                                  member.get("title")
                                ),
                              member.get("bio") &&
                                h(
                                  "p",
                                  {
                                    style: {
                                      fontSize: "0.9rem",
                                      lineHeight: "1.5",
                                      color: "#6b7280",
                                    },
                                  },
                                  member.get("bio")
                                )
                            );
                          })
                      )
                    );

                  case "social_links":
                    // Match theme implementation: use section socials or fall back to global site socials
                    var sectionSocials = section.get("socials");
                    var showTitles = section.get("show_titles");

                    // In real theme, this would use site.socials as fallback, but in preview we only have section data
                    // Show a note if no socials are defined in the section
                    if (!sectionSocials || sectionSocials.size === 0) {
                      return h(
                        "div",
                        { key: index, className: "social-links-preview" },
                        section.get("heading") &&
                          h(
                            "h3",
                            {
                              style: {
                                textAlign: "center",
                                marginBottom: "1rem",
                              },
                            },
                            section.get("heading")
                          ),
                        h(
                          "div",
                          {
                            style: {
                              textAlign: "center",
                              padding: "2rem",
                              backgroundColor: "#f8f9fa",
                              borderRadius: "8px",
                              border: "2px dashed #dee2e6",
                            },
                          },
                          h(
                            "p",
                            { style: { margin: "0", color: "#6c757d" } },
                            "Social links will display from site configuration (site.socials)"
                          ),
                          h(
                            "p",
                            {
                              style: {
                                margin: "0.5rem 0 0 0",
                                fontSize: "0.875rem",
                                color: "#6c757d",
                              },
                            },
                            "Or add custom social links in this section to override global settings"
                          )
                        )
                      );
                    }

                    return h(
                      "div",
                      { key: index, className: "social-links-preview" },
                      section.get("heading") &&
                        h(
                          "h3",
                          {
                            style: {
                              textAlign: "center",
                              marginBottom: "1rem",
                            },
                          },
                          section.get("heading")
                        ),
                      h(
                        "div",
                        {
                          style: {
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginTop: "15px",
                          },
                        },
                        sectionSocials.map(function (social, socialIndex) {
                          // Add null checks for social data
                          if (!social || typeof social.get !== "function") {
                            return h(
                              "div",
                              { key: socialIndex },
                              "Invalid social data"
                            );
                          }

                          return h(
                            "div",
                            {
                              key: socialIndex,
                              style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "8px",
                              },
                            },
                            // Show title if enabled (default: true)
                            showTitles !== false &&
                              social.get("name") &&
                              h(
                                "h4",
                                {
                                  style: {
                                    margin: "0",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    color: "#495057",
                                  },
                                },
                                social.get("name")
                              ),
                            h(
                              "a",
                              {
                                href: social.get("url") || "#",
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#f8f9fa",
                                  borderRadius: "50%",
                                  textDecoration: "none",
                                  color: "#495057",
                                  border: "1px solid #dee2e6",
                                  transition: "all 0.2s ease",
                                },
                              },
                              // Use icon name to show which social platform
                              h(
                                "span",
                                {
                                  style: { fontSize: "18px" },
                                  title: social.get("icon") || "social",
                                },
                                social.get("icon") === "twitter"
                                  ? "🐦"
                                  : social.get("icon") === "facebook"
                                  ? "📘"
                                  : social.get("icon") === "instagram"
                                  ? "📷"
                                  : social.get("icon") === "linkedin"
                                  ? "💼"
                                  : social.get("icon") === "youtube"
                                  ? "📺"
                                  : social.get("icon") === "github"
                                  ? "🐙"
                                  : social.get("icon") === "email"
                                  ? "✉️"
                                  : "🔗"
                              )
                            )
                          );
                        })
                      )
                    );

                  case "contact_form":
                    return h(
                      "div",
                      { key: index, className: "contact-form-preview" },
                      section.get("title") && h("h3", {}, section.get("title")),
                      section.get("description") &&
                        h("p", {}, section.get("description")),
                      h(
                        "div",
                        {
                          style: {
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "8px",
                            backgroundColor: "#f8f9fa",
                            marginTop: "15px",
                          },
                        },
                        h(
                          "div",
                          { style: { marginBottom: "15px" } },
                          h(
                            "label",
                            {
                              style: { display: "block", marginBottom: "5px" },
                            },
                            "Name"
                          ),
                          h("input", {
                            type: "text",
                            style: {
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            },
                          })
                        ),
                        h(
                          "div",
                          { style: { marginBottom: "15px" } },
                          h(
                            "label",
                            {
                              style: { display: "block", marginBottom: "5px" },
                            },
                            "Email"
                          ),
                          h("input", {
                            type: "email",
                            style: {
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            },
                          })
                        ),
                        h(
                          "div",
                          { style: { marginBottom: "15px" } },
                          h(
                            "label",
                            {
                              style: { display: "block", marginBottom: "5px" },
                            },
                            "Message"
                          ),
                          h("textarea", {
                            rows: 4,
                            style: {
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            },
                          })
                        ),
                        h(
                          "button",
                          {
                            style: {
                              padding: "10px 20px",
                              backgroundColor: "#007cba",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                            },
                          },
                          section.get("submit_text") || "Send Message"
                        )
                      )
                    );

                  case "contact_form_socials":
                    return h(
                      "div",
                      { key: index, className: "contact-form-socials-preview" },
                      section.get("title") && h("h3", {}, section.get("title")),
                      section.get("description") &&
                        h("p", {}, section.get("description")),
                      h(
                        "div",
                        {
                          style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "30px",
                            marginTop: "20px",
                          },
                        },
                        // Contact form column
                        h(
                          "div",
                          {
                            style: {
                              border: "1px solid #ddd",
                              padding: "20px",
                              borderRadius: "8px",
                              backgroundColor: "#f8f9fa",
                            },
                          },
                          h("h4", {}, "Contact Form"),
                          h(
                            "div",
                            { style: { marginBottom: "10px" } },
                            h("input", {
                              type: "text",
                              placeholder: "Name",
                              style: {
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "10px",
                              },
                            })
                          ),
                          h(
                            "div",
                            { style: { marginBottom: "10px" } },
                            h("input", {
                              type: "email",
                              placeholder: "Email",
                              style: {
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "10px",
                              },
                            })
                          ),
                          h("textarea", {
                            placeholder: "Message",
                            rows: 3,
                            style: {
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              marginBottom: "10px",
                            },
                          }),
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
                            "Send"
                          )
                        ),
                        // Social links column - matches theme implementation
                        h(
                          "div",
                          {},
                          h(
                            "h4",
                            { style: { marginBottom: "1rem" } },
                            section.get("heading") || "Connect With Us"
                          ),
                          // In real theme, this uses {% include social-links.html socials=include.socials %}
                          // Show appropriate message based on whether section has custom socials
                          section.get("socials") &&
                            section.get("socials").size > 0
                            ? // Custom socials defined in section
                              h(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  },
                                },
                                section
                                  .get("socials")
                                  .map(function (social, socialIndex) {
                                    // Add null checks for social data
                                    if (
                                      !social ||
                                      typeof social.get !== "function"
                                    ) {
                                      return h(
                                        "div",
                                        { key: socialIndex },
                                        "Invalid social data"
                                      );
                                    }

                                    return h(
                                      "div",
                                      {
                                        key: socialIndex,
                                        style: {
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "10px",
                                        },
                                      },
                                      // Show title if show_titles is not false
                                      section.get("show_titles") !== false &&
                                        social.get("name") &&
                                        h(
                                          "h4",
                                          {
                                            style: {
                                              margin: "0 0 4px 0",
                                              fontSize: "0.875rem",
                                              fontWeight: "600",
                                            },
                                          },
                                          social.get("name")
                                        ),
                                      h(
                                        "a",
                                        {
                                          href: social.get("url") || "#",
                                          style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "32px",
                                            height: "32px",
                                            backgroundColor: "#f8f9fa",
                                            borderRadius: "50%",
                                            textDecoration: "none",
                                            color: "#495057",
                                            border: "1px solid #dee2e6",
                                          },
                                        },
                                        h(
                                          "span",
                                          {
                                            style: { fontSize: "16px" },
                                            title:
                                              social.get("icon") || "social",
                                          },
                                          social.get("icon") === "twitter"
                                            ? "🐦"
                                            : social.get("icon") === "facebook"
                                            ? "📘"
                                            : social.get("icon") === "instagram"
                                            ? "📷"
                                            : social.get("icon") === "linkedin"
                                            ? "💼"
                                            : social.get("icon") === "youtube"
                                            ? "📺"
                                            : social.get("icon") === "github"
                                            ? "🐙"
                                            : social.get("icon") === "email"
                                            ? "✉️"
                                            : "🔗"
                                        )
                                      )
                                    );
                                  })
                              )
                            : // No custom socials - show note about global site socials
                              h(
                                "div",
                                {
                                  style: {
                                    padding: "1rem",
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "6px",
                                    border: "1px dashed #dee2e6",
                                    textAlign: "center",
                                  },
                                },
                                h(
                                  "p",
                                  {
                                    style: {
                                      margin: "0",
                                      fontSize: "0.875rem",
                                      color: "#6c757d",
                                    },
                                  },
                                  "Social links from site configuration will appear here"
                                )
                              )
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
                      h("h4", {}, "Unknown Section Type: " + sectionType),
                      h(
                        "p",
                        {},
                        "This section type is not yet supported in the preview."
                      )
                    );
                }
              })
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
});

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
