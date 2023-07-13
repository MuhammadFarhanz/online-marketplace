import { api } from '~/utils/api';

export const useCreateProduct = () => {
  const createProductMutation = api.product.create.useMutation();

  const createProduct = async (productData:any) => {
    try {
      const data = await createProductMutation.mutateAsync(productData);
      // Handle success if needed
      console.log('Product created:', data);
    } catch (error) {
      // Handle error if needed
      console.error('Failed to create product:', error);
    }
  };

  return createProduct;
};
