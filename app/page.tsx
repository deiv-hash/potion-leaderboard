import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main>
          <div className="flex justify-center items-center">
            <div className="text-gray-400">
              <button className="btn-tab">Traders</button>
              <button>Groups</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
