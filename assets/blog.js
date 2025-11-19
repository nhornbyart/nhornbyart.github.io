async function renderBlogList() {
  const listContainer = document.querySelector('[data-blog-list]');
  if (!listContainer) return;

  try {
    const response = await fetch('./posts.json');
    if (!response.ok) throw new Error('Could not load blog posts');
    const posts = await response.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      listContainer.innerHTML = '<p class="meta">No posts yet. Add one by editing <code>blog/posts.json</code>.</p>';
      return;
    }

    const html = posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((post) => `
        <article class="blog-card">
          <div class="meta">${new Date(post.date).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</div>
          <h3><a href="/blog/posts/${post.slug}.html">${post.title}</a></h3>
          <p>${post.summary}</p>
          <div class="badges">
            ${(post.tags || []).map((tag) => `<span class="badge">${tag}</span>`).join('')}
          </div>
        </article>
      `)
      .join('');

    listContainer.innerHTML = html;
  } catch (err) {
    listContainer.innerHTML = `<p class="meta">${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', renderBlogList);
