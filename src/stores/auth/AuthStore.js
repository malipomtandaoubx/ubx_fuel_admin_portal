/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { LoginService, fetchCountryService, updateProfileService } from './AuthServices';

class AuthStore {
    user = null;
    loading = false;
    error = null;
    is_login = false;
    token = null;
    country = [];
    language = "English";
    userLoaded = false;

    transactions = {
        English: {
            profile: "Profile",
            settings: "Settings",
            logout: "Logout",
            confirmLogout: "Confirm Logout",
            logoutMsg: "Are you sure you want to logout?",
            cancel: "Cancel",
            welcome_back: "Welcome Back",
            login_to_your_account: "Login to your account",
            dont_have_account: "Don’t have an account?",
            register: "Register",
            login: "Login",
            phone_number: "Phone Number",
            password: "Password",
            validation_error: "Validation Error",
            phone_number_can_not_be_empty: "Phone number cannot be empty",
            phone_number_must_be_10_digit: "Phone number must be 10 digits",
            passwrod_cannot_be_empty: "Password cannot be empty",
            password_must_be_8_characters: "Password must be 8+ characters",
            login_failed: "Login Failed",
            welcome: "Welcome!",
            login_successfull: "Login successful",
            my_wallet: "My Wallet",
            home: "Home",
            my_bank: "My Bank",
            available_balance: "Available Balance",
            quick_actions: "Quick Actions",
            top_up_wallet: "Top-up Wallet",
            request_fuel: "Request Fuel",
            scan_qr: "Scan QR",
            transactions: "Transactions:",
            summary: "Summary",
            total_spent: "Total Spent:",
            usage_summary: "Usage Summary",
            choose_payment_method: "Choose Payment Method",
            wallet: "Wallet",
            mobile_money: "Mobile Money",
            station_code: "Station Code",
            enter_station_code: "Enter station code",
            enter_amount: "Enter Amount",
            enter_liters: "Enter Liters",
            submit: "Submit",
            near_by: "Near By",
            no_transaction_found: "No transactions found",
            transaction_details: "Transaction Details",
            amount: "Amount",
            channel: "Channel",
            transaction_id: "Transaction ID",
            type: "Type",
            created_at: "Created At",
            remarks: "Remarks",
            heading_transaction: "Transactions",
            confirm_logout: "Confirm Logout",
            my_profile: "My Profile",
            first_name: "First Name",
            enter_first_name: "Enter first name",
            last_name: "Last Name",
            enter_last_name: "Enter last name",
            email: "Email",
            enter_email: "Enter email",
            enter_phone_number: "Enter phone number",
            address: "Address",
            enter_address: "Enter address",
            update_profile: "Update Profile",
            first_name_is_required: "First name is required",
            last_name_is_required: "Last name is required",
            email_is_required: "Email is required",
            enter_valid_email: "Enter valid email",
            phone_number_is_required: "Phone number is required",
            enter_valid_10_digit_phone_number_required: "Enter a valid 10-digit phone number",
            address_required: "Address is required",
            profile_update_failed: "Profile Update Failed",
            congratulations: "Congratulations!",
            profile_updated_successfully: "Profile updated successfully",
            english: "English",
            swahili: "Swahili",
            choose_language: "Choose Language",
            notification: "Notifications",
            top_up_wallet: "Top-Up Wallet",
            card: "Card",
            bank_transfer: "Bank Transfer",
            fuel_type: 'Fuel Type',
            enter_fuel_type: 'Enter fuel type',
            quantity_liters: "Qunatity Liters",
            enter_qunatity_liters: "Enter quantity liters",
            station: "Station",
            enter_station: "Enter Station",
            submit_request: "Submit Request",
            support_help_center: "Support/Help Center",
            support_help_center_validation_error: "Validation Error",
            support_help_center_validation_error_msg: "Please fill all fields before submitting.",
            support_help_center_validation_success: "Success",
            support_help_center_validation_success_msg: "Your support request has been submitted!",
            name: "Name",
            enter_name: "Enter Name",
            message: "Message",
            enter_message: "Enter Message",
            support_help_center_header_msg: "Need help? Fill out the form below and our support team will get back to you.",
            i_agree_to_the: "I Accept The",
            terms_and_conditions: "Terms & Conditions",
            about_us: "About Us",
            privacy_policy: "Privacy policy",
            enable_biometrics: "Enable Biomterics",
            biometric_not_available: "Biometric Not Available",
            biometric_not_supported_message: "Your device does not support biometric authentication or it is not set up.",
            biometric_enabled: "Biometric Enabled",
            biometric_enabled_message: "Biometric authentication has been enabled successfully.",
            authentication_failed: "Authentication Failed",
            biometric_enable_failed: "Biometric authentication failed. Please try again.",
            biometric_disabled: "Biometric Disabled",
            biometric_disabled_message: "Biometric authentication has been disabled.",
            authenticate_to_continue: "Authenticate to continue",
            secure_login: "Secure Login",
            user_biometric_or_device_pin: "Use biometric or device PIN",
            authenticate_to_access_your_account: "Authenticate to access your account",
            use_pin: "Use PIN",
            would_you_like_to_try_again: "Would you like to try again?",
            try_again: "Try Again",
            exit_app: "Exit App"

        },
        Swahili: {
            profile: "Wasifu",
            settings: "Mipangilio",
            logout: "Ondoka",
            confirmLogout: "Thibitisha Kuondoka",
            logoutMsg: "Una uhakika unataka kuondoka?",
            cancel: "Ghairi",
            welcome_back: "Karibu Tena",
            login_to_your_account: "Ingia kwenye akaunti yako",
            dont_have_account: "Huna akaunti?",
            register: "Jiandikishe",
            login: "Ingia",
            phone_number: "Nambari ya Simu",
            password: "Nenosiri",
            validation_error: "Hitilafu ya Uthibitishaji",
            phone_number_can_not_be_empty: "Nambari ya simu hawezi kuwa tupu",
            phone_number_must_be_10_digit: "Nambari ya simu lazima iwe tarakimu 10",
            passwrod_cannot_be_empty: "Nenosiri haliwezi kuwa tupu",
            password_must_be_8_characters: "Nenosiri lazima liwe na herufi 8+",
            login_failed: "Ingia Imeshindwa",
            welcome: "Karibu!",
            login_successfull: "Ingia imefanikiwa",
            my_wallet: "Mkoba Wangu",
            home: "Nyumbani",
            my_bank: "Benki Yangu",
            available_balance: "Salio Inayopatikana",
            quick_actions: "Vitendo vya Haraka",
            top_up_wallet: "Jaza Mkoba",
            request_fuel: "Omba Mafuta",
            scan_qr: "Changanua QR",
            transactions: "Shughuli:",
            summary: "Muhtasari",
            total_spent: "Jumla ya Matumizi:",
            usage_summary: "Muhtasari wa Matumizi",
            choose_payment_method: "Chagua Mfumo wa Malipo",
            wallet: "Mkoba",
            mobile_money: "Pesa Mkoba",
            station_code: "Msimbo wa Kituo",
            enter_station_code: "Weka msimbo wa kituo",
            enter_amount: "Weka Kiasi",
            enter_liters: "Weka Lita",
            submit: "Wasilisha",
            near_by: "Karibu",
            no_transaction_found: "Hakuna shughuli zilizopatikana",
            transaction_details: "Maelezo ya Shughuli",
            amount: "Kiasi",
            channel: "Njia",
            transaction_id: "Kitambulisho cha Shughuli",
            type: "Aina",
            created_at: "Imeundwa Tarehe",
            remarks: "Maoni",
            heading_transaction: "Shughuli",
            confirm_logout: "Thibitisha Kuondoka",
            my_profile: "Wasifu Wangu",
            first_name: "Jina la Kwanza",
            enter_first_name: "Weka jina la kwanza",
            last_name: "Jina la Mwisho",
            enter_last_name: "Weka jina la mwisho",
            email: "Barua Pepe",
            enter_email: "Weka barua pepe",
            enter_phone_number: "Weka nambari ya simu",
            address: "Anwani",
            enter_address: "Weka anwani",
            update_profile: "Sasisha Wasifu",
            first_name_is_required: "Jina la kwanza linahitajika",
            last_name_is_required: "Jina la mwisho linahitajika",
            email_is_required: "Barua pepe inahitajika",
            enter_valid_email: "Weka barua pepe halali",
            phone_number_is_required: "Nambari ya simu inahitajika",
            enter_valid_10_digit_phone_number_required: "Weka nambari ya simu halali ya tarakimu 10",
            address_required: "Anwani inahitajika",
            profile_update_failed: "Kusasisha Wasifu Kumeshindwa",
            congratulations: "Hongera!",
            profile_updated_successfully: "Wasifu umesasishwa kwa mafanikio",
            english: "Kiingereza",
            swahili: "Kiswahili",
            choose_language: "Chagua lugha",
            notification: "Arifa",
            top_up_wallet: "Jaza Pesa Mkoba",
            card: "Kadi",
            bank_transfer: "Uhamisho wa Benki",
            fuel_type: "Aina ya Mafuta",
            enter_fuel_type: "Ingiza Aina ya Mafuta",
            quantity_liters: "Kiasi cha Lita",
            enter_qunatity_liters: "Ingiza Kiasi cha Lita",
            station: "Kituo",
            enter_station: "Ingiza Kituo",
            submit_request: "Wasilisha Ombi",
            support_help_center: "Msaada/Kituo cha Usaidiz",
            support_help_center_validation_error: "Hitilafu ya Uthibitishaji",
            support_help_center_validation_error_msg: "Tafadhali jaza sehemu zote kabla ya kuwasilisha.",
            support_help_center_validation_success: "Mafanikio",
            support_help_center_validation_success_msg: "Ombi lako la msaada limewasilishwa!",
            name: "Jina",
            enter_name: "Ingiza Jina",
            message: "Ujumbe",
            enter_message: "Ingiza Ujumbe",
            support_help_center_header_msg: "Unahitaji msaada? Jaza fomu hapa chini na timu yetu ya msaada itakurudia.",
            i_agree_to_the: "Nakubali",
            terms_and_conditions: "Masharti na Vigezo",
            about_us: "Kuhusu Sisi",
            privacy_policy: "Sera ya Faragha",
            enable_biometrics: "Wezesha Biometriki",
            biometric_not_available: "Biometriki Haipatikani",
            biometric_not_supported_message: "Kifaa chako hakiauni uthibitishaji wa biometriki au hakijasanidiwa.",
            biometric_enabled: "Biometriki Imewezeshwa",
            biometric_enabled_message: "Uthibitishaji wa biometriki umewezeshwa kwa mafanikio.",
            authentication_failed: "Uthibitishaji Umeshindwa",
            biometric_enable_failed: "Uthibitishaji wa biometriki umeshindwa. Tafadhali jaribu tena.",
            biometric_disabled: "Biometriki Imezimwa",
            biometric_disabled_message: "Uthibitishaji wa biometriki umezimwa.",
            authenticate_to_continue: "Thibitisha ili Kuendelea",
            secure_login: "Kuingia kwa Usalama",
            user_biometric_or_device_pin: "Tumia biometriki au PIN ya kifaa",
            authenticate_to_access_your_account: "Thibitisha ili Kupata Akaunti Yako",
            use_pin: "Tumia PIN",
            would_you_like_to_try_again: "Je, ungependa kujaribu tena?",
            try_again: "Jaribu Tena",
            exit_app: "Toka kwenye Programu",
            authenticate_to_enable_biometric_login: "Thibitisha ili Kuwezesha Kuingia kwa Biometriki",
            biometric_authentication_failed_or_was_cancelled: "Uthibitishaji wa Biometriki Umeshindwa au Ulighairiwa",
            error: "Hitilafu",
            an_error_occurred_while_updating_biometric_settings: "Hitilafu Imetokea Wakati wa Kusasisha Mipangilio ya Biometriki"
        }
    };

