import { type SchemaTypeDefinition } from 'sanity'
import questions from './questions'
import questionsScience from './questionsScience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questions,questionsScience]
}
