"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
const baseUrl = "https://pets-react-query-backend.eapi.joincoded.com";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function fetchPets() {
  const response = await fetch(`${baseUrl}/pets`);
  const pets = await response.json();
  return pets;
}

export async function fetchPet(id) {
  const response = await fetch(`${baseUrl}/pets/${id}`);
  const pet = await response.json();
  return pet;
}

export async function createPet(formData) {
  const petData = {
    ...Object.fromEntries(formData),
    adopted: 0,
  };
  const response = await fetch(`${baseUrl}/pets`, {
    method: "POST",
    headers,
    body: JSON.stringify(petData),
  });
  const newPet = await response.json();
  revalidatePath("/pets");
  revalidatePath(`/pets/[id]`, "page");
  redirect(`/pets/${newPet.id}`);
}
