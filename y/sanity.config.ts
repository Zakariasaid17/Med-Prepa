import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'quiz',

  projectId: 'py3yxelo',
  dataset: 'quiz',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
