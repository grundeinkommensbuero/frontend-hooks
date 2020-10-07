/**
 * All logic is exported in this file, so someone using this package can
 * import the individual hooks/functions. We don't just make hooks available,
 * but in some cases also single functions to offer more flexibility using this
 * package.
 */

// Signatures and signature lists hooks
export {
  useSignatureCount,
  useSignatureCountOfUser,
} from './api/signatures/get';
export { useCreateSignatureList } from './api/signatures/create';
export { useUpdateSignatureListByUser } from './api/signatures/update';

// Crowdfunding hook and function
export {
  useGetCrowdfundingDirectly,
  buildVisualisationsWithCrowdfunding,
} from './api/crowdfunding';

// Pledges hooks
export { useCreatePledge } from './api/pledges/create';
export { useUpdatePledge } from './api/pledges/update';

// "Questions to ubi" hooks
export { useGetMostRecentQuestions, useSaveQuestion } from './api/questions';

// Surveys hooks
export { saveSurveyAnswer, useSaveSurveyAnswer } from './api/surveys';

// User hooks and functions
export { createUser } from './api/users/create';
export {
  useUserData,
  useCurrentUserData,
  getCurrentUser,
  getUser,
} from './api/users/get';
export { updateUser, useUpdateUser } from './api/users/update';

// Authentication hooks
export {
  signOut,
  useAnswerChallenge,
  useLocalStorageUser,
  useSignIn,
  useSignOut,
  useSignUp,
  useVerification,
} from './authentication';

// Image upload hooks
export { useUploadImage } from './images';
