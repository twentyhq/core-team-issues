// Wraps <main class="panel" data-active="..." data-role="reviewer|publisher"> in the Twenty Connect portal sidebar.
const panel = document.querySelector('.panel');
const active = panel.dataset.active;
const role = panel.dataset.role || 'reviewer';
const org = role === 'reviewer' ? ['T', 'Twenty'] : ['A', 'Acme'];
const groups = role === 'reviewer'
  ? [['', [['Licenses', 'key'], ['Organization', 'settings']]], ['App registry', [['Review queue', 'checklist', '4'], ['Apps', 'apps'], ['Publishers', 'building-store'], ['Feed', 'rss']]]]
  : [['', [['Licenses', 'key'], ['Organization', 'settings']]], ['Developers', [['My apps', 'apps'], ['Publisher identity', 'brand-github']]]];
const side = document.createElement('aside');
side.className = 'pside';
side.innerHTML = `<div class="ws" style="padding:4px 8px 12px"><span class="av">${org[0]}</span>${org[1]}</div>` +
  groups.map(([group, links]) => (group ? `<div class="grp">${group}</div>` : '') + links.map(([label, icon, count]) =>
    `<a class="${label === active ? 'on' : ''}"><i class="ti ti-${icon}"></i>${label}${count ? `<span class="tag blue" style="margin-left:auto;border-radius:8px;padding:0 6px">${count}</span>` : ''}</a>`).join('')).join('') +
  `<div class="foot"><a><span class="av round">${role === 'reviewer' ? 'M' : 'J'}</span>${role === 'reviewer' ? 'martin@twenty.com' : 'jane@acme.dev'}</a><a><i class="ti ti-logout"></i>Sign out</a></div>`;
const wrap = document.createElement('div');
wrap.className = 'portal';
panel.replaceWith(wrap);
wrap.append(side, panel);
