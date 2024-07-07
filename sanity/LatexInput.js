import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Card, Stack, Text } from '@sanity/ui'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import 'katex/dist/katex.min.css'
import katex from 'katex'

const LatexInput = ({ type, value, readOnly, onChange }) => {
  const [latex, setLatex] = useState(value || '')

  const handleChange = (event) => {
    const inputValue = event.target.value
    setLatex(inputValue)
    onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
  }

  const renderLatex = () => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false, // Render error as text if LaTeX is invalid
      })
    } catch (err) {
      return 'Invalid LaTeX'
    }
  }

  return (
    <Stack space={4}>
      <Card padding={3} border>
        <Text size={1} weight="semibold">
          {type.title}
        </Text>
        <Text size={0} muted>
          {type.description}
        </Text>
      </Card>
      <Card padding={3} border>
        <TextInput
          value={latex}
          readOnly={readOnly}
          onChange={handleChange}
        />
      </Card>
      <Card padding={3} border>
        <div
          dangerouslySetInnerHTML={{ __html: renderLatex() }}
          style={{ marginTop: '1em' }}
        />
      </Card>
    </Stack>
  )
}

LatexInput.propTypes = {
  type: PropTypes.object.isRequired,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default LatexInput
