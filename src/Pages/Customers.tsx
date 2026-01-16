import { useState } from "react";
import AllCustomers from "../components/customers/AllCustomers";
import CustomerData from "../components/customers/CustomerAnalytics";
import CustomerModal, { type CustomerFormData } from "../ui/CustomerModal";
import CustomerModalDetails from "../ui/CustomerModalDetails";

export interface Customer {
  name: string;
  email: string;
  number: string;
  location: string;
  customerId: string;
  lastPurchase: string;
  totalSpent: string;
  transactions: string;
}

const allCustomersData: Customer[] = [
  {
    name: "Smith Construction Ltd",
    email: "orders@smithconstruction.co.uk",
    number: "01234 567890",
    location: "123 Builder Street, Construction City, CC1 2AB",
    customerId: "C001",
    lastPurchase: "15/01/2024",
    totalSpent: "₦5,420.50",
    transactions: "28",
  },
  {
    name: "Nexus Tech Solutions",
    email: "support@nexustech.ng",
    number: "0809 123 4567",
    location: "42 Silicon Avenue, Yaba, Lagos",
    customerId: "C002",
    lastPurchase: "02/02/2024",
    totalSpent: "₦250,000.00",
    transactions: "12",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    number: "07123 456789",
    location: "12 Residential Road, Home Town, HT7 8GH",
    customerId: "C004",
    lastPurchase: "12/01/2024",
    totalSpent: "₦40,185.30",
    transactions: "6",
  },
];

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] =
    useState<CustomerFormData | null>(null);
  const [customers, setCustomers] = useState(allCustomersData);

  // --- 2. Add State for View Details ---
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);

  // --- 3. Handler for opening details ---
  const handleViewDetails = (customer: Customer) => {
    setViewCustomer(customer);
  };

  const handleAddNew = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer({
      fullName: customer.name,
      emailAddress: customer.email,
      phoneNumber: customer.number,
      address: customer.location,
      customerType: "Company",
      creditLimit: 0,
    });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = (data: CustomerFormData) => {
    if (editingCustomer) {
      const updatedCustomers = customers.map((c) => {
        if (c.email === editingCustomer.emailAddress) {
          return {
            ...c,
            name: data.fullName,
            email: data.emailAddress,
            number: data.phoneNumber,
            location: data.address,
          };
        }
        return c;
      });
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomer = {
        name: data.fullName,
        email: data.emailAddress,
        number: data.phoneNumber,
        location: data.address,
        customerId: `C${String(customers.length + 1).padStart(3, "0")}`,
        lastPurchase: "N/A",
        totalSpent: "₦0.00",
        transactions: "0",
      };
      setCustomers([...customers, newCustomer]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6">
      <CustomerData onAddClick={handleAddNew} />
      <AllCustomers
        customers={customers}
        onEditClick={handleEdit}
        onViewClick={handleViewDetails}
      />
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
          onClose={() => setViewCustomer(null)}
          customer={viewCustomer}
        />
      )}
    </div>
  );
};
export default Customers;
