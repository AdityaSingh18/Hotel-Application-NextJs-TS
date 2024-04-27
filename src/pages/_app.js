import MainNav from './MainNav/index';
import '../styles/globals.css'; // Example path to your global styles

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainNav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
