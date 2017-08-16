import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { darken } from 'polished'
import theme from 'style/theme'

const Markdown = styled(ReactMarkdown)`
  font-size: 17px;
  line-height: 22px;
  font-weight: 300;
  letter-spacing: 0.2px;

  a {
    color: ${theme.colors.primary};

    &:hover {
      color: ${darken(0.3, theme.colors.primary)};
    }
  }

  p {
    margin: 20px 0;
  }

  strong {
    font-weight: 400;
  }

  ul {
    margin: 20px 0;
    padding: 0;
  }

  ul p {
    margin: 0;
  }

  li > ul {
    margin: 5px 0;
  }

  li {
    position: relative;
    list-style-type: none;
    padding-left: 28px;
    font-size: 17px;
    line-height: 26px;

    &:before {
      content: url(https://stripe.com/img/v3/connect/features/lawyer-friendly-checkmark.svg);
      position: absolute;
      top: 3px;
      left: 0;
      width: 19px
    }
  }

  li > ul > li {
    padding-left: 15px;
    font-size: 13px;
    line-height: 18px;

    &:before {
      content: '-';
      position: absolute;
      top: 3px;
      left: 0;
      width: 19px
    }
  }
`

export default Markdown
