// One Distribution tab rendered for both pages; VIEW is 'admin', 'publisher' or 'publisher-unlisted'.
const VIEW = window.VIEW;
const isAdmin = VIEW === 'admin';
const isUnlisted = VIEW === 'publisher-unlisted';

const crumbs = isAdmin
  ? 'Other <i class="ti ti-chevron-right"></i> Admin Panel - Apps <i class="ti ti-chevron-right"></i> <b>Postcard Sender</b>'
  : 'Workspace <i class="ti ti-chevron-right"></i> Developers <i class="ti ti-chevron-right"></i> <b>Postcard Sender</b>';

const listingCard = isUnlisted ? `
  <div class="row" style="padding:14px 16px;align-items:flex-start">
    <i class="ti ti-building-store" style="font-size:18px;color:#999;margin-top:2px"></i>
    <div style="flex:1;line-height:1.6">
      <div style="font-weight:500">Unlisted <span class="muted small" style="font-weight:400">· installable with the share link only</span></div>
      <div class="muted">Request a listing to appear in the marketplace. Twenty reviews the requirements below and your latest version (v1.2.0), then reviews every new version before workspaces get it.</div>
      <div class="muted small">1 requirement missing before you can request a listing</div>
    </div>
    <span class="btn primary" style="opacity:.5"><i class="ti ti-send"></i>Request listing</span>
  </div>` : `
  <div class="row" style="padding:14px 16px;align-items:flex-start">
    <i class="ti ti-building-store" style="font-size:18px;color:#18794e;margin-top:2px"></i>
    <div style="flex:1;line-height:1.6">
      <div style="font-weight:500">Listed <span class="tag green" style="margin-left:4px">Visible in the marketplace</span></div>
      <div class="muted">Listed on Sep 4, 2026 by Félix M. · Workspaces install and upgrade to <b style="color:#333">v1.1.3</b>, the latest approved version. v1.2.0 needs a decision.</div>
      ${isAdmin ? '<div class="muted small">Publisher verified via npm provenance · github.com/acme/twenty-postcard-sender · Owner workspace: Acme</div>' : ''}
    </div>
    ${isAdmin ? '<span class="btn danger"><i class="ti ti-eye-off"></i>Delist…</span>' : ''}
  </div>
  <div class="row" style="padding:12px 16px">
    <i class="ti ti-rosette-discount-check" style="font-size:18px;color:#999"></i>
    <div style="flex:1;line-height:1.6">
      <div style="font-weight:500">Official app</div>
      <div class="muted">${isAdmin
        ? 'Shown first in the marketplace with the Official badge. Reserve it for the reference app of an integration.'
        : 'Granted by Twenty to the reference app of an integration. Official apps are shown first with a badge.'}</div>
    </div>
    ${isAdmin ? '<div class="switch off"></div>' : '<span class="muted">Not official</span>'}
  </div>
  <div class="row" style="padding:12px 16px">
    <i class="ti ti-bolt" style="font-size:18px;color:#999"></i>
    <div style="flex:1;line-height:1.6">
      <div style="font-weight:500">Automatically submit new versions for review</div>
      <div class="muted">Each version published to npm is submitted as soon as the catalog sync records it.</div>
    </div>
    ${isAdmin ? '<span class="muted">On · set by the publisher</span>' : '<div class="switch"></div>'}
  </div>`;

const check = (icon, label, ok, detail, extra = '') => `
  <div class="row"><span class="lab"><i class="ti ti-${icon}"></i>${label}</span>
  <span style="width:70px" class="${ok ? 'green' : 'red'}"><i class="ti ti-${ok ? 'check' : 'x'}"></i> ${ok ? (isAdmin ? 'Pass' : 'Ready') : 'Missing'}</span>
  <span class="val muted">${detail}</span>${extra}</div>`;

