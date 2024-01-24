import { useNavigate } from "react-router-dom";

const LoginSuccessPage = () => {
  const navigate = useNavigate();

  const performAuthAction = () => {
    window.location.reload();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex w-full justify-center min-h-screen bg-cover bg-center bg-blur bg-opacity-50">
      <div className="rounded-none-lg p-8 autofill w-[500px]">
        <h2 className="text-3xl font-bold mb-6 text-center">Login Successful</h2>
        <p className="mb-6 text-gray-700">
          You can now reload the page to see the Discover content.
        </p>
        <button
          onClick={performAuthAction}
          className="w-full bg-blue-500 dark:text-white rounded-none py-2 transition duration-300 hover:bg-blue-600"
        >
          Reload and Go to Discover
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessPage;