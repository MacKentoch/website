export const homeRoute = () => '/'
export const storyRoute = () => '/notre-histoire'
export const contactRoute = () => '/contact'
export const trainingRoute = slug => `/formations/${slug}`
export const trainingsRoute = () => `/formations`
export const sessionRoute = (trainingSlug, sessionId, city, month) =>
  `/formations/${trainingSlug}/sessions/${sessionId}-${city}-${month}`
export const trainerRoute = slug => `/formateurs/${slug}`
