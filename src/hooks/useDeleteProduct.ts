import { api } from '~/utils/api';

export const useDeleteProduct = () => {
  const createProductMutation = api.product.delete.useMutation();

  const deleteProduct = async (id:any) => {
    console.log('Update Product - ID:', id);
    // console.log('Update Product - Data:', typeof productData);

    try {
      const data = await createProductMutation.mutateAsync({ id });
      // Handle success if needed
      console.log('Product deleted:', data);
    } catch (error) {
      // Handle error if needed
      console.error('Failed to delete product:', error);
    }
  };

  return deleteProduct;
};
