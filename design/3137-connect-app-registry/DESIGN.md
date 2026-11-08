# App registry in Twenty Connect (#3137)

Mockups live in `mockups/` (HTML/CSS, same style as `design/2975-app-listing-review`); `images/` holds the renders.

Regenerate the images from this folder:

```bash
NODE_PATH=$(npm root -g) node mockups/render.js "$PWD/mockups" "$PWD/images" \
  architecture version-flow connect-review-queue connect-app-detail connect-version-review \
  connect-publisher connect-feed instance-admin-apps instance-marketplace
```

The design itself is the body of the GitHub issue that links to this folder.
