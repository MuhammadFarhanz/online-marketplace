import { api } from '~/utils/api';

export const useUpdateProduct = () => {
  const createProductMutation = api.product.update.useMutation();

  const updateProduct = async (id:any, newProductData:any) => {

    try {
      const data = await createProductMutation.mutateAsync({id, newProductData});

      console.log('Product updated:', data);
    } catch (error) {

      console.error('Failed to updata product:', error);
    }
  };

  return updateProduct;
};
