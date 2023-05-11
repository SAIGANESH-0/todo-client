import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold cursor-pointer">
            To Do List App
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/login"
                  className="hover:text-indigo-300 cursor-pointer"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-indigo-300 cursor-pointer"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
