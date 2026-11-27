import React from 'react'
import { BlockPicker } from 'react-color'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const InputColor: React.FC<Props> = (props) => {
  return (
    <BlockPicker
      triangle={'hide'}
      width={'100%'}
      color={props.value || '#ffffff'}
      onChange={(e: { hex: string }) => props.onChange?.(e.hex)}
      styles={{
        default: {
          card: {
            flexDirection: 'row',
            display: 'flex',
            boxShadow: 'none',
          },
          head: {
            flex: 1,
            borderRadius: 6,
            height: 'auto',
          },
        },
      }}
    />
  )
}
