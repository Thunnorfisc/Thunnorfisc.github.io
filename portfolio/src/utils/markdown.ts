import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/common'
import glsl from 'highlight.js/lib/languages/glsl'
import { getProjectFile } from './projectAssets'

// "common" covers C, C++, C#, Python, JS/TS, JSON, YAML, CMake-ish and more. Add extras here.
hljs.registerLanguage('glsl', glsl)
hljs.registerLanguage('hlsl', glsl) // close enough for highlighting

const VIDEO_EXT = /\.(mp4|webm|mov|ogv)$/i

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Leave URLs alone if they're already absolute / external */
function isResolved(src: string) {
  return /^(\/|https?:|data:|blob:)/i.test(src)
}

/** Renders a project's Markdown, looking up file names in that project's folder */
export function renderProjectMarkdown(project: string, source: string): string {
  return renderMarkdown(source, (src) => getProjectFile(project, src))
}

/**
 * Renders Markdown to HTML.
 *  - `![caption](file.png)`  → image with a caption (file names go through `findFile`)
 *  - `![caption](file.mp4)`  → video with a caption
 *  - ```cpp code fences      → syntax highlighted
 *  - raw HTML is allowed, and src="file" inside it is resolved too
 */
export function renderMarkdown(
  source: string,
  findFile: (src: string) => string | undefined = () => undefined,
): string {
  const resolve = (src: string) => (isResolved(src) ? src : (findFile(src) ?? src))

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : null
      const body = language
        ? hljs.highlight(code, { language, ignoreIllegals: true }).value
        : escapeHtml(code)
      const label = lang ? ` data-lang="${escapeHtml(lang)}"` : ''
      return `<pre class="hljs"${label}><code>${body}</code></pre>`
    },
  })

  // Images and videos, wrapped with a caption taken from the alt text
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx]!
    const src = String(token.attrGet('src') ?? '')
    const caption = escapeHtml(token.content)
    const url = escapeHtml(resolve(src))

    const media = VIDEO_EXT.test(src)
      ? `<video src="${url}" controls playsinline preload="metadata" aria-label="${caption}"></video>`
      : `<img src="${url}" alt="${caption}" loading="lazy">`

    const captionHtml = caption ? `<span class="md-caption">${caption}</span>` : ''
    return `<span class="md-figure">${media}${captionHtml}</span>`
  }

  // External links open in a new tab
  const defaultLinkOpen =
    md.renderer.rules.link_open ?? ((tokens, idx, opts, _env, self) => self.renderToken(tokens, idx, opts))
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const token = tokens[idx]!
    if (/^https?:/i.test(String(token.attrGet('href') ?? ''))) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener')
    }
    return defaultLinkOpen(tokens, idx, opts, env, self)
  }

  // Resolve src="file" in any raw HTML (<video>, <img>, <source>) written in the Markdown
  return md
    .render(source)
    .replace(
      /(<(?:img|video|source)\b[^>]*?\bsrc=")([^"]+)(")/gi,
      (_m: string, before: string, src: string, after: string) => before + resolve(src) + after,
    )
}
