import { useRouter } from "next/router";

export const usePageName = () => {
  const router = useRouter();
  const pathParts = router.pathname.split("/");
  const [, role, pageName] = pathParts;
  return [role, pageName];
};
