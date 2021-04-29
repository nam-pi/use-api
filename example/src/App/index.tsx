import { useAuth } from "nampi-use-api/bundle";

const App = () => {
  const { authenticated, initialized, login, logout } = useAuth();
  console.log(initialized, authenticated);
  return (
    <div>
      {initialized && authenticated ? (
        <button
          className="bg-gray-700 px-2 py-1 text-white rounded hover:bg-gray-600"
          onClick={() => logout()}
        >
          logout
        </button>
      ) : (
        <button
          className="bg-gray-700 px-2 py-1 text-white rounded hover:bg-gray-600"
          onClick={() =>
            login({
              redirectUri:
                window.location.protocol + "//" + window.location.host,
            })
          }
        >
          Login
        </button>
      )}
    </div>
  );
};

export default App;
