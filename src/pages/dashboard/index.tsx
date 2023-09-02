import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import { useDeleteProduct } from "~/hooks/useDeleteProduct";
import EditProductModal from "~/components/dashboard/product-list/EditProductModal";
import DeleteModal from "~/components/dashboard/product-list/DeleteModal";
import AddProduct from "~/components/dashboard/add-product/AddProduct";
import ProductList from "~/components/dashboard/product-list/ProductList";
import DashboardSidebar from "~/components/dashboard/SidebarDashboard";

/**
 * Dashboard component that displays a user dashboard with product-related functionality.
 * This component handles the display of the user's dashboard, including the product list,
 * edit and delete modals, and adding a new product.
 * @component
 * @returns {JSX.Element} The JSX element representing the user dashboard.
 */

const Dashboard: NextPage = () => {
  const { data: products, refetch } = api.product.getAllProductById.useQuery();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(products);
  const deleteProduct = useDeleteProduct();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  /**
   * Opens the edit product modal and sets the selected product.
   * @param {any} product - The product to edit.
   */
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  /**
   * Closes the edit product modal.
   */
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  /**
   * Handles the confirmation of deleting a product.
   */
  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(selectedProductId);
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Opens the delete modal for the selected product.
   * @param {any} id - The ID of the product to delete.
   */
  const handleOpenToast = (id: any) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[125vh] bg-[#E9E9E9] font-helvetica">
        <div className="container mx-auto mb-2 flex pt-10 ">
          {/* Sidebar */}
          <DashboardSidebar
            setIsTableOpen={setIsTableOpen}
            isTableOpen={isTableOpen}
          />

          {isTableOpen && (
            <ProductList
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleOpenToast}
            />
          )}

          {!isTableOpen && <AddProduct />}

          {isEditModalOpen && (
            <EditProductModal
              onClose={handleCloseModal}
              product={selectedProduct}
              refetch={refetch}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              handleClick={handleConfirmDelete}
              onCancel={() => setIsDeleteModalOpen(false)}
              setIsToastOpen={setIsDeleteModalOpen}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
