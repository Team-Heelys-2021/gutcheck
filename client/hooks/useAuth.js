import * as React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';

export function useAuth() {
  const { authState } = useOktaAuth();

  React.useEffect(() => {
    if (authState) {
      axios.interceptors.request.use(function (config) {
        const { accessToken } = authState.accessToken;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      });
    }
  }, [authState]);
}
