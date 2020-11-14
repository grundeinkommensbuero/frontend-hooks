import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'gatsby';
import querystring from 'query-string';
import { Layout } from '../..';
import DownloadListsNextSteps from '../Forms/DownloadListsNextSteps';
import { StepListItem } from '../StepList';
import { InlineButton, LinkButton } from '../Forms/Button';
import { EnterLoginCode } from '../Login/EnterLoginCode';
import { FinallyMessage } from '../Forms/FinallyMessage';
import { addActionTrackingId, trackEvent } from '../utils';
import { useCreateSignatureList } from '../../hooks/api/signatures/create';
import { AuthContext } from '../../context/Authentication';

const trackingCategory = 'ListDownload';

export default () => {
  const [state, pdf, , createPdf] = useCreateSignatureList({});
  const [campaignCode, setCampaignCode] = useState(null);
  const { userId, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);
  }, []);

  useEffect(() => {
    if (campaignCode && userId && isAuthenticated !== undefined) {
      createPdf({
        campaignCode,
        userExists: true,
      });
    }
  }, [isAuthenticated, userId, campaignCode]);

  if (state === 'error') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreationDirectError', campaignCode),
    });
  }

  if (state === 'created') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreatedFromMail', campaignCode),
    });
  }

  const sections = [
    {
      bodyTextSizeHuge: true,
      body: (
        <>
          <p>Schön, dass du mit uns sammelst. So geht’s weiter:</p>
          {state === 'creating' && (
            <FinallyMessage state="progress">
              Liste wird generiert, bitte einen Moment Geduld...
            </FinallyMessage>
          )}
          {state === 'error' && (
            <FinallyMessage state="error">
              Da ist was schief gegangen
            </FinallyMessage>
          )}
          {state === 'unauthorized' && (
            <EnterLoginCode>
              <p>
                Hey, wir kennen dich schon! Bitte gib den Code ein, den wir dir
                gerade in einer E-Mail geschickt haben. Alternativ kannst du
                auch eine Liste{' '}
                <InlineButton
                  onClick={() => {
                    createPdf({ campaignCode });
                  }}
                  type="button"
                >
                  hier
                </InlineButton>{' '}
                anonym herunterladen.
              </p>
            </EnterLoginCode>
          )}
          {state === 'created' && (
            <>
              <DownloadListsNextSteps>
                <StepListItem icon="download">
                  <LinkButton target="_blank" href={pdf.url}>
                    Listen herunterladen
                  </LinkButton>
                  {campaignCode === 'hamburg-1' && (
                    <p>
                      Den Gesetzestext findest du im{' '}
                      <Link to="downloads/#Gesetzestexte">Downloadbereich</Link>
                      .
                    </p>
                  )}
                </StepListItem>
              </DownloadListsNextSteps>
            </>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};
