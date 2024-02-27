import { useNavigate } from "react-router-dom";

const LoginSuccessPage = () => {
  const navigate = useNavigate();

  const performAuthAction = () => {
    // Simulating data syncing process
    // You might replace this with actual data syncing logic
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-center min-h-screen bg-cover bg-center bg-blur bg-opacity-50">
      <div className="rounded-none-lg p-8 autofill w-[500px]">
        <h2 className="text-3xl font-bold mb-6 text-center">Login Successful</h2>
        <p className="mb-6 text-gray-700">
          Your data is being synced in the background
        </p>
        <button
          onClick={performAuthAction}
          className="w-full bg-blue-500 dark:text-white rounded-none py-2 transition duration-300 hover:bg-blue-600"
        >
          Reload the page for synced data to be accessible
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
