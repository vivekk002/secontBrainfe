import "./App.css";
import BrainiIcon from "./assets/BrainIcon";
import Button from "./component/ui/Button";
import Card from "./component/ui/Card";

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[22%] border-r border-gray-300 bg-white">
        <div className="flex items-center p-6 gap-3 align-middle">
          <BrainiIcon size="lg" />
          <h3 className="font-bold text-center text-3xl ">Second Brain</h3>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-[78%] bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-300 w-full flex justify-between p-6 bg-white">
          <h2 className="text-4xl font-bold">All Notes</h2>

          <div className="flex gap-4">
            <Button size="lg" variant="secondary" label="Share Brain" />
            <Button size="lg" variant="primary" label="Add Content" />
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 flex gap-4 p-6 overflow-auto">
          <Card />
          <Card />
          <Card />
        </section>
      </div>
    </div>
  );
}

export default App;
