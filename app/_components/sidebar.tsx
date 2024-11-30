const Sidebar = () => {
  return (
    <div className="bg-white w-64">
      <div className="px-8 py-6">
        <h1 className="font-bold text-2xl">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2 pl-4">
        <button className="flex justify-start gap-2 p-3">Dashboard</button>
        <button className="flex justify-start gap-2 p-3">Produtos</button>
        <button className="flex justify-start gap-2 p-3">Vendas</button>
      </div>
    </div>
  );
};

export default Sidebar;
