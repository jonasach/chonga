import Link from 'next/link'

function Home() {
  return  (
  <div>
      <h1> Home Page</h1>
    <Link href='/blog' legacyBehavior>
      <a>blog</a>
    </Link>
    </div>
  )

}

export default Home;

