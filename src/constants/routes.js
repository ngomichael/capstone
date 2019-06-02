export const ROUTES = {
  home: '/',
  signIn: '/signin',
  signUp: '/signup',
  dashboard: '/dashboard',
  results: '/results',
  providerInfo: '/dashboard/:providerId',
  providerInfoTracker: '/dashboard/tracker/:providerId',
  dashboardHeader: 'dashboard/*',
  tracker: '/dashboard/tracker',
}

export const ONBOARDING_ROUTES = {
  questionnaireCompleted: 'onboardingTracker/questionnaireCompleted',
  getStarted: 'onboardingTracker/getStarted',
  providerInfo: 'onboardingTracker/results/:providerId',
  results: '/onboardingTracker/results',
  providerQuestionnaire: 'providerQuestionnaire',
  questionnaire: 'onboardingTracker/questionnaire',
  onboardingHeader: 'onboardingTracker/*',
}
