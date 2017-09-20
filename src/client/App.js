/* eslint-disable react/no-danger */
import 'style/bootstrap'
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import * as Routes from 'client/Routes'
import * as routePaths from 'modules/routePaths'
import { completeUrl } from 'modules/urlUtil'

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      /* eslint-disable no-param-reassign */
      if (staticContext) staticContext.status = code
      /* eslint-enable no-param-reassign */
      return children
    }}
  />
)

const App = ({ location }) => (
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
        content="Formations JavaScript, React et Node.js pour les entreprises et les développeurs."
      />
      <meta
        name="keywords"
        content="formation web, formation développeur, JavaScript, React, ReactJS, Redux, Jest, RxJS, Node.js, MobX, GraphQL"
      />
      <meta
        name="author"
        content="Smooth Code : Formations JavaScript, React et Node.js"
      />
      <meta property="og:site_name" content="Smooth Code" />
      <meta
        property="og:title"
        content="Smooth Code : Formations JavaScript, React et Node.js"
      />
      <meta
        property="og:description"
        content="Formations JavaScript, React et Node.js pour les entreprises et les développeurs."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={completeUrl(location.pathname)} />
      <meta name="twitter:site" content="@smooth_code" />
      <meta name="twitter:creator" content="@neoziro" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:url" content={completeUrl(location.pathname)} />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={completeUrl('/feed.xml')}
      />
    </Helmet>
    <Switch>
      <Route exact path={routePaths.homeRoute()} component={Routes.Home} />
      <Route path={routePaths.storyRoute()} component={Routes.Story} />
      <Route
        exact
        path={routePaths.trainingsRoute()}
        component={Routes.Trainings}
      />
      <Route
        exact
        path={routePaths.sessionRoute(
          ':trainingSlug',
          ':sessionId',
          ':city',
          ':month',
        )}
        component={Routes.Session}
      />
      <Route
        exact
        path={routePaths.trainingRoute(':slug')}
        component={Routes.Training}
      />
      <Route
        exact
        path={routePaths.trainingPrintRoute(':slug')}
        component={Routes.TrainingPrint}
      />
      <Route
        exact
        path={routePaths.trainerRoute(':slug')}
        component={Routes.Trainer}
      />
      <Route path={routePaths.contactRoute()} component={Routes.Contact} />
      <Route
        exact
        path={routePaths.articlesRoute()}
        component={Routes.Articles}
      />
      <Route
        path={routePaths.articleRoute(':slug')}
        component={Routes.Article}
      />
      <Route
        path={routePaths.testimonialsRoute()}
        component={Routes.Testimonials}
      />
      <Route
        path={routePaths.conditionsRoute()}
        component={Routes.Conditions}
      />
      <Status code={404}>
        <Routes.NoMatch />
      </Status>
    </Switch>
  </div>
)

export default withRouter(App)
