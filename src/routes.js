/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import EditProfile from "layouts/profile/edit-profile";
import Customers from "layouts/customers/customers";
import Users from "layouts/users/users"
import Agent from "layouts/agent/agent"
import PosDevices from "layouts/posdevices/posDevices"
import AgentForm from "layouts/agent/agent-form"
import AgentDetails from "layouts/agent/agent-details";
import CustomerDetails from "layouts/customers/customer-details";
import CustomerForm from "layouts/customers/customer-form"
import Merchants from "layouts/merchants/merchants";
import MerchantForm from "layouts/merchants/merchant-form"
import MerchantDetails from "layouts/merchants/merchant-details";
import Tellers from "layouts/teller/tellers"
import TellerForm from "layouts/teller/teller-form"
import Banks from "layouts/banks/banks";
import BankForm from "layouts/banks/bank-form";
import Corporate from "layouts/corporate/corporate";
import CorporateForm from "layouts/corporate/corporate-form";
import PosForm from "layouts/posdevices/pos-form";
import PosDetails from "layouts/posdevices/pos-details"
import Roles from "layouts/roles/roles";
import RoleForm from "layouts/roles/role-form";
import CardLevels from "layouts/cardlevel/cardLevels";
import CardLevelForm from "layouts/cardlevel/card-level-form";
import CardTypes from "layouts/cardtype/cardTypes";
import CardTypeForm from "layouts/cardtype/card-type-form";
import BusinessTypes from "layouts/businesstype/businessTypes";
import BusinessTypeForm from "layouts/businesstype/business-type-form";
import UserForm from "layouts/users/usersform";
import UsersDetails from "layouts/users/usersdetails";
import Permissions from "layouts/permissions/permissions";
import Reports from "layouts/reports/index"
import CorporateDetails from "layouts/corporate/corporate-details";
import CorporateTransactionTable from "layouts/corporate/corporateTransactionTable";
import NfcCard from "layouts/nfccard/nfcCard";
import NfcCardForm from "layouts/nfccard/nfc-card-form"

// @mui icons
import Icon from "@mui/material/Icon";

