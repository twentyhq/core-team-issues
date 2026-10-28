// Wraps <main data-active="..."> in the Twenty settings sidebar.
const ITEMS = [
  ['User', [['Profile', 'user'], ['Experience', 'settings'], ['Accounts', 'at']]],
  ['Workspace', [['General', 'settings'], ['Data model', 'cube'], ['Layout', 'layout-grid'], ['Members', 'users'], ['Billing', 'tag'], ['Developers', 'code'], ['Apps', 'apps'], ['AI', 'sparkles'], ['Communication', 'mail']]],
  ['Other', [['Admin Panel', 'shield'], ['Community', 'users-group'], ['Support', 'heart'], ['Documentation', 'file']]],
];
const main = document.querySelector('.main');
const active = main.dataset.active;
const side = document.createElement('div');
side.className = 'side';
side.innerHTML = '<div class="ws"><b>A</b>Acme</div>' + ITEMS.map(([group, links]) =>
  `<h6>${group}</h6>` + links.map(([label, icon]) =>
    `<a class="${label === active ? 'on' : ''}"><i class="ti ti-${icon}"></i>${label}</a>`).join('')).join('');
const app = document.createElement('div');
app.className = 'app';
main.replaceWith(app);
app.append(side, main);