const requirements = `
  ${check('fingerprint', 'Publisher', true, 'Claimed with GitHub · provenance on every version since 1.1.0')}
  ${check('file-text', 'Listing & README', true, 'Logo, 3 gallery images, 640-word README')}
  ${check('tag', 'Pricing', !isUnlisted, isUnlisted ? 'Missing pricingDescription in defineApplication()' : 'Free, requires a paid Postcard.io account', isUnlisted ? '<span class="blue">How to fix</span>' : '')}
  ${check('lock', 'Privacy & terms', true, 'Terms URL and data-leaving section in README')}
  ${check('mail', 'Docs & support', true, 'support@acme.com · setup guide linked')}
  ${isAdmin ? check('bulb', 'Usefulness', true, 'Generic CRM task, not customer-specific · reviewed by Félix M.') : ''}`;

const version = (number, published, provenance, analysis, review, decided, menu = '') => `
  <tr><td class="mono" style="white-space:nowrap">${number}</td><td>${published}</td><td>${provenance}</td><td>${analysis}</td><td>${review}</td><td class="muted">${decided}</td>
  <td style="position:relative;text-align:right" class="muted"><i class="ti ti-dots"></i>${menu}</td></tr>`;

const adminMenu = `<div class="menu" style="right:0;top:30px;text-align:left;color:#333">
  <div><i class="ti ti-eye"></i>Open review</div><div><i class="ti ti-refresh"></i>Re-run analysis</div>
  <div><i class="ti ti-download"></i>Install in review workspace</div><div><i class="ti ti-file-zip"></i>Download artifact</div><hr>
  <div><i class="ti ti-check"></i>Approve…</div><div class="red"><i class="ti ti-x"></i>Reject…</div></div>`;
const publisherMenu = `<div class="menu" style="right:0;top:30px;text-align:left;color:#333">
  <div><i class="ti ti-eye"></i>Open review</div><div><i class="ti ti-player-play"></i>Run self-check</div><hr>
  <div class="red"><i class="ti ti-arrow-back-up"></i>Withdraw submission</div></div>`;
const provenance = (sha) => `<span class="green"><i class="ti ti-check"></i></span> <span class="mono">${sha}</span>`;
const unlistedVersions = isUnlisted;

const versions = `
  <table>
    <tr><th>Version</th><th>Published</th><th>Provenance</th><th>Analysis</th><th>Review</th><th>Decided by</th><th></th></tr>
    ${unlistedVersions ? `
      ${version('1.2.0', 'Oct 20, 2026', provenance('3f9c1e2'), '<span class="tag orange">2 warnings</span> <span class="muted small">self-check</span>', '<span class="muted">Not submitted</span>', '—')}
      ${version('1.1.3', 'Sep 2, 2026', provenance('a81b4c0'), '<span class="muted">—</span>', '<span class="muted">Not submitted</span>', '—')}`
    : `
      ${version('1.2.0', 'Oct 20, 2026', provenance('3f9c1e2'), '<span class="tag orange">2 warnings</span>', '<span class="blue dot">Needs decision</span>', '—', isAdmin ? adminMenu : publisherMenu)}
      ${version('1.1.3 <i class="ti ti-building-store green" title="Served"></i>', 'Sep 2, 2026', provenance('a81b4c0'), '<span class="green">Passed</span>', '<span class="green dot">Approved</span>', 'Félix M.')}
      ${version('1.1.2', 'Aug 14, 2026', provenance('77d0e91'), '<span class="tag red">1 blocking</span>', '<span class="tag red dot">Rejected</span>', 'Félix M.')}
      <tr><td></td><td colspan="6" style="padding-top:0"><div class="banner small" style="background:#fdecec;color:#b42318"><i class="ti ti-alert-triangle"></i><span><b>Reason:</b> requests the workspace-level admin permission, which no feature needs. Publish a new version requesting only the permissions it uses.</span></div></td></tr>
      ${version('1.1.0', 'Jul 30, 2026', provenance('c0ffee1'), '<span class="green">Passed</span>', '<span class="gray dot">Revoked</span>', 'Marie T.')}
      ${version('1.0.0', 'Jun 3, 2026', '<span class="orange"><i class="ti ti-alert-triangle"></i> No attestation</span>', '<span class="muted">—</span>', '<span class="muted">Not submitted</span>', '—')}`}
  </table>`;

