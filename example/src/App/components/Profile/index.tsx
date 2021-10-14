import { useUser } from "nampi-use-api/index";
import { Heading } from "../Heading";
import { LoadingPlaceholder } from "../LoadingPlaceholder";
import { Pre } from "../Pre";

export const Profile = () => {
  const { initialized, loading, data } = useUser();
  return (
    <div>
      <Heading>Profile</Heading>
      {!initialized || loading ? <LoadingPlaceholder /> : <Pre>{data}</Pre>}
    </div>
  );
};
