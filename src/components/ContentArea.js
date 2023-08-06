import { Container } from '@mui/material';

function ContentArea({ children }) {
  return (
    <Container>
      {children}
      {/* styles for the content area */}
    </Container>
  );
}
export default ContentArea