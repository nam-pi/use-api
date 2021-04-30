import { useUser } from "nampi-use-api/bundle";
import { Heading } from "../Heading";
import { LoadingPlaceholder } from "../LoadingPlaceholder";

export const Profile = () => {
  const { initialized, loading, data } = useUser();
  return (
    <div>
      <Heading>Profile</Heading>
      {!initialized || loading ? (
        <LoadingPlaceholder />
      ) : (
        <p>{JSON.stringify(data)}</p>
      )}
    </div>
  );
};
