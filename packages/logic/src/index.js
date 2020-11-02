/**
 * All logic is exported in this file, so someone using this package can
 * import the individual hooks/functions and contexts. We don't just make hooks available,
 * but in some cases also single functions to offer more flexibility using this
 * package.
 */
// Contexts
export { AuthContext, AuthProvider } from './context/Authentication';
export { OverlayContext, OverlayProvider } from './context/Overlay';

// Signatures and signature lists hooks
export {
  useSignatureCount,
  useSignatureCountOfUser,
} from './hooks/api/signatures/get';
export { useCreateSignatureList } from './hooks/api/signatures/create';
export { useUpdateSignatureListByUser } from './hooks/api/signatures/update';

// Crowdfunding hook and function
export {
  useGetCrowdfundingDirectly,
  buildVisualisationsWithCrowdfunding,
} from './hooks/api/crowdfunding';

// Pledges hooks
export { useCreatePledge } from './hooks/api/pledges/create';
export { useUpdatePledge } from './hooks/api/pledges/update';

// "Questions to ubi" hooks
export {
  useGetMostRecentQuestions,
  useSaveQuestion,
} from './hooks/api/questions';

// Surveys hooks
export { saveSurveyAnswer, useSaveSurveyAnswer } from './hooks/api/surveys';

// User hooks and functions
export { createUser } from './hooks/api/users/create';
export {
  useUserData,
  useCurrentUserData,
  getCurrentUser,
  getUser,
} from './hooks/api/users/get';
export { updateUser, useUpdateUser } from './hooks/api/users/update';

// Authentication hooks
export {
  signOut,
  useAnswerChallenge,
  useLocalStorageUser,
  useSignIn,
  useSignOut,
  useSignUp,
  useVerification,
  useBounceToIdentifiedState,
} from './hooks/authentication';

// Image upload hooks
export { useUploadImage } from './hooks/images';
