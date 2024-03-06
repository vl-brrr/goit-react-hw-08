import { Helmet } from 'react-helmet-async';

export function PageTitle({ children }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
