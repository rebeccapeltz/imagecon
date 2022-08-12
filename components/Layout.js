import Footer from '../components/Footer';
import Navigation from './Navigation';
export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <Navigation />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
