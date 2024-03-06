import { MdContactPhone } from 'react-icons/md';
import { PageTitle } from '../components/PageTitle/PageTitle';

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: 'calc(-50px + 100vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PageTitle>Home</PageTitle>
      <h1
        style={{
          lineHeight: '1',
        }}
      >
        Hi, this is your personal phonebook
      </h1>
      <MdContactPhone
        size={40}
        style={{
          marginLeft: '10px',
        }}
      />
    </div>
  );
}
