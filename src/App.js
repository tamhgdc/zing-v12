import { Fragment, Suspense } from "react";
import "~/App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "~/styles/GlobalStyles";
import { publicRoutes } from "./routes";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultLayout } from "~/components/layout";
import { AuthProvider } from "./contexts/auth-context";
function App() {
  const { theme } = useSelector((state) => state.global);
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <GlobalStyles />
        <Suspense fallback={<></>}>
          <AuthProvider>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = route.layout === null ? Fragment : DefaultLayout;
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </AuthProvider>
        </Suspense>
        ;
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
