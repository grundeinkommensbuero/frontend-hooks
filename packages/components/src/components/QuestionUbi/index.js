import React, { useState, useEffect } from 'react';
import CreateQuestion from './CreateQuestion';
import ListQuestions from './ListQuestions';
import querystring from 'query-string';
import { useUserData } from '../../hooks/api/users/get';

export default ({ mode }) => {
  const [questionJustSent, setQuestionJustSent] = useState();
  const [userId, setUserId] = useState(null);
  const [userData, requestUserData] = useUserData();

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    // Will be null, if param does not exist
    setUserId(urlParams.userId);
    requestUserData(urlParams.userId);
  }, []);

  return (
    <>
      {mode === 'questions-and-create' && (
        <CreateQuestion
          setQuestionJustSent={setQuestionJustSent}
          userId={userId}
          userData={userData}
        />
      )}
      <ListQuestions questionJustSent={questionJustSent} userId={userId} />
    </>
  );
};
