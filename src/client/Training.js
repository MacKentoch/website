import React from 'react'
import styled from 'styled-components'
import compose from 'recompact/compose'
import { lighten } from 'polished'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import Hero from 'modules/components/Hero'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import Button from 'modules/components/Button'

const Picture = styled.div`
  flex-shrink: 0;
  height: 150px;
  width: 150px;
  ${props =>
    props.background ? `background-image: url(${props.background});` : ''}
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const Container = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  max-width: 1000px;
  width: 100%;
  flex-direction: column;
  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const TrainingHero = Hero.extend`
  height: 406px;
`

const Content = styled.div`
  flex: 1;
  margin: 0 20px 20px;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 22px;

  strong {
    font-weight: 400;
  }

  h3 {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: -0.2px;
    line-height: 28px;
  }
`

const Sidebar = styled.aside`
  color: ${theme.colors.grayDark};

  @media (min-width: ${theme.medias.phablet}) {
    width: 350px;
    border-left: 1px solid ${theme.colors.grayLight};
  }
`

const SidebarStickyContainer = styled(StickyContainer)`
  @media (min-width: ${theme.medias.phablet}) {
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: ${theme.medias.phablet}) {
    div:first-child > div:first-child {
      padding-bottom: 0 !important;
    }
  }
`

const SidebarSticky = styled.div`
  @media (max-width: ${theme.medias.phablet}) {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
  }
`

const SidebarSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.grayLight};

  &:first-child {
    border-top: 1px solid ${theme.colors.grayLight};
  }

  &:last-child {
    border-bottom: 0;
  }

  @media (min-width: ${theme.medias.phablet}) {
    padding: 40px 30px;

    &:first-child {
      border-top: 0
    }
  }
`

const SidebarTitle = styled.h3`
  margin: 0;
  font-weight: 300;
  font-size: 30px;
`

const SidebarText = styled.p`
  font-size: 16px;
`

const ContactItem = styled.div`
  font-size: 24px;
  margin: 20px 0;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`

const Sibling = styled(Link)`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid ${theme.colors.grayLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  will-change: transform;
  transition: transform 300ms;
  text-decoration: none;
  color: ${theme.colors.grayDark};
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`
const SiblingImage = styled.img`
  flex-shrink: 0;
`
const SiblingName = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
`
const SiblingAbstract = styled.div`
  font-size: 16px;
  font-weight: 300;
`
const SiblingInfo = styled.div`
  padding: 10px;
`

const InfoLabel = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
`

const Amount = styled.div`
  margin-bottom: 20px;
  font-size: 35px;
`

const AmountSmall = styled.span`
  font-size: 15px;
`

const LinkButton = Button.extend`
  display: block;
  font-size: 20px;
`.withComponent(Link)

const SectionTitle = styled.h2`
  margin: 60px 0 20px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 400;
`

const Nav = styled.nav`
  background-color: white;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const StyledScrollLink = styled(ScrollLink)`
  color: ${theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 600;
    cursor: default;
    color: ${theme.colors.grayDark};

    &:hover {
      text-decoration: none;
    }
  }
`

const TRAINING_QUERY = gql`
  query trainingData($slug: ID!) {
    training(slug: $slug) {
      cloudinary_id
      name
      abstract
      duration
      slug
      color
    }
  }
`

const TRAINING_DETAIL_QUERY = gql`
  query trainingDetailData($slug: ID!) {
    training(slug: $slug) {
      slug
      outline
      description
      price
      siblings {
        cloudinary_id
        slug
        name
        abstract
      }
    }
  }
