import { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { SweetDetailPage } from './pages/SweetDetailPage';
import { HygienePage } from './pages/HygienePage';
import { OwnerCatalogPage } from './pages/OwnerCatalogPage';
import { Toaster } from '@/components/ui/sonner';

type Page = 'home' | 'catalog' | 'hygiene' | 'sweet-detail' | 'owner';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSweetIndex, setSelectedSweetIndex] = useState<number>(0);

  const navigateTo = (page: Page, sweetIndex?: number) => {
    setCurrentPage(page);
    if (sweetIndex !== undefined) {
      setSelectedSweetIndex(sweetIndex);
    }
    window.scrollTo(0, 0);
  };

  return (
    <AppLayout currentPage={currentPage} onNavigate={navigateTo}>
      {currentPage === 'home' && <LandingPage onNavigate={navigateTo} />}
      {currentPage === 'catalog' && <CatalogPage onNavigate={navigateTo} />}
      {currentPage === 'hygiene' && <HygienePage />}
      {currentPage === 'sweet-detail' && (
        <SweetDetailPage sweetIndex={selectedSweetIndex} onNavigate={navigateTo} />
      )}
      {currentPage === 'owner' && <OwnerCatalogPage />}
      <Toaster />
    </AppLayout>
  );
}

export default App;
