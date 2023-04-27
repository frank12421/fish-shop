import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import { useState } from "react";
import ProductForm from "../ProductForm";
import { StyledButton } from "../Button/Button.styled";

// import Comments from "../../../../backend-create/products/components/Comments";
// import useSWRMutation from "swr/mutation";

export default function Product({ onSubmit, onDelete }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(`/api/products/${id}`);
  console.log("product-index-data:", data);
  const [isEditMode, setIsEditMode] = useState(false);

  // const { trigger, isMutating } = useSWRMutation(
  //   `/api/products/${id}`,
  //   updateProduct
  // );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledButton
        type="button"
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        Edit
      </StyledButton>
      {isEditMode && (
        <ProductForm onSubmit={onSubmit} value={data} isEditMode={true} />
      )}

      <StyledButton onClick={() => onDelete(id)} type="button">
        Deleted
      </StyledButton>

      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
