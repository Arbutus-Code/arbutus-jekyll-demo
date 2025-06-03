// updates-filter.js: Handles tag filtering on the updates/news page

document.addEventListener('DOMContentLoaded', function () {
  const tagLinks = document.querySelectorAll('.tag-link');
  const posts = document.querySelectorAll('.post-card');
  const allTagLink = document.getElementById('tag-all');

  function filterPosts(tag) {
    posts.forEach(post => {
      if (!tag || tag === 'all' || post.dataset.tags.split(' ').includes(tag)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
    // Highlight active tag
    tagLinks.forEach(link => link.classList.remove('active'));
    if (tag === 'all' && allTagLink) {
      allTagLink.classList.add('active');
    } else {
      document.querySelectorAll('.tag-link[data-tag="' + tag + '"]').forEach(link => link.classList.add('active'));
    }
  }

  tagLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const tag = this.dataset.tag;
      filterPosts(tag);
      // Optionally update hash
      window.location.hash = tag === 'all' ? '' : '#' + tag;
    });
  });

  // On page load, filter by hash if present
  if (window.location.hash) {
    const tag = window.location.hash.replace('#', '');
    filterPosts(tag);
  } else if (allTagLink) {
    allTagLink.classList.add('active');
  }
});
