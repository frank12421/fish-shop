// import Product from "../components/product";
import Product from "../components/Product";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log("pages-id:", { id });
  const { data, isLoading } = useSWR(`/api/products/${id}`);

  async function updateProduct(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Pages-id.js-Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    updateProduct
  );

  async function handelEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    console.log("Trigger:", productData);
    await trigger(productData);
    router.push("/");
  }

  async function handleDeleteProduct(event) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  if (isMutating) {
    return <h1>Submitting your changes</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <Product onSubmit={handelEditProduct} onDelete={handleDeleteProduct} />
    </>
  );
}
