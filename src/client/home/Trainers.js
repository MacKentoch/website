import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import Wrapper from 'modules/components/Wrapper'
import H2 from 'modules/components/H2'

const Container = styled.div`
  border-top: 1px solid ${theme.colors.grayLight};
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const Picture = styled.div`
  flex: 1;
  height: 400px;
  background-image: url(http://res.cloudinary.com/smooth/image/upload/f_auto,q_auto/v1497509336/trainers_kohhw1);
  background-repeat: no-repeat;
  background-size: cover;
`

const Content = styled.div`
  flex: 1;
  margin: 0 20px;
  @media (min-width: 700px) {
    margin: 0 40px;
  }
`

const Text = styled.p`
  flex: 1;
  font-size: 18px;
  line-height: 1.4;
  text-align: justify;
  @media (min-width: 700px) {
    font-size: 24px;
  }
`

const Trainers = () =>
  <Container>
    <Wrapper flexDirection="column" lgFlexDirection="row">
      <Picture />
      <Content>
        <H2>Des formateurs, mais avant tout des développeurs.</H2>
        <Text>
          En plus d’être pédagogue, à l’écoute et expérimentés, nos formateurs
          sont aussi des développeurs. Ils utilisent chaque jour en production
          les
          technologies enseignées dans nos formations. Ils vous font profiter de
          leur expérience de terrain et partagent avec vous leurs retours
          d’expérience.
        </Text>
      </Content>
    </Wrapper>
  </Container>

export default Trainers
