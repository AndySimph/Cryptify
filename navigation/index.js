import React from 'react';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootNavigator2 from './RootNavigator2';

/**
 * Wrap all providers here
 */

export default function Routes() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator2 />
    </AuthenticatedUserProvider>
  );
}