const activity = `
  <div class="card">
    <div class="row"><span class="mono muted small" style="width:120px">Oct 20 14:09</span><span class="val">Analysis of v1.2.0 completed · 2 warnings</span><span class="muted small">System</span></div>
    <div class="row"><span class="mono muted small" style="width:120px">Oct 20 14:02</span><span class="val">v1.2.0 submitted for review (auto-submit)</span><span class="muted small">Catalog sync</span></div>
    <div class="row"><span class="mono muted small" style="width:120px">Sep 4 10:12</span><span class="val">Listing approved · v1.1.3 approved</span><span class="muted small">Félix M.</span></div>
    <div class="row"><span class="mono muted small" style="width:120px">Aug 15 09:40</span><span class="val">v1.1.2 rejected · “requests the workspace-level admin permission…”</span><span class="muted small">Félix M.</span></div>
  </div>`;

document.querySelector('.main').innerHTML = `
  <div class="crumbs">${crumbs}</div>
  <div class="head"><span class="logo" style="background:#e8590c">P</span>Postcard Sender ${isAdmin ? '' : '<span class="tag gray" style="font-weight:500">Owner</span>'}</div>
  <div class="tabs">
    <div class="tab"><i class="ti ti-info-circle"></i>General</div>
    <div class="tab"><i class="ti ti-key"></i>OAuth</div>
    <div class="tab on"><i class="ti ti-world"></i>Distribution</div>
    <div class="tab"><i class="ti ti-settings"></i>Config</div>
  </div>
  ${VIEW === 'admin' || VIEW === 'publisher' ? `<div class="legend"><i class="ti ti-layout-columns"></i>Same Distribution tab component on both pages. ${isAdmin ? 'Admin view: decision actions, Official switch, Usefulness check, row menu with Approve / Reject.' : 'Publisher view: request and withdraw actions, auto-submit switch, self-check; read-only Official state.'}</div>` : ''}
  <div class="content">
    <div class="new" data-new="NEW">
      <h2 style="margin-top:0">Marketplace listing</h2>
      <p class="desc">Listed apps are reviewed by Twenty and visible to every workspace in the marketplace. Each published version is reviewed on its own and never inherits a previous approval.</p>
      <div class="card">${listingCard}</div>
      <h2 style="margin-top:20px">Listing requirements</h2>
      <p class="desc">${isAdmin ? 'App-level checklist, recorded with the listing decision.' : 'Checked automatically; all must be ready before you can request a listing.'}</p>
      <div class="card">${requirements}</div>
    </div>
    <div class="new" data-new="NEW" style="margin-top:40px">
      <h2 style="margin-top:0;justify-content:space-between">Versions ${isAdmin ? '<span class="btn" style="font-weight:500"><i class="ti ti-refresh"></i>Sync catalog</span>' : '<span class="btn" style="font-weight:500"><i class="ti ti-player-play"></i>Run self-check on v1.2.0</span>'}</h2>
      <p class="desc">Immutable published versions. ${isUnlisted ? 'Versions are reviewed once the app is listed; a self-check runs the same analysis now.' : 'Only approved versions reach workspaces; installs and auto-upgrades resolve to the latest approved one.'}</p>
      ${versions}
    </div>
    <h2 style="margin-top:40px">Sharing</h2>
    <p class="desc">Anyone with the link can install the app, listed or not. Unlisted apps show a "not reviewed by Twenty" warning.</p>
    <span class="btn"><i class="ti ti-external-link"></i>See on marketplace</span> <span class="btn"><i class="ti ti-copy"></i>Copy share link</span>
    ${isUnlisted ? '' : `<div class="new" data-new="NEW" style="margin-top:40px"><h2 style="margin-top:0">Activity</h2><p class="desc">Every request, analysis, decision and revocation, with its actor and reason.</p>${activity}</div>`}
  </div>`;
