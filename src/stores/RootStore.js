/* eslint-disable prettier/prettier */
// src/stores/RootStore.js
import { authStore } from './auth/AuthStore';
import { homeStore } from './home/HomeStore';
import { customerStore } from './customer/CustomerStore';
import { userStore } from './user/UserStore';
import { agentStore } from './agent/AgentStore';
import { posdevicesStore } from './posdevices/PosDevicesStore'
import { merchantStore } from './merchant/MerchantStore';
import { commonStore } from './common/CommonStore'
import { tellerStore } from './teller/TellerStore'
import { bankStore } from './bank/BankStore';
import { corporateStore } from './corporate/CorporateStore'
import { roleStore } from './role/RoleStore'
import { cardStore } from './card/CardStore'
import { businessStore } from './business/BusinessStore'
import { reportStore } from './report/ReportStore'

const rootStore = {
    authStore,
    homeStore,
    customerStore,
    userStore,
    agentStore,
    posdevicesStore,
    merchantStore,
    commonStore,
    tellerStore,
    bankStore,
    corporateStore,
    roleStore,
    cardStore,
    businessStore,
    reportStore
};

export default rootStore; 