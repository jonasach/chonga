export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/auth',
      permanent: false,
    },
  }
}

export default function Home() {
  return (
    <div></div>
  );
} 