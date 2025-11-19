document.addEventListener('DOMContentLoaded', () => {
  const yearTarget = document.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const linkPathRaw = link.getAttribute('href');
    const linkPath = (linkPathRaw === '/' ? '/' : linkPathRaw.replace(/index\.html$/, '').replace(/\/$/, ''));
    const isActive = linkPath === '/'
      ? currentPath === '/'
      : currentPath === linkPath || currentPath.startsWith(linkPath);
    link.dataset.active = String(isActive);
  });
});
