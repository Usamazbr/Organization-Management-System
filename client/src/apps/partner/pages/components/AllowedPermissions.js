import { useAllowedPermsContext } from "../../context/permissionsContext";

const Perms = () => {
  const { permissions } = useAllowedPermsContext();
  return permissions?.map(({ id, name }) => (
    <p key={id} className="">
      {name}
    </p>
  ));
};

export default Perms;
