const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ToDo List App. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
