import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: ${props => (props.small ? 16 : 18)}px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 1.5;
`

export default Paragraph
