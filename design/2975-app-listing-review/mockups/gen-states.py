# Generates workflow-states.html (SVG state machines).
BOXES = {}
PALETTE = {
    'gray': ('#fff', '#d6d6d6', '#333', '#999'),
    'blue': ('#fff', '#b8c9f5', '#333', '#999'),
    'green': ('#fff', '#9fd6b8', '#18794e', '#18794e'),
    'red': ('#fdf0f0', '#f0b9bb', '#d93036', '#d93036'),
    'orange': ('#fdf3e7', '#f2c79c', '#c2540a', '#c2540a'),
    'purple': ('#f6f0fd', '#d4bdf2', '#7e3cc6', '#7e3cc6'),
}
parts = []

def box(key, x, y, title, subtitle, color='gray', w=170):
    fill, stroke, titleColor, subColor = PALETTE[color]
    BOXES[key] = (x, y, w, 46)
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="46" rx="8" fill="{fill}" stroke="{stroke}"/>'
                 f'<text x="{x+w/2}" y="{y+19}" text-anchor="middle" font-weight="600" fill="{titleColor}">{title}</text>'
                 f'<text x="{x+w/2}" y="{y+36}" text-anchor="middle" font-size="11" fill="{subColor}">{subtitle}</text>')

def anchor(key, side):
    x, y, w, h = BOXES[key]
    return {'r': (x+w, y+h/2), 'l': (x, y+h/2), 't': (x+w/2, y), 'b': (x+w/2, y+h)}[side]

def arrow(points, label='', actor='', color='#999', dashed=False, labelAt=None):
    path = ' '.join(f'{"M" if i == 0 else "L"}{px},{py}' for i, (px, py) in enumerate(points))
    dash = ' stroke-dasharray="5 4"' if dashed else ''
    parts.append(f'<path d="{path}" fill="none" stroke="{color}" stroke-width="1.5"{dash} marker-end="url(#m{color[1:]})"/>')
    if label:
        lx, ly = labelAt or ((points[0][0]+points[-1][0])/2, (points[0][1]+points[-1][1])/2 - 8)
        parts.append(f'<text x="{lx}" y="{ly}" text-anchor="middle" font-size="11.5"><tspan fill="#3451b2" font-weight="500">{actor}</tspan>'
                     f'<tspan fill="#666">{label}</tspan></text>')

def text(x, y, content, size=11.5, color='#999', italic=True, anchorPos='start'):
    style = ' font-style="italic"' if italic else ''
    parts.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}"{style} text-anchor="{anchorPos}">{content}</text>')

GRAY, GREEN, RED = '#999', '#2f9e66', '#d93036'

# Lane 1: listing
parts.append('<rect x="10" y="10" width="1160" height="330" rx="10" fill="#fff" stroke="#ebebeb"/>')
text(30, 40, 'Marketplace listing', 15, '#333', False)
text(30, 60, 'applicationRegistration.listingStatus · one decision per app · app-level criteria: publisher, listing &amp; README, pricing, privacy, docs &amp; support, usefulness', 11.5, '#999', False)
box('unlisted', 30, 150, 'Unlisted', 'share link only', 'gray', 140)
box('requested', 330, 150, 'Listing requested', 'in the admin review queue', 'blue')
box('listed', 640, 150, 'Listed', 'visible in the marketplace', 'green')
box('delisted', 960, 150, 'Delisted', 'hidden at once', 'orange', 180)
box('declined', 330, 260, 'Declined', 'reason sent to the publisher', 'red')
box('official', 640, 260, 'Listed + Official', 'badge · shown first', 'green')
arrow([anchor('unlisted', 'r'), anchor('requested', 'l')], ' Request listing', 'Publisher:', labelAt=(250, 165))
text(250, 196, 'requirements ready', 11, '#999', False, 'middle')
arrow([anchor('requested', 'r'), anchor('listed', 'l')], ' Approve', 'Admin:', GREEN)
text(570, 196, 'with its latest version', 11, '#999', False, 'middle')
arrow([anchor('listed', 'r'), anchor('delisted', 'l')], ' Delist + reason', 'Admin:', RED)
arrow([anchor('requested', 'b'), anchor('declined', 't')], '', '', RED)
text(425, 236, 'Admin: Decline + reason', 11.5, '#3451b2', False)
arrow([(330, 283), (290, 283), (290, 185), (330, 185)], '', '', GRAY, True)
text(286, 240, 'Request again', 11.5, '#3451b2', False, 'end')
arrow([(415, 150), (415, 110), (100, 110), (100, 150)], ' Withdraw', 'Publisher:', GRAY, True, (265, 102))
arrow([(1050, 196), (1050, 226), (740, 226), (740, 197)], ' Relist', 'Admin:', GRAY, True, (895, 244))
arrow([(700, 196), (700, 260)], '', '', GRAY, True)
arrow([(780, 260), (780, 196)], '', '', GRAY, True)
text(810, 300, 'Admin: Official switch (listed apps only)', 11.5, '#3451b2', False)
text(30, 320, 'Migration: isListed = true → Listed with its current version approved by System · isVetted = true → isOfficial · npm source only.')

