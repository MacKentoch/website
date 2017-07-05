/* eslint-disable react/no-danger */
import 'style/bootstrap'
import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Home,
  Story,
  Trainings,
  Training,
  TrainingPdf,
  Contact,
} from 'client/Routes'

const App = ({ location }) =>
  <div>
    <Helmet
      titleTemplate="Smooth Code - %s"
      defaultTitle="Smooth Code : Formations JavaScript, React et Node.js"
    >
      <html lang="fr" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="Formations JavaScript, React et Node.js destinées aux développeurs."
      />
      <meta
        name="keywords"
        content="formation web, formation développeur, JavaScript, React, ReactJS, Redux, Jest, RxJS, Node.js, MobX, GraphQL"
      />
      <meta
        name="author"
        content="Smooth Code : Formations JavaScript, React et Node.js"
      />
      <meta
        property="og:title"
        content="Smooth Code : Formations JavaScript, React et Node.js"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://www.smooth-code.com${location.pathname}`}
      />
      <meta
        property="og:image"
        content="//res.cloudinary.com/smooth/image/upload/c_scale,h_400,q_auto,w_400/v1497963998/smooth-code-shield.png"
      />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
    </Helmet>
    <Route exact path="/" component={Home} />
    <Route path="/story" component={Story} />
    <Route exact path="/trainings" component={Trainings} />
    <Route exact path="/trainings/:slug/pdf" component={TrainingPdf} />
    <Route exact path="/trainings/:slug" component={Training} />
    <Route path="/contact" component={Contact} />
  </div>

export default withRouter(App)
