import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold">Logo</Link>
        <div>
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/login" className="mr-4">Login</Link>
        </div>
      </div>
    </nav>
  );
}