# Lane 2: version review
top = 360
parts.append(f'<rect x="10" y="{top}" width="1160" height="360" rx="10" fill="#fff" stroke="#ebebeb"/>')
text(30, top+30, 'Version review', 15, '#333', False)
text(30, top+50, 'applicationRegistrationVersionReview · one decision per immutable published version · security, permissions, network &amp; data, dependencies, performance, compatibility, functionality, native experience', 11.5, '#999', False)
y = top + 130
box('published', 30, y, 'Published', 'not submitted', 'gray', 140)
box('submitted', 250, y, 'Submitted', 'review record created', 'blue', 150)
box('analyzing', 470, y, 'Analyzing', 'automated analysis job', 'purple', 160)
box('needs', 700, y, 'Needs decision', 'in the admin review queue', 'blue', 170)
box('approved', 960, y, 'Approved', 'served to workspaces', 'green', 180)
yb = y + 120
box('withdrawn', 250, yb, 'Withdrawn', 'by the publisher', 'gray', 150)
box('failed', 470, yb, 'Analysis failed', 'job error or timeout', 'orange', 160)
box('rejected', 700, yb, 'Rejected', 'terminal · publish a fix', 'red', 170)
box('revoked', 960, yb, 'Revoked', 'no longer served', 'orange', 180)
arrow([anchor('published', 'r'), anchor('submitted', 'l')], '', '')
text(210, y-28, 'auto-submit (listed app)', 11, '#666', False, 'middle')
text(210, y-14, 'or Publisher: Submit', 11, '#3451b2', False, 'middle')
arrow([anchor('submitted', 'r'), anchor('analyzing', 'l')], 'job queued', '')
arrow([anchor('analyzing', 'r'), anchor('needs', 'l')], 'report stored', '')
arrow([anchor('needs', 'r'), anchor('approved', 'l')], ' Approve', 'Admin:', GREEN)
arrow([anchor('submitted', 'b'), anchor('withdrawn', 't')], '', '', GRAY, True)
text(330, y+78, 'Publisher: Withdraw', 11.5, '#3451b2', False)
text(330, y+92, '(until decided)', 11, '#999', False)
arrow([anchor('analyzing', 'b'), anchor('failed', 't')], '', '', GRAY)
arrow([(630, yb+23), (665, yb+23), (665, y+40), (630, y+40)], '', '', GRAY, True)
text(672, y+86, 'Admin: Re-run', 11.5, '#3451b2', False)
arrow([anchor('needs', 'b'), anchor('rejected', 't')], '', '', RED)
text(795, y+72, 'Admin: Reject + reason', 11.5, '#3451b2', False)
arrow([anchor('approved', 'b'), anchor('revoked', 't')], '', '', RED)
text(1058, y+72, 'Admin: Revoke + reason', 11.5, '#3451b2', False)
text(30, yb+80, 'A new version always starts at Published and never inherits an approval. Rejected is terminal: the fix is a new version. The marketplace serves the latest approved version (#2976).')

markers = ''.join(f'<marker id="m{c[1:]}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="{c}"/></marker>' for c in (GRAY, GREEN, RED))
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="730" font-family="Inter" font-size="13"><defs>{markers}</defs>{"".join(parts)}</svg>'
open('workflow-states.html', 'w').write(f'<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#fcfcfc">{svg}</body></html>')
