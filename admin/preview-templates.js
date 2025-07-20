/**
 * Custom Preview Templates for Decap CMS
 * Fixes the preview issue with variable type widgets (sections list)
 */

// Simple preview template using createClass API
var PagePreview = createClass({
  render: function() {
    var entry = this.props.entry;
    var getAsset = this.props.getAsset;
    var title = entry.getIn(['data', 'title']);
    var sections = entry.getIn(['data', 'sections']);
    
    return h('div', { className: 'cms-preview' },
      h('h1', { className: 'page-title' }, title),
      h('div', { className: 'sections-preview' },
        sections ? sections.map(function(section, index) {
          var sectionType = section.get('type');
          
          switch (sectionType) {
            case 'hero':
              return h('div', { key: index, className: 'hero-preview' },
                h('h2', {}, section.get('title')),
                section.get('subtitle') && h('p', {}, section.get('subtitle')),
                section.get('image') && h('img', {
                  src: getAsset(section.get('image')),
                  alt: section.get('image_alt') || section.get('title'),
                  style: { maxWidth: '200px', height: 'auto' }
                }),
                section.getIn(['cta', 'text']) && h('button', {}, section.getIn(['cta', 'text']))
              );
              
            case 'text_section':
            case 'text-section':
              return h('div', { key: index, className: 'text-section-preview' },
                section.get('heading') && h('h3', {}, section.get('heading')),
                section.get('text') && h('div', {
                  dangerouslySetInnerHTML: { __html: section.get('text') }
                })
              );
              
            case 'split':
              return h('div', { key: index, className: 'split-section-preview' },
                h('div', { style: { display: 'flex', gap: '20px', alignItems: 'center' } },
                  section.get('image') && h('img', {
                    src: getAsset(section.get('image')),
                    alt: section.get('image_alt') || section.get('heading'),
                    style: { 
                      maxWidth: '200px', 
                      height: 'auto',
                      order: section.get('image_position') === 'right' ? 2 : 1
                    }
                  }),
                  h('div', { 
                    style: { 
                      flex: 1,
                      order: section.get('image_position') === 'right' ? 1 : 2
                    }
                  },
                    section.get('heading') && h('h3', {}, section.get('heading')),
                    section.get('text') && h('div', {
                      dangerouslySetInnerHTML: { __html: section.get('text') }
                    })
                  )
                )
              );
              
            case 'featured_cards':
              var cards = section.get('cards');
              return h('div', { key: index, className: 'featured-cards-preview' },
                section.get('title') && h('h3', {}, section.get('title')),
                h('div', {
                  style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px'
                  }
                },
                  cards && cards.map(function(card, cardIndex) {
                    return h('div', {
                      key: cardIndex,
                      style: {
                        border: '1px solid #ddd',
                        padding: '15px',
                        borderRadius: '8px'
                      }
                    },
                      card.get('media_type') === 'icon' && card.get('icon') &&
                        h('div', { style: { fontSize: '24px', marginBottom: '10px' } },
                          'Icon: ' + card.get('icon')
                        ),
                      card.get('image') && card.get('media_type') !== 'icon' &&
                        h('img', {
                          src: getAsset(card.get('image')),
                          alt: card.get('image_alt') || card.get('title'),
                          style: {
                            maxWidth: '100%',
                            height: '150px',
                            objectFit: 'cover',
                            marginBottom: '10px'
                          }
                        }),
                      h('h4', {}, card.get('title')),
                      h('p', {}, card.get('description')),
                      h('button', {
                        style: {
                          padding: '8px 16px',
                          backgroundColor: '#007cba',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px'
                        }
                      }, card.get('cta_text') || 'Learn More')
                    );
                  })
                )
              );
              
            case 'cta':
              return h('div', {
                key: index,
                className: 'cta-preview',
                style: {
                  backgroundColor: '#f8f9fa',
                  padding: '30px',
                  textAlign: section.get('center_content') ? 'center' : 'left',
                  borderRadius: '8px',
                  margin: '20px 0'
                }
              },
                h('h3', {}, section.get('title')),
                h('p', {}, section.get('description')),
                section.getIn(['image', 'url']) && h('img', {
                  src: getAsset(section.getIn(['image', 'url'])),
                  alt: section.getIn(['image', 'alt']),
                  style: { maxWidth: '300px', height: 'auto', margin: '15px 0' }
                }),
                h('div', { style: { marginTop: '20px' } },
                  section.getIn(['primary_button', 'text']) && h('button', {
                    style: {
                      padding: '12px 24px',
                      backgroundColor: '#007cba',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      marginRight: '10px'
                    }
                  }, section.getIn(['primary_button', 'text'])),
                  section.getIn(['secondary_button', 'text']) && h('button', {
                    style: {
                      padding: '12px 24px',
                      backgroundColor: 'transparent',
                      color: '#007cba',
                      border: '2px solid #007cba',
                      borderRadius: '4px'
                    }
                  }, section.getIn(['secondary_button', 'text']))
                )
              );
              
            default:
              return h('div', {
                key: index,
                className: 'unknown-section-preview',
                style: {
                  padding: '20px',
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '4px',
                  margin: '10px 0'
                }
              },
                h('h4', {}, 'Unknown Section Type: ' + sectionType),
                h('p', {}, 'This section type is not yet supported in the preview.')
              );
          }
        }) : h('p', {}, 'No sections found')
      )
    );
  }
});

// Register the preview template
CMS.registerPreviewTemplate('pages', PagePreview);

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
