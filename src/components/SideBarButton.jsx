function SideBarButton({ children, ...props }) {
  const { title } = props;

  return (
    <div className="p-2 flex items-center text-white cursor-pointer px-4 hover:bg-blue-600 rounded-md mt-3">
      {children}
      <span className="font-bold text-gray-200 text-xl ml-4">{title}</span>
    </div>
  );
}

export default SideBarButton;
