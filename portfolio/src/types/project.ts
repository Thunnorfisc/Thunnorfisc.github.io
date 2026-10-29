export interface Tag {
  name: string
  colour: string
}

export interface Project {
  name: string
  /** Path inside src/assets, e.g. "project thumbnails/Temp Thumbnail.png" */
  thumbnail: string
  /** "contain" (default) shows the whole image; "cover" fills the frame and crops the edges */
  thumbnailFit?: 'contain' | 'cover'
  /** Tag names — must match a `name` in tags.json */
  tags: string[]
  description: string
  /** Internal route ("/projects/foo") or external URL ("https://...") */
  link: string
}

/** One entry in a project's carousel.json */
export interface CarouselItem {
  /** Caption shown under the media */
  name: string
  /** File name inside the project's folder, e.g. "IMG_Editor.png" */
  src: string
  type: 'image' | 'video'
}

/** One entry in a project's details.json */
export interface DetailItem {
  title: string
  /** SVG file name — looked up in the project's folder first, then in projects/General */
  icon: string
  description: string
}
