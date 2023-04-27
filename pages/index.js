import ProductList from "../components/ProductList";
import styled from "styled-components";
import ProductForm from "../components/ProductForm";
import useSWRMutation from "swr/mutation";

const Heading = styled.h1`
  text-align: center;
  color: var(--color-nemo);
`;

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    console.error(response.status);
  }
}

export default function HomePage() {
  const { trigger } = useSWRMutation("/api/products", sendRequest);

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const productData = Object.fromEntries(formData);

  //   trigger(productData);
  //   event.target.reset();
  // }

  function handleAddProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    trigger(productData);
    event.target.reset();
  }
  const defaultValue = {
    name: "",
    description: "",
    price: null,
    currency: "EUR",
  };

  return (
    <>
      <Heading>
        <span role="img" aria-label="A fish">
          🐠
        </span>
        Fish Shop
      </Heading>
      <ProductForm onSubmit={handleAddProduct} value={defaultValue} />
      <hr />
      <ProductList />
    </>
  );
}
