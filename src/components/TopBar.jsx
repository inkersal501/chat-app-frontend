function TopBar() {
  return (
    <div className="py-2 px-4 bg-slate-800 border-b border-slate-600 flex justify-between items-center text-white">
      <h1 className="text-xl font-semibold">Chat App</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm">Hello, User!</span>
        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">U</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
