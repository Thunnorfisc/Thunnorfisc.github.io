/*
 * Helpers for reading files out of src/projects/<ProjectName>/.
 * Everything is found automatically — just drop files into a project's folder.
 */

const GENERAL_FOLDER = 'General'

// URLs for every media file (images, videos, ...) under src/projects
const fileUrls = import.meta.glob<string>(
  ['/src/projects/**/*', '!**/*.json', '!**/*.vue', '!**/*.ts', '!**/*.md'],
  { eager: true, query: '?url', import: 'default' },
)

// Raw markup for every SVG, so icons can be coloured with CSS
const svgMarkup = import.meta.glob<string>('/src/projects/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})

// Parsed contents of every JSON file directly inside a project folder
const jsonFiles = import.meta.glob<unknown>('/src/projects/*/*.json', {
  eager: true,
  import: 'default',
})

/** Turns "/src/projects/Foo/../NAgine/x.png" into "/src/projects/NAgine/x.png" */
function normalise(path: string): string {
  const parts: string[] = []
  for (const part of path.split('/')) {
    if (part === '..') parts.pop()
    else if (part !== '.') parts.push(part)
  }
  return parts.join('/')
}

/**
 * URL of a file inside a project's folder, e.g. getProjectFile('NAgine', 'IMG_Editor.png').
 * "../OtherProject/file.png" borrows a file from another project folder.
 */
export function getProjectFile(project: string, file: string): string | undefined {
  return fileUrls[normalise(`/src/projects/${project}/${file}`)]
}

/** Raw SVG for an icon — checks the project's folder first, then projects/General */
export function getProjectIcon(project: string, file: string): string | undefined {
  return (
    svgMarkup[`/src/projects/${project}/${file}`] ??
    svgMarkup[`/src/projects/${GENERAL_FOLDER}/${file}`]
  )
}

/** Parsed JSON file from a project's folder, e.g. getProjectData('NAgine', 'carousel.json') */
export function getProjectData<T>(project: string, file: string): T | undefined {
  const data = jsonFiles[`/src/projects/${project}/${file}`]
  if (data === undefined) {
    console.warn(`[projects] Missing ${file} in src/projects/${project}/`)
  }
  return data as T | undefined
}

// Raw text of every Markdown file directly inside a project folder
const markdownFiles = import.meta.glob<string>('/src/projects/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/** Raw Markdown from a project's folder, e.g. getProjectMarkdown('NAgine', 'content.md') */
export function getProjectMarkdown(project: string, file: string): string | undefined {
  const text = markdownFiles[`/src/projects/${project}/${file}`]
  if (text === undefined) {
    console.warn(`[projects] Missing ${file} in src/projects/${project}/`)
  }
  return text
}
