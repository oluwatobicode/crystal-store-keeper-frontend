export const permissionsSections = [
  // dashboard view
  {
    title: "Dashboard",
    key: "dashboard",
    items: [
      {
        id: "dashboard.view",
        label: "View Dashboard",
        desc: "Access dashboard overview",
      },
    ],
  },

  // point of sales roles
  {
    title: "Point of Sale",
    key: "pos",
    items: [
      {
        id: "pos.operate",
        label: "Operate POS",
        desc: "Create and process sales transactions",
      },
      {
        id: "pos.discount.small",
        label: "Small Discounts",
        desc: "Apply discounts up to threshold",
      },
      {
        id: "pos.discount.large",
        label: "Large Discounts",
        desc: "Apply discounts above threshold",
      },
      {
        id: "pos.refund",
        label: "Process Refunds",
        desc: "Issue refunds and returns",
      },
    ],
  },

  // customer roles
  {
    title: "Customers",
    key: "customers",
    items: [
      {
        id: "customers.view",
        label: "View Customers",
        desc: "Search and view customer information",
      },
      {
        id: "customers.manage",
        label: "Manage Customers",
        desc: "Add, edit, and delete customers",
      },
      {
        id: "customer.history",
        label: "Customer History",
        desc: "View complete purchase history",
      },
    ],
  },

  // inventory roles
  {
    title: "Inventory",
    key: "inventory",
    items: [
      {
        id: "inventory.view",
        label: "View Inventory",
        desc: "View product catalog and stock levels",
      },
      {
        id: "inventory.manage",
        label: "Manage Products",
        desc: "Add, edit, and delete products",
      },
      {
        id: "inventory.receive",
        label: "Receive Stock",
        desc: "Process incoming stock deliveries",
      },
      {
        id: "inventory.adjust",
        label: "Stock Adjustments",
        desc: "Make stock corrections and adjustments",
      },
    ],
  },

  // transactions & payments roles
  {
    title: "Transactions & Payments",
    key: "transactions",
    items: [
      {
        id: "transactions.view",
        label: "View All Transactions",
        desc: "Access complete transaction history",
      },
      {
        id: "transactions.view.one",
        label: "View Own Transactions",
        desc: "View only personal transactions",
      },
      {
        id: "transactions.reconcile",
        label: "Reconcile Payments",
        desc: "Mark payments as confirmed",
      },
      {
        id: "transactions.mange.payments",
        label: "Manage Payments",
        desc: "Edit payment status and details",
      },
    ],
  },

  // report & analytics roles
  {
    title: "Reports & Analytics",
    key: "reports",
    items: [
      {
        id: "reports.view",
        label: "View Dashboard",
        desc: "Access financial and operational reports",
      },
      {
        id: "reports.export",
        label: "Export Reports",
        desc: "Export data to CSV/Excel",
      },
      {
        id: "reports.profit",
        label: "Profit Reports",
        desc: "View profit margins and cost analysis",
      },
    ],
  },

  // user managment roles
  {
    title: "User Management",
    key: "users",
    items: [
      {
        id: "users.manage",
        label: "Manage Users",
        desc: "Create, edit, and deactivate user accounts",
      },
      {
        id: "user.roles",
        label: "Manage Roles",
        desc: "Create and modify user roles and permissions",
      },
      {
        id: "user.activity",
        label: "User Activity",
        desc: "View user activity and audit logs",
      },
    ],
  },

  // system setting roles
  {
    title: "System Settings",
    key: "settings",
    items: [
      {
        id: "settings.manage",
        label: "System Settings",
        desc: "Configure system and business settings",
      },
      {
        id: "backup.manage",
        label: "Backup & Restore",
        desc: "Create backups and restore data",
      },
      {
        id: "audit.view",
        label: "Audit Logs",
        desc: "View and export system audit logs",
      },
    ],
  },
];
