import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import { signOut, useLocalStorageUser } from '../../hooks/authentication';
import { getCurrentUser, getUser } from '../../hooks/api/users/get';

/**
 * This class serves as a provider (reacts context API) which is used
 * to maintain a global state. The application is wrapped around such a provider.
 * https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
 *
 * Another option would be to make use of Amplifys Auth functions, but I think that
 * would be less efficient than keeping an aditional local state
 */

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [cognitoUser, setCognitoUser] = useState();
  const [customUserData, setCustomUserData] = useState({});
  const [token, setToken] = useState();
  const [tempEmail, setTempEmail] = useState();
  const [previousAction, setPreviousAction] = useState();
  const [userId, setUserId] = useLocalStorageUser();

  const signUserOut = async () =>
    await signOut({ setCognitoUser, setUserId, setIsAuthenticated, setToken });

  // On page load
  useEffect(() => {
    // Configure amplify when loading auth provider
    import(/* webpackChunkName: "Amplify" */ '@aws-amplify/auth').then(
      ({ default: Amplify }) => {
        Amplify.configure({
          region: process.env.COGNITO_REGION,
          userPoolId: process.env.COGNITO_USER_POOL_ID,
          userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,
        });

        // Check for URL param for userId
        const params = querystring.parse(window.location.search);
        // If there is a userId in the params
        let userIdParams;
        if (params.userId) {
          if (userId !== undefined) userIdParams = params.userId;
          // if userId in params is different than in state
          if (userIdParams !== params.userId) userIdParams = params.userId;
        }
        // If userId in params but no userId in local storage
        if (userIdParams && !userId) {
          // Set user as pseudo logged in
          setUserId(userIdParams);
          setIsAuthenticated(false);
        }
        // If userId in params and userId in local storage and they don't match
        else if (userIdParams && userId && userIdParams !== userId) {
          // Sign current user out
          signUserOut().then(() => {
            // Set new userId so user is pseudo logged in. Can force a second sign out if invalid id.
            setUserId(userIdParams);
          });
        }
        // In any other case, check for authenticated user
        else {
          // Check if the user is already signed in
          Amplify.currentAuthenticatedUser()
            .then(user => {
              if (user) {
                setCognitoUser(user);
              }
            }) // set user in context (global state)
            .catch(() => {
              //error is thrown if user is not authenticated
              setIsAuthenticated(false);
            });
        }
      }
    );
  }, []);

  useEffect(() => {
    // If identified cognito user
    if (cognitoUser && cognitoUser.attributes) {
      // Set user data
      setIsAuthenticated(true);
      setToken(cognitoUser.signInUserSession.idToken.jwtToken);
      // If userId needs to be overriddenz
      if (cognitoUser.attributes.sub !== userId) {
        setUserId(cognitoUser.attributes.sub);
      }
    }
  }, [cognitoUser]);

  // Getting user data from backend
  useEffect(() => {
    if (userId && isAuthenticated !== undefined) {
      updateCustomUserData({
        isAuthenticated,
        token,
        userId,
        setCustomUserData,
        signUserOut,
      });
    }
  }, [userId, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        cognitoUser,
        setCognitoUser,
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        userId,
        setUserId,
        tempEmail,
        setTempEmail,
        customUserData,
        previousAction,
        setPreviousAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Updates user data with data from backend
const updateCustomUserData = async ({
  isAuthenticated,
  token,
  setCustomUserData,
  userId,
  signUserOut,
}) => {
  try {
    // Get user data from protected or public endpoint
    const result = isAuthenticated
      ? await getCurrentUser(token)
      : await getUser(userId);
    if (
      // If error finding user data
      result.state !== 'success' ||
      // If user logged in different userId passed in params
      (isAuthenticated && userId !== result.user.cognitoId) ||
      // User doesn't have email or password
      (!result.user?.email && !result.user?.username)
    ) {
      signUserOut();
      return;
    }

    // If no error, update custom user data
    setCustomUserData(result.user);
  } catch (error) {
    console.log(error);
  }
};
