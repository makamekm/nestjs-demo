import React from "react";
import { useServiceProvider } from "react-service-provider";
import { HashRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routing";

import { AppLayout } from "./app/AppLayout";
import { LoadingScreen } from "./components/Loading/LoadingScreen";
import { LoadingService } from "./components/Loading/LoadingService";
import { LayoutService } from "./app/services/LayoutService";
import { ListService } from "./app/services/ListService";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider, ServiceProviderHook] = useServiceProvider(
    LoadingService,
    LayoutService,
    ListService
  );

  return (
    <ServiceProvider>
      <Router basename={basePath}>
        <ServiceProviderHook>
          <LoadingScreen>
            <AppLayout>
              <RoutedContent />
            </AppLayout>
          </LoadingScreen>
        </ServiceProviderHook>
      </Router>
    </ServiceProvider>
  );
};
