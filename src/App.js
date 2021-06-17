import CustomTable from "./components/table/Table.component";

function App() {
  const headers = ["ID", "Nombre", "Apellido", "Email", "Avatar"];

  return (
    <div className="App">
      <CustomTable headers={headers} />
    </div>
  );
}

export default App;
