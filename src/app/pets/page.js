import PetsContainer from "./components/PetsContainer";
import { fetchPets } from "../../actions";

async function PetsPage() {
  const pets = await fetchPets();
  return <PetsContainer pets={pets} />;
}

export default PetsPage;
