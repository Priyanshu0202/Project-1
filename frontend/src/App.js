import ConfigCreator from "./pages/ConfigCreator";
import ConfigFetcher from "./pages/ConfigFetcher";
import ConfigUpdater from "./pages/ConfigUpdater";
const App = () => {
  return (
    <div className="text-center">
      <ConfigFetcher />
      <ConfigUpdater />
      <ConfigCreator />
    </div>
  );
};

export default App;
