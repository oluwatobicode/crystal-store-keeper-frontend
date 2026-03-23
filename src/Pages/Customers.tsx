import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import AllCustomers from "../components/customers/AllCustomers";
import CustomerData from "../components/customers/CustomerAnalytics";
import CustomerModal, { type CustomerFormData } from "../ui/CustomerModal";
import CustomerModalDetails from "../ui/CustomerModalDetails";
import type { Customer } from "../types/Customers";
import { useCustomers } from "../hooks/useCustomers";

const Customers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const customerIdParam = searchParams.get("customerId");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] =
    useState<CustomerFormData | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(
    null,
  );

  const { createCustomer, updateCustomer, allCustomers } = useCustomers();
  const customersResponse = allCustomers?.data?.data;
  const customers: Customer[] = customersResponse?.data || [];

  const viewCustomer = useMemo(() => {
    if (!customerIdParam || !customers.length) return null;
    return customers.find((c) => c.customerId === customerIdParam || c._id === customerIdParam) || null;
  }, [customerIdParam, customers]);

  const handleViewDetails = (customer: Customer) => {
    setSearchParams({ customerId: customer.customerId });
  };

  const handleAddNew = () => {
    setEditingCustomer(null);
    setEditingCustomerId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomerId(customer._id);
    setEditingCustomer({
      fullName: customer.fullname,
      emailAddress: customer.email,
      phoneNumber: customer.phone,
      address: customer.address,
      customerType: customer.customerType as "Individual" | "Company",
      creditLimit: customer.creditLimit,
    });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async (data: CustomerFormData) => {
    const payload = {
      fullname: data.fullName,
      email: data.emailAddress,
      phone: data.phoneNumber,
      address: data.address,
      customerType: data.customerType.toLowerCase(),
      creditLimit: Number(data.creditLimit),
    };

    try {
      if (editingCustomerId) {
        await updateCustomer.mutateAsync({
          id: editingCustomerId,
          data: payload,
        });
        toast.success("Customer updated successfully");
      } else {
        await createCustomer.mutateAsync(payload);
        toast.success("Customer created successfully");
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
      setEditingCustomerId(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6">
      <CustomerData onAddClick={handleAddNew} />
      <AllCustomers onEditClick={handleEdit} onViewClick={handleViewDetails} />
      {isModalOpen && (
        <CustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={editingCustomer}
          onSave={handleSaveCustomer}
        />
      )}

      {viewCustomer && (
        <CustomerModalDetails
          isOpen={!!viewCustomer}
          onClose={() => setSearchParams({})}
          customer={viewCustomer}
        />
      )}
    </div>
  );
};
export default Customers;
