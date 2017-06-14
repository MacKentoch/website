/* eslint-disable import/no-extraneous-dependencies */
import 'style/bootstrap'
import React from 'react'
import styled from 'styled-components'
import { storiesOf, action } from '@storybook/react'
import * as components from 'modules/components'

storiesOf('Button', module).add('with text', () =>
  <components.Button onClick={action('clicked')}>
    Hello Button
  </components.Button>,
)

storiesOf('Input', module).add('basic', () => <components.Input />)
storiesOf('Textarea', module).add('basic', () =>
  <components.Textarea rows={10} cols={50} />,
)
storiesOf('Alert', module)
  .add('danger', () =>
    <components.Alert ui="danger">Something is wrong!</components.Alert>,
  )
  .add('success', () =>
    <components.Alert ui="success">Something is good!</components.Alert>,
  )

storiesOf('H1', module).add('basic', () => <components.H1>Hello</components.H1>)

const StyledOSXWindow = styled(components.OSXWindow)`
  width: 50vw;
  height: 75vh;
  margin: auto;
  margin-top: 12.5vh;
`
storiesOf('OSXWindow', module).add('basic', () =>
  <StyledOSXWindow>Hello OS X</StyledOSXWindow>,
)