// Sidebar routes - these will be displayed in the sidenav
export const sidebarRoutes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "Customer Management",
        key: "customer-management",
        icon: <Icon fontSize="small">groups</Icon>,
        collapse: [
            {
                name: "Customers",
                key: "customers",
                icon: <Icon fontSize="small">groups</Icon>,
                route: "/customers",
                component: <Customers />,
            },
            {
                name: "Merchants",
                key: "merchants",
                icon: <Icon fontSize="small">groups</Icon>,
                route: "/merchants",
                component: <Merchants />,
            },
            {
                name: "Corporate",
                key: "corporate",
                icon: <Icon fontSize="small">apartment</Icon>,
                route: "/corporate",
                component: <Corporate />,
            },
        ],
    },
    {
        type: "collapse",
        name: "Wallet & Transaction Management",
        key: "wallet_transaction_management",
        icon: <Icon fontSize="small">dashboard</Icon>,
        collapse: [
            {
                name: "All Wallets",
                key: "roles",
                icon: <Icon fontSize="small">wallet</Icon>,
                route: "all_wallets",
                component: "",
            },
            {
                name: "Transactions",
                key: "role_permission",
                icon: <Icon fontSize="small">point_of_sale</Icon>,
                route: "transactions",
                component: "",
            },
        ]
    },
    {
        type: "collapse",
        name: "User & Access Management",
        key: "user-management",
        icon: <Icon fontSize="small">people</Icon>,
        collapse: [
            // {
            //     name: "Users",
            //     key: "users",
            //     icon: <Icon fontSize="small">groups</Icon>,
            //     route: "/users",
            //     component: <Users />,
            // },
            {
                name: "Roles",
                key: "roles",
                icon: <Icon fontSize="small">lock_person</Icon>,
                route: "/roles",
                component: <Roles />,
            },
            {
                name: "Role & Permission",
                key: "role_permission",
                icon: <Icon fontSize="small">lock_person</Icon>,
                route: "/roles-permissions",
                component: <Permissions />,
            },
            // {
            //     name: "Agents",
            //     key: "agents",
            //     icon: <Icon fontSize="small">badge</Icon>,
            //     route: "/agents",
            //     component: <Agent />,
            // },
        ],
    },
    {
        type: "collapse",
        name: "Reports",
        key: "reports",
        icon: <Icon fontSize="small">assessment</Icon>,
        route: "/reports",
        component: <Reports />,
    },
    {
        type: "collapse",
        name: "Cards",
        key: "card",
        icon: <Icon fontSize="small">credit_card</Icon>,
        collapse: [
            {
                name: "Card Levels",
                key: "card-levels",
                icon: <Icon fontSize="small">credit_card</Icon>,
                route: "/card-levels",
                component: <CardLevels />,
            },
            {
                name: "Card Types",
                key: "card-types",
                icon: <Icon fontSize="small">credit_card</Icon>,
                route: "/card-types",
                component: <CardTypes />,
            },
            {
                name: "NFC Cards",
                key: "nfc-cards",
                icon: <Icon fontSize="small">credit_card</Icon>,
                route: "/nfc-cards",
                component: <NfcCard />,
            },
        ],
    },
    // {
    //     type: "collapse",
    //     name: "System Management",
    //     key: "system-management",
    //     icon: <Icon fontSize="small">settings</Icon>,
    //     collapse: [
    //         {
    //             name: "Tellers",
    //             key: "tellers",
    //             icon: <Icon fontSize="small">groups</Icon>,
    //             route: "/tellers",
    //             component: <Tellers />,
    //         },
    //         {
    //             name: "POS Devices",
    //             key: "pos-devices",
    //             icon: <Icon fontSize="small">point_of_sale</Icon>,
    //             route: "/pos-devices",
    //             component: <PosDevices />,
    //         },
    //         {
    //             name: "Banks",
    //             key: "banks",
    //             icon: <Icon fontSize="small">account_balance</Icon>,
    //             route: "/banks",
    //             component: <Banks />,
    //         },
    //     ],
    // },
    // {
    //     type: "collapse",
    //     name: "Configuration",
    //     key: "configuration",
    //     icon: <Icon fontSize="small">tune</Icon>,
    //     collapse: [
    //         {
    //             name: "Card Levels",
    //             key: "card-levels",
    //             icon: <Icon fontSize="small">credit_card</Icon>,
    //             route: "/card-levels",
    //             component: <CardLevels />,
    //         },
    //         {
    //             name: "Card Types",
    //             key: "card-types",
    //             icon: <Icon fontSize="small">credit_card</Icon>,
    //             route: "/card-types",
    //             component: <CardTypes />,
    //         },
    //         {
    //             name: "Business Types",
    //             key: "business-types",
    //             icon: <Icon fontSize="small">credit_card</Icon>,
    //             route: "/business-types",
    //             component: <BusinessTypes />,
    //         },
    //     ],
    // },
    {
        type: "collapse",
        name: "Profile",
        key: "profile",
        icon: <Icon fontSize="small">account_circle</Icon>,
        route: "/profile",
        component: <Profile />,
    },
];

// Auth routes - these are for authentication pages (sign in, sign up, etc.)
export const authRoutes = [
    {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/authentication/sign-in",
        component: <SignIn />,
    },
    {
        type: "collapse",
        name: "Sign Up",
        key: "sign-up",
        icon: <Icon fontSize="small">assignment</Icon>,
        route: "/authentication/sign-up",
        component: <SignUp />,
    },
];

