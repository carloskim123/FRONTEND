
export default function Welcome() {
  const profilePicUrl = 'https://images.unsplash.com/photo-1612328289561-0edd72aefc43?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const username = 'Jake'; 

  return (
    <div className="fixed top-0 right-0 p-4 flex items-center">
      <div className="text-xl font-medium">Good Morning, {username}</div>
      <div className="ml-6 rounded-full overflow-hidden">
        <img className="w-10 h-10" src={profilePicUrl} alt="Profile" />
      </div>
    </div>
  );
}
