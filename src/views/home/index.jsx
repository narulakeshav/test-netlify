/**
 * @name: home.jsx
 * @desc: rendes home page with links to all
 * proponents.
 *
 * @flow
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
// Get global styles
import { Page, Section, H2, Text } from '../../helpers/global';

/**
 * Home Component
 */
const Home = () => (
  <Page bgGray padding="0">
    <Section bg="#FFFFFF" padding="8rem 20%" alignCenter>
      <H2 marginBottom weightHeavy textDarker>Netlify Test</H2>
      <Text
        fontSize={18}
        textLight
        marginTop={24}
        marginCenter
        alignCenter
        width={85}
      >
        This is a test application to test continous deploying using Netlify.
      </Text>
    </Section>
  </Page>
);

// Export Home
export default Home;
