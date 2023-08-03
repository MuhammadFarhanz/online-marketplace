import { api } from '~/utils/api';

export const useUpdateProduct = () => {
  const createProductMutation = api.product.update.useMutation();

  const updateProduct = async (id:any, newProductData:any) => {
    // console.log('Update Product - ID:', id);
    // console.log('Update Product - Data:', typeof productData);

    try {
      const data = await createProductMutation.mutateAsync({id,newProductData});
      // Handle success if needed
      console.log('Product created:', data);
    } catch (error) {
      // Handle error if needed
      console.error('Failed to updata product:', error);
    }
  };

  return updateProduct;
};
