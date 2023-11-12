import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  // URL から 'id' を取得
  const { id } = router.query;

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default UserPage;