    constructor() {
        makeAutoObservable(this, {
            login: action.bound,
            loadUserFromStorage: action.bound,
            fetchCountry: action.bound,
            updateProfile: action.bound,
            setLanguage: action.bound,
        });

        this.loadLanguage();
    }


    setLanguage(lang) {
        this.language = lang;
        localStorage.setItem("language", lang); // persist choice
    }

    async loadLanguage() {
        const savedLang = await localStorage.getItem("language");
        if (savedLang) {
            runInAction(() => {
                this.language = savedLang;
            });
        }
    }

    t(key) {
        return this.transactions[this.language]?.[key] || this.transactions.English[key] || key;
    }

    async login(email, password) {
        this.loading = true;
        this.error = null;
        try {
            const payloads = {
                "email": email,
                "password": password,
            }

            let response = await LoginService(payloads);

            const userData = response?.data;
            const token = userData?.token?.access_token;

            // Save to store
            runInAction(() => {
                this.user = userData;
                this.is_login = true;
                this.token = token;
                this.loading = false;
            });
            // Save to localStorage
            await localStorage.setItem('userData', JSON.stringify(userData));
        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Login failed';

            runInAction(() => {
                this.error = errorMessage;
                this.is_login = false;
                this.loading = false;
            });
        }
    }

    async print_user_data() {
        console.log(this?.user);
    }