// Protected routes - these will be available after authentication
export const protectedRoutes = [
    // Dashboard
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },

    // User Management nested routes
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize="small">groups</Icon>,
        route: "/users",
        component: <Users />,
    },
    {
        type: "collapse",
        name: "Add User",
        key: "add-user",
        icon: <Icon fontSize="small">person_add</Icon>,
        route: "/add-user",
        component: <UserForm />,
    },
    {
        type: "collapse",
        name: "Edit User",
        key: "edit-user",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-user",
        component: <UserForm />,
    },
    {
        type: "collapse",
        name: "User Details",
        key: "user-details",
        icon: <Icon fontSize="small">visibility</Icon>,
        route: "/user-details",
        component: <UsersDetails />,
    },
    {
        type: "collapse",
        name: "Roles",
        key: "roles",
        icon: <Icon fontSize="small">lock_person</Icon>,
        route: "/roles",
        component: <Roles />,
    },
    {
        type: "collapse",
        name: "Add Role",
        key: "add-role",
        icon: <Icon fontSize="small">add</Icon>,
        route: "/add-role",
        component: <RoleForm />,
    },
    {
        type: "collapse",
        name: "Edit Role",
        key: "edit-role",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-role",
        component: <RoleForm />,
    },
    {
        type: "collapse",
        name: "Agents",
        key: "agents",
        icon: <Icon fontSize="small">badge</Icon>,
        route: "/agents",
        component: <Agent />,
    },
    {
        type: "collapse",
        name: "Add Agent",
        key: "add-agent",
        icon: <Icon fontSize="small">person_add</Icon>,
        route: "/add-agent",
        component: <AgentForm />,
    },
    {
        type: "collapse",
        name: "Edit Agent",
        key: "edit-agent",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-agent",
        component: <AgentForm />,
    },
    {
        type: "collapse",
        name: "Agent Details",
        key: "agent-details",
        icon: <Icon fontSize="small">visibility</Icon>,
        route: "/agent-details",
        component: <AgentDetails />,
    },

    // Customer Management nested routes
    {
        type: "collapse",
        name: "Customers",
        key: "customers",
        icon: <Icon fontSize="small">groups</Icon>,
        route: "/customers",
        component: <Customers />,
    },
    {
        type: "collapse",
        name: "Customer Details",
        key: "customer-details",
        icon: <Icon fontSize="small">visibility</Icon>,
        route: "/customer-details",
        component: <CustomerDetails />,
    },
    {
        type: "collapse",
        name: "Add Customer",
        key: "add-customer",
        icon: <Icon fontSize="small">person_add</Icon>,
        route: "/add-customer",
        component: <CustomerForm />,
    },
    {
        type: "collapse",
        name: "Merchants",
        key: "merchants",
        icon: <Icon fontSize="small">store</Icon>,
        route: "/merchants",
        component: <Merchants />,
    },
    {
        type: "collapse",
        name: "Add Merchant",
        key: "add-merchant",
        icon: <Icon fontSize="small">add_business</Icon>,
        route: "/add-merchant",
        component: <MerchantForm />,
    },
    {
        type: "collapse",
        name: "Edit Merchant",
        key: "edit-merchant",
        icon: <Icon fontSize="small">add_business</Icon>,
        route: "/edit-merchant",
        component: <MerchantForm />,
    },
    {
        type: "collapse",
        name: "Merchant Details",
        key: "merchant-details",
        icon: <Icon fontSize="small">visibility</Icon>,
        route: "/merchant-details",
        component: <MerchantDetails />,
    },
    {
        type: "collapse",
        name: "Corporate",
        key: "corporate",
        icon: <Icon fontSize="small">apartment</Icon>,
        route: "/corporate",
        component: <Corporate />,
    },
    {
        type: "collapse",
        name: "Add Corporate",
        key: "add-corporate",
        icon: <Icon fontSize="small">business</Icon>,
        route: "/add-corporate",
        component: <CorporateForm />,
    },
    {
        type: "collapse",
        name: "Edit Corporate",
        key: "edit-corporate",
        icon: <Icon fontSize="small">business</Icon>,
        route: "/edit-corporate",
        component: <CorporateForm />,
    },
    {
        type: "collapse",
        name: "Corporate Details",
        key: "corporate-details",
        icon: <Icon fontSize="small">business</Icon>,
        route: "/corporate-details",
        component: <CorporateDetails />,
    },
    {
        type: "collapse",
        name: "Corporate Transactions",
        key: "corporate-transactions",
        icon: <Icon fontSize="small">business</Icon>,
        route: "/corporate-transactions",
        component: <CorporateTransactionTable />,
    },

    // System Management nested routes
    {
        type: "collapse",
        name: "Tellers",
        key: "tellers",
        icon: <Icon fontSize="small">groups</Icon>,
        route: "/tellers",
        component: <Tellers />,
    },
    {
        type: "collapse",
        name: "Add Teller",
        key: "add-teller",
        icon: <Icon fontSize="small">person_add</Icon>,
        route: "/add-teller",
        component: <TellerForm />,
    },
    {
        type: "collapse",
        name: "POS Devices",
        key: "pos-devices",
        icon: <Icon fontSize="small">point_of_sale</Icon>,
        route: "/pos-devices",
        component: <PosDevices />,
    },
    {
        type: "collapse",
        name: "Add POS Device",
        key: "add-pos",
        icon: <Icon fontSize="small">add</Icon>,
        route: "/add-pos",
        component: <PosForm />,
    },
    {
        type: "collapse",
        name: "Edit POS Device",
        key: "edit-pos",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-pos",
        component: <PosForm />,
    },
    {
        type: "collapse",
        name: "POS Device Details",
        key: "pos-details",
        icon: <Icon fontSize="small">visibility</Icon>,
        route: "/pos-details",
        component: <PosDetails />,
    },
    {
        type: "collapse",
        name: "Banks",
        key: "banks",
        icon: <Icon fontSize="small">account_balance</Icon>,
        route: "/banks",
        component: <Banks />,
    },
    {
        type: "collapse",
        name: "Add Bank",
        key: "add-bank",
        icon: <Icon fontSize="small">add</Icon>,
        route: "/add-bank",
        component: <BankForm />,
    },
    {
        type: "collapse",
        name: "Edit Bank",
        key: "edit-bank",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-bank",
        component: <BankForm />,
    },

    // Configuration nested routes
    {
        type: "collapse",
        name: "Card Levels",
        key: "card-levels",
        icon: <Icon fontSize="small">credit_card</Icon>,
        route: "/card-levels",
        component: <CardLevels />,
    },
    {
        type: "collapse",
        name: "Add Card Level",
        key: "add-cardlevel",
        icon: <Icon fontSize="small">add</Icon>,
        route: "/add-cardlevel",
        component: <CardLevelForm />,
    },
    {
        type: "collapse",
        name: "Edit Card Level",
        key: "edit-cardlevel",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-cardlevel",
        component: <CardLevelForm />,
    },
    {
        type: "collapse",
        name: "Card Types",
        key: "card-types",
        icon: <Icon fontSize="small">credit_card</Icon>,
        route: "/card-types",
        component: <CardTypes />,
    },
    {
        type: "collapse",
        name: "Add Card Type",
        key: "add-cardtype",
        icon: <Icon fontSize="small">add</Icon>,
        route: "/add-cardtype",
        component: <CardTypeForm />,
    },
    {
        type: "collapse",
        name: "Edit Card Type",
        key: "edit-cardtype",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-cardtype",
        component: <CardTypeForm />,
    },
    {
        type: "collapse",
        name: "Business Types",
        key: "business-types",
        icon: <Icon fontSize="small">business</Icon>,
        route: "/business-types",
        component: <BusinessTypes />,
    },
    {
        type: "collapse",
        name: "Add Business Type",
        key: "add-businesstype",
        icon: <Icon fontSize="small">add</Icon>,
        route: "/add-businesstype",
        component: <BusinessTypeForm />,
    },
    {
        type: "collapse",
        name: "Edit Business Type",
        key: "edit-businesstype",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-businesstype",
        component: <BusinessTypeForm />,
    },

    // Profile
    {
        type: "collapse",
        name: "Profile",
        key: "profile",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/profile",
        component: <Profile />,
    },
    {
        type: "collapse",
        name: "Edit Profile",
        key: "edit-profile",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-profile",
        component: <EditProfile />,
    },

    // Nfc card
    {
        type: "collapse",
        name: "Add NFC Card",
        key: "add-nfc-card",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/add-nfc-card",
        component: <NfcCardForm />,
    },
    {
        type: "collapse",
        name: "Edit NFC Card",
        key: "edit-nfc-card",
        icon: <Icon fontSize="small">edit</Icon>,
        route: "/edit-nfc-card",
        component: <NfcCardForm />,
    },

];

// All routes combined (for backward compatibility)
const allRoutes = [...sidebarRoutes, ...authRoutes, ...protectedRoutes];

export default allRoutes;