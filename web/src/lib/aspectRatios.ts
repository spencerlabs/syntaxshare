export const aspectRatios: {
  [x: string]: {
    canvasHeight: number
    canvasWidth: number
    height: number
    label: string
    padding: string
    width: number
  }
} = {
  square: {
    canvasHeight: 1080,
    canvasWidth: 1080,
    height: 550,
    label: 'Square (1:1)',
    padding: 'pt-[100%]',
    width: 550,
  },
  landscape: {
    canvasHeight: 1080,
    canvasWidth: 1920,
    height: 360,
    label: 'Landscape (16:9)',
    padding: 'pt-[56.25%]',
    width: 640,
  },
  instagramLandscape: {
    canvasHeight: 566,
    canvasWidth: 1080,
    height: 283,
    label: 'Landscape (Instagram)',
    padding: 'pt-[52.41%]',
    width: 540,
  },
  facebookLandscape: {
    canvasHeight: 630,
    canvasWidth: 1200,
    height: 315,
    label: 'Landscape (Facebook)',
    padding: 'pt-[52.5%]',
    width: 600,
  },
  linkedinLandscape: {
    canvasHeight: 627,
    canvasWidth: 1200,
    height: 313.5,
    label: 'Landscape (LinkedIn)',
    padding: 'pt-[52.25%]',
    width: 600,
  },
  portrait: {
    canvasHeight: 1920,
    canvasWidth: 1080,
    height: 800,
    label: 'Portrait (9:16)',
    padding: 'pt-[100%]',
    width: 450,
  },
  instagramPortrait: {
    canvasHeight: 1350,
    canvasWidth: 1080,
    height: 600,
    label: 'Portrait (Instagram)',
    padding: 'pt-[100%]',
    width: 480,
  },
}

export type AspectRatio = keyof typeof aspectRatios