    async loadUserFromStorage() {
        try {
            const savedData = await localStorage.getItem('userData');

            if (savedData) {
                const userData = JSON.parse(savedData);
                runInAction(() => {
                    this.user = userData;
                    this.token = userData?.token?.access_token;
                    this.is_login = true;
                    this.userLoaded = true;
                });

                // 🔹 Optionally refresh user data from API
                if (userData?.phone && userData?.password) {
                    await this.login(userData.phone, userData.password);
                }
            }
        } catch (err) {
            runInAction(() => {
                this.userLoaded = true; // Still mark as loaded even if there's an error
            });
            console.log('Failed to load user data', err);
        }
    }

    async fetchCountry() {
        try {

            let response = await fetchCountryService();

            // // Save to store
            runInAction(() => {
                this.country = response?.data;
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Fetch country failed';

            runInAction(() => {
                this.error = errorMessage;
            });
        }
    }

    async updateProfile(payloads) {
        this.loading = true;
        this.error = null;
        try {
            await updateProfileService(payloads, this.token);


            // Save to store
            runInAction(() => {
                this.user.firstName = payloads.first_name;
                this.user.lastName = payloads.last_name;
                this.user.email = payloads.email;
                this.user.address = payloads.address;
                this.loading = false;
            });

            // Save to localStorage
            await localStorage.setItem('userData', JSON.stringify(this.user));
        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Profile update failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
            });
        }
    }

    async logout() {
        await localStorage.removeItem('userData');
        await localStorage.removeItem('language');
        // Check if biometric is enabled before removing it
        const biometricEnabled = await localStorage.getItem('biometricEnabled');

        await localStorage.removeItem('userData');
        await localStorage.removeItem('language');

        // Only remove biometricEnabled if it's not enabled (false or null)
        if (biometricEnabled !== 'true') {
            await localStorage.removeItem('biometricEnabled');
        }
        runInAction(() => {
            this.is_login = false;
            this.user = null;
            this.token = null;
            this.country = [];
            this.language = "English";
        });
    }
}

export const authStore = new AuthStore();
