import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-400">
            Form
          </Link>
          <Link href="/report" className="text-white hover:text-gray-400">
            Report
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
