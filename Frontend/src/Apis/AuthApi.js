import makeApiCall from "./makeApiCalls";
const RegisterUserr = (credentials) => makeApiCall("/user/register", "POST", credentials)
const LoginUser = (credentials) => makeApiCall("/user/login", "POST", credentials)
const LogoutUser = () => makeApiCall("/user/logout", "POST")
const NewAccessToken = () => makeApiCall("/user/new-access-token", "POST")
const GetCurrentUser = () => makeApiCall("/user/me", "GET")
const ChanagePassword = (credentials) => makeApiCall("/user/change-password", "POST", credentials)
const UpdateUser = (credentials) => makeApiCall("/user/update-profile", "PATCH", credentials)
export { RegisterUserr, LoginUser, LogoutUser, GetCurrentUser, UpdateUser, NewAccessToken, ChanagePassword }