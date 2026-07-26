import Header from './Header';
import Footer from './Footer';
import PageTransition from './ui/PageTransition';
import ScrollToTop from './ScrollToTop';
import BackToTop from './BackToTop';

function skipToMainContent(event) {
  event.preventDefault();
  const main = document.getElementById('main-content');
  if (!main) return;
  main.focus({ preventScroll: true });
  main.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link" onClick={skipToMainContent}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} aria-label="Main content">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
