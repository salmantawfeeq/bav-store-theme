// A demo store's saved links use its published host. Keep the same store path
// on the active Salla preview host so navigation retains the draft theme.
export function resolvePreviewLink(href, currentUrl, storeUrl) {
  const current = new URL(currentUrl);
  if (current.hostname !== 'salla.design' && !current.hostname.endsWith('.salla.design')) return href;
  const base = new URL(storeUrl);
  let target;
  try { target = new URL(href, current); }
  catch { return href; }
  const path = base.pathname.replace(/\/$/, '');
  if (target.hostname !== 'demostore.salla.sa' || !path || (target.pathname !== path && !target.pathname.startsWith(path + '/'))) return href;
  target.protocol = current.protocol;
  target.host = current.host;
  return target.href;
}

export function initPreviewLinks(storeUrl) {
  if (location.hostname !== 'salla.design' && !location.hostname.endsWith('.salla.design')) return;
  const update = link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const resolved = resolvePreviewLink(href, location.href, storeUrl);
    if (resolved !== href) link.setAttribute('href', resolved);
  };
  const scan = node => {
    if (node.nodeType !== 1) return;
    if (node.matches('a[href]')) update(node);
    node.querySelectorAll('a[href]').forEach(update);
  };
  scan(document.body);
  new MutationObserver(records => records.forEach(record => {
    if (record.type === 'attributes') update(record.target);
    else record.addedNodes.forEach(scan);
  })).observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ['href']});
}
