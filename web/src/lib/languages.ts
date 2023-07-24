import { angular } from '@codemirror/lang-angular'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { php } from '@codemirror/lang-php'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { sass } from '@codemirror/lang-sass'
import { vue } from '@codemirror/lang-vue'
import { LanguageSupport } from '@codemirror/language'
import type { IconType } from 'react-icons'
import {
  TbBrandAngular,
  TbBrandCss3,
  TbBrandHtml5,
  TbBrandJavascript,
  TbJson,
  TbMarkdown,
  TbBrandPhp,
  TbBrandPython,
  TbBrandRust,
  TbBrandSass,
  TbBrandVue,
} from 'react-icons/tb'

export interface Language {
  id: string
  name: string
  lang: () => LanguageSupport
  icon: IconType
}

export const languages: Language[] = [
  {
    id: 'angular',
    name: 'Angular',
    lang: angular,
    icon: TbBrandAngular,
  },
  {
    id: 'css',
    name: 'CSS',
    lang: css,
    icon: TbBrandCss3,
  },
  {
    id: 'html',
    name: 'HTML',
    lang: html,
    icon: TbBrandHtml5,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    lang: () => javascript({ jsx: true, typescript: true }),
    icon: TbBrandJavascript,
  },
  {
    id: 'json',
    name: 'JSON',
    lang: json,
    icon: TbJson,
  },
  {
    id: 'markdown',
    name: 'Markdown',
    lang: markdown,
    icon: TbMarkdown,
  },
  {
    id: 'php',
    name: 'PHP',
    lang: php,
    icon: TbBrandPhp,
  },
  {
    id: 'python',
    name: 'Python',
    lang: python,
    icon: TbBrandPython,
  },
  {
    id: 'rust',
    name: 'Rust',
    lang: rust,
    icon: TbBrandRust,
  },
  {
    id: 'sass',
    name: 'Sass',
    lang: sass,
    icon: TbBrandSass,
  },
  {
    id: 'vue',
    name: 'Vue',
    lang: vue,
    icon: TbBrandVue,
  },
]
