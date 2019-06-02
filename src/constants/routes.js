export const ROUTES = {
  home: '/',
  signIn: '/signin',
  signUp: '/signup',
}

export const ONBOARDING_ROUTES = {
  questionnaireCompleted: 'onboardingTracker/questionnaireCompleted',
  getStarted: 'onboardingTracker/getStarted',
  providerInfo: 'onboardingTracker/results/:providerId',
  results: 'onboardingTracker/results',
  providerQuestionnaire: 'providerQuestionnaire',
  questionnaire: 'onboardingTracker/questionnaire',
  onboardingHeader: 'onboardingTracker/*',
}
