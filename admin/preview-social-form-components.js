/**
 * Social and Form Components Preview Functions
 * Handles team members, social links, and contact forms
 */

/**
 * Renders a team section preview
 */
function renderTeamSection(section, index, getAsset) {
  var members = section.get("members");
  return h(
    "div",
    { key: index, className: "team-preview" },
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
                  src: member.get("image") ? getAsset(member.get("image")) : "",
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
}

/**
 * Renders a social links section preview
 */
function renderSocialLinksSection(section, index) {
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
            fontSize: "1.5rem",
            fontWeight: "600",
          },
        },
        section.get("heading")
      ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: "#f8fafc",
          borderRadius: "0.5rem",
          border: "2px dashed #cbd5e1",
        },
      },
      h(
        "div",
        {
          style: {
            textAlign: "center",
          },
        },
        h(
          "p",
          {
            style: {
              margin: "0 0 0.5rem 0",
              color: "#495057",
              fontSize: "1rem",
              fontWeight: "500",
            },
          },
          "🔗 Social Links Section"
        ),
        h(
          "p",
          {
            style: {
              margin: "0",
              color: "#6c757d",
              fontSize: "0.875rem",
            },
          },
          "This section will display your site's social media links from the global configuration."
        ),
        section.get("show_titles") === false &&
          h(
            "p",
            {
              style: {
                margin: "0.5rem 0 0 0",
                fontSize: "0.75rem",
                color: "#6c757d",
                fontStyle: "italic",
              },
            },
            "Note: Platform titles will be hidden"
          )
      )
    )
  );
}

/**
 * Renders a contact form section preview
 */
function renderContactFormSection(section, index) {
  return h(
    "div",
    {
      key: index,
      className: "contact-form-preview",
      style: {
        backgroundColor: "#f8fafc",
        padding: "2rem",
        borderRadius: "0.5rem",
        border: "2px dashed #cbd5e1",
        textAlign: "center",
        marginBottom: "2rem",
      },
    },
    section.get("title") &&
      h(
        "h3",
        {
          style: {
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          },
        },
        section.get("title")
      ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        },
      },
      h(
        "p",
        {
          style: {
            margin: "0 0 0.5rem 0",
            fontSize: "0.875rem",
            color: "#495057",
            fontWeight: "500",
          },
        },
        "📧 Contact Form"
      ),
      h(
        "p",
        {
          style: {
            margin: "0",
            fontSize: "0.75rem",
            color: "#6c757d",
          },
        },
        "This section will display a contact form with the configured Web3Forms integration."
      ),
      section.get("show_titles") === false &&
        h(
          "p",
          {
            style: {
              margin: "0.5rem 0 0 0",
              fontSize: "0.7rem",
              color: "#6c757d",
              fontStyle: "italic",
            },
          },
          "Note: Platform titles will be hidden"
        )
    )
  );
}

/**
 * Renders a contact form with socials section preview
 */
function renderContactFormSocialsSection(section, index) {
  return h(
    "div",
    {
      key: index,
      className: "contact-form-socials-preview",
      style: {
        backgroundColor: "#f8fafc",
        padding: "2rem",
        borderRadius: "0.5rem",
        border: "2px dashed #cbd5e1",
        textAlign: "center",
        marginBottom: "2rem",
      },
    },
    section.get("title") &&
      h(
        "h3",
        {
          style: {
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          },
        },
        section.get("title")
      ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        },
      },
      h(
        "p",
        {
          style: {
            margin: "0 0 0.5rem 0",
            fontSize: "0.875rem",
            color: "#495057",
            fontWeight: "500",
          },
        },
        "📧 Contact Form with Social Links"
      ),
      h(
        "p",
        {
          style: {
            margin: "0 0 0.5rem 0",
            fontSize: "0.75rem",
            color: "#6c757d",
          },
        },
        "This section combines a contact form with social media links."
      ),
      section.get("heading") &&
        h(
          "p",
          {
            style: {
              margin: "0.5rem 0 0 0",
              fontSize: "0.7rem",
              color: "#495057",
              fontWeight: "500",
            },
          },
          "Social heading: " + section.get("heading")
        ),
      section.get("show_titles") === false &&
        h(
          "p",
          {
            style: {
              margin: "0.5rem 0 0 0",
              fontSize: "0.7rem",
              color: "#6c757d",
              fontStyle: "italic",
            },
          },
          "Note: Platform titles will be hidden"
        )
    )
  );
}

// Export social and form component functions
window.SocialFormPreviewComponents = {
  renderTeamSection,
  renderSocialLinksSection,
  renderContactFormSection,
  renderContactFormSocialsSection,
};
