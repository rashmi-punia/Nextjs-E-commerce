import '@styles/global.css'
import Provider from "@/components/Provider";
import Nav from '@components/Nav';
import { GlobalProvider } from './context/page';


export const metadata = {
  title: "E-commerce",
  description: "Discover & Share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>

     
        <Provider>
<GlobalProvider>

          <div className="mai">
            <div className="gradient -z-20"/>
          </div>
          <main className="ap">
            <Nav />
            {children}
          </main>
</GlobalProvider>
        </Provider>
      </body>
    </html>
  );
};


export default RootLayout