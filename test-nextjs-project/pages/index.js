import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/nonexistent">Broken Link</Link></li>
          <li><a href="https://example.com/nonexistent">Broken External Link</a></li>
        </ul>
      </nav>
      <button onClick={() => window.location.href = '/products'}>Products</button>
    </div>
  );
}
