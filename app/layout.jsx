import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "share_prompts",
  description: "Discover & share AI prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
