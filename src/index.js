export const style = `<style>
  @import url("https://rsms.me/inter/inter.css");

  * {
    margin: 0;
    padding: 0;
    transition: border-color, background, color 0.15s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    color: #111;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.0109598em;
    line-height: 1.375;
  }
  
  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }
  
  html, body {
    background: #fafafa;
  }
  
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .button {
    padding: 0.5rem 0.75rem;
    color: currentColor;
    text-decoration: none;
    background: white;
    border: 1px solid #eaeaea;
    border-radius: 0.25rem;
  }
  
  .button:hover {
    border-color: currentColor;
  }
</style>`

export function message(text) {
  return `
    <head>
      <title>${text}</title>
      ${style}
    </head>
    <body>
      <p>${text}</p>
    </body>
  `
}

export function loadPreview(previewUrl, text = "Load Preview") {
  return `
    <head>
      <title>Preview</title>
      ${style}
    </head>
    <body>
      <a href="${previewUrl}" class="button">${text}</a>
    </body>
  `
}
