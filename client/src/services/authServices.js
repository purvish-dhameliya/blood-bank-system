import { userLogin, userSignup } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, role, email, password) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) {
            alert("Please fill all fields");
        }
        console.log(email, password, role);
        // dispatch store here
        store.dispatch(userLogin({ role, email, password }))
    } catch (error) {
        console.log(error);
    }

}

export const handleSignup = (e, role, name, email, organizationName, hospitalName, website, address, phone, password) => {
    e.preventDefault();
    try {
        if (!role || !email || !password || !website || !address || !phone) {
            alert("Please fill all required fields");
            return;
        }
        if ((role === "admin" || role === "donor") && !name) {
            alert('Please enter your full Name');

        }
        if (role === "organization" && !organizationName) {
            alert("Please fill the organization name field");
            return;
        }

        if (role === "hospital" && !hospitalName) {
            alert("Please fill the hospital name field");
            return;
        }

        console.log(role, name, email, organizationName, hospitalName, website, address, phone, password);
        store.dispatch(userSignup({ role, name, email, organizationName, hospitalName, website, address, phone, password })        );
    } catch (error) {
        console.log(error);
    }
};
