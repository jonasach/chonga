import MainLayout from '../layouts/LandingPage/layout';
import MainContent from '../components/MainContent'; // Import the MainContent component

function LandingPage() {
  return (
    <MainLayout>
      <MainContent /> {/* Include the MainContent inside the MainLayout */}
    </MainLayout>
  );
}

export default LandingPage;
