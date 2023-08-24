import { api } from '~/utils/api';

export const useDeleteProduct = () => {
  const createProductMutation = api.product.delete.useMutation();

  const deleteProduct = async (id:any) => {

    try {
      const data = await createProductMutation.mutateAsync({ id });
      // Handle success if needed

    } catch (error) {
      // Handle error if needed
      console.error('Failed to delete product:', error);
    }
  };

  return deleteProduct;
};
