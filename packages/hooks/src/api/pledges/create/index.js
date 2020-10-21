/**
 *  This file holds a hook to create a pledge
 */

import { useState, useContext } from 'react';
import { AuthContext } from '@xbge/context';

export const useCreatePledge = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our savePledge function, so we can set the state from there
  const [state, setState] = useState(null);

  //get user id  from global context
  const { userId } = useContext(AuthContext);

  return [state, pledge => createPledge(userId, pledge, setState)];
};

// Function which calls the aws api to create a new pledge
const createPledge = async (userId, pledge, setState) => {
  try {
    setState('saving');

    const data = pledge;

    if (data.signatureCount) {
      data.signatureCount = parseInt(data.signatureCount);
    }

    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${process.env.API_URL}/users/${userId}/pledges`,
      request
    );

    if (response.status === 201) {
      setState('saved');
    } else if (response.status === 401) {
      setState('unauthorized');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
    setState('error');
  }
};
