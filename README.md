# Next.js preview for Craft CMS

Provides some simple functions to build a preview experience using Next.js and Craft CMS.

## Usage

Generate a [random encryption key](https://randomkeygen.com/) for use as an `API_KEY`. This should be shared between Craft and Next to avoid unauthorised preview requests.

Configure Craft preview sections with their respective `url`, the `key` and an `expires` (so we can validate the generated Craft token without lookups).

```
/api/preview?url={{url}}&key={{parseEnv("$API_KEY")}}&expires={{now.timestamp+craft.app.config.general.previewTokenDuration}}
```

### `/pages/api/preview.js`

Loads a preview link if the provided `expires` is in the past, else returns an expiration error. If the preview is within Craft’s preview iframe it will automatically redirect.

```js
import { loadPreview, message } from "@joshuabaker/nextjs-craftcms-preview";

export default function handler(req, res) {
  const { key, expires } = req.query;

  if (key !== process.env.API_KEY) {
    return res.status(403).send(message("Invalid API key"));
  }

  const now = Math.floor(Date.now() / 1000);
  if (now > expires) {
    return res.status(403).send(message("Preview has expired"));
  }

  const url = req.url.replace("/preview", "/preview-enter");

  res.send(loadPreview(url));
}
```

### `/pages/api/preview-enter.js`

You’re standard preview endpoint with consideration for local development.

```js
import { loadPreview, message } from "@joshuabaker/nextjs-craftcms-preview";

export default function handler(req, res) {
  const { key, url, token } = req.query;

  if (key !== process.env.API_KEY) {
    return res.status(403).send(message("Invalid API key"));
  }

  res.setPreviewData({ token });

  if (process.env.NODE_ENV === "development") {
    const previous = res.getHeader("Set-Cookie");
    previous.forEach((cookie, index) => {
      previous[index] = cookie.replace("SameSite=Lax", "SameSite=None;Secure");
    });
    res.setHeader(`Set-Cookie`, previous);
  }

  res.write(`<script>window.location.href = "${url}";</script>`);
  res.end();
}
```

### `/pages/api/preview-exit.js`

Link to `/api/preview-exit?url=${router.asPath}`.

```js
export default function exitPreview(req, res) {
  res.clearPreviewData();
  res.redirect(req.query.url ?? "/");
}
```