`

const options = ({ match }) => ({ variables: { slug: match.params.slug } })

const withTraining = graphql(TRAINING_QUERY, {
  name: 'trainingData',
  options,
})

const withTrainingDetail = graphql(TRAINING_DETAIL_QUERY, {
  name: 'trainingDetailData',
  options,
})

export default compose(
  withTraining,
  withTrainingDetail,
)(
  ({
    trainingData: { training },
    trainingDetailData: { training: trainingDetail },
  }) =>
    <PageContainer>
      <Helmet>
        <title>{training && `Formation ${training.name}`}</title>
        <meta name="description" content={training && training.abstract} />
        <meta
          property="og:title"
          content={training && `Smooth Code - Formation ${training.name}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            training && clUrl(training.cloudinary_id, 'c_scale,w_400,h_400')
          }
        />
      </Helmet>
      <Header transparent />
      <TrainingHero
        background={
          training &&
          `linear-gradient(180deg, ${training.color}, ${lighten(
            0.2,
            training.color,
          )})`
        }
      >
        <Picture
          background={
            training &&
            clUrl(training.cloudinary_id, 'c_scale,w_150,h_150,dpr_2')
          }
        />
        <MainTitle itemProp="name">
          {training && `Formation ${training.name}`}
        </MainTitle>
        <Lead itemProp="description">{training && training.abstract}</Lead>
      </TrainingHero>
      <Container>
        <Content>
          <StickyContainer>
            <Sticky>
              {({ style }) =>
                <Nav style={style}>
                  <span>
                    <StyledScrollLink
                      activeClass="active"
                      spy
                      smooth
                      offset={-60}
                      to="description"
                    >
                      Description
                    </StyledScrollLink>
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>
                    <StyledScrollLink
                      activeClass="active"
                      spy
                      smooth
                      offset={-60}
                      to="outline"
                    >
                      Programme
                    </StyledScrollLink>
                  </span>
                </Nav>}
            </Sticky>
            <ScrollElement name="description">
              {trainingDetail &&
                <ReactMarkdown source={trainingDetail.description} />}
            </ScrollElement>
            <ScrollElement name="outline">
              <SectionTitle>Programme</SectionTitle>
              {trainingDetail &&
                <ReactMarkdown source={trainingDetail.outline} />}
            </ScrollElement>
          </StickyContainer>
        </Content>
        <Sidebar>
          <SidebarStickyContainer>
            <Sticky>
              {({ style }) =>
                <SidebarSticky style={style}>
                  <SidebarSection>
                    <InfoLabel>Prix :</InfoLabel>
                    <Amount
                      itemProp="offers"
                      itemScope
                      itemType="http://schema.org/Offer"
                    >
                      <span
                        content={trainingDetail && trainingDetail.price}
                        itemProp="price"
                      >
                        {trainingDetail ? trainingDetail.price : '-'}
                      </span>
                      <span content="EUR" itemProp="priceCurrency">€</span>{' '}
                      <AmountSmall>HT / personne</AmountSmall>
                    </Amount>
                    <InfoLabel>Durée :</InfoLabel>
                    <Amount>
                      {training &&
                        `${training.duration} ${training.duration > 1
                          ? 'jours'
                          : 'jour'}`}
                    </Amount>
                    <LinkButton to="/contact">Demander un devis</LinkButton>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarTitle>Une question ?</SidebarTitle>
                    <SidebarText>
                      Vous avez besoin d’un renseignement ou d&apos;une
                      formation personnalisée ?<br />
                      Nous nous ferons un plaisir de répondre à
                      vos questions.
                    </SidebarText>
                    <ContactItem>
                      <a href="tel:+33650588079">
                        <FaPhone /> <span>06 50 58 80 79</span>
                      </a>
                    </ContactItem>
                    <ContactItem>
                      <a href="mailto:contact@smooth-code.com?subject=Demande%20d%27information">
                        <FaEnvelope /> <span>Email</span>
                      </a>
                    </ContactItem>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarTitle>
                      Autres formations
                    </SidebarTitle>
                    {trainingDetail &&
                      trainingDetail.siblings.map(sibling =>
                        <Sibling
                          key={sibling.slug}
                          to={`/trainings/${sibling.slug}`}
                        >
                          <SiblingImage
                            alt={sibling.name}
                            width="140"
                            height="140"
                            src={clUrl(
                              sibling.cloudinary_id,
                              'c_scale,w_140,h_140,dpr_2',
                            )}
                          />
                          <SiblingInfo>
                            <SiblingName>{sibling.name}</SiblingName>
                            <SiblingAbstract>
                              {sibling.abstract}
                            </SiblingAbstract>
                          </SiblingInfo>
                        </Sibling>,
                      )}
                  </SidebarSection>
                </SidebarSticky>}
            </Sticky>
          </SidebarStickyContainer>
        </Sidebar>
      </Container>
      <Footer />
    </PageContainer>,
)
