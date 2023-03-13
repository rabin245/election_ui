function SideBarButton({ children, ...props }) {
  const { title } = props;

  return (
    <div className="py-2 flex items-center text-white cursor-pointer px-4 hover:bg-blue-600 rounded-md mt-3 active:outline outline-1 outline-blue-400 transition-all duration-300 ease-in-out">
      {children}
      <span className="font-bold text-gray-200 text-xl ml-4">{title}</span>
    </div>
  );
}

export default SideBarButton;
