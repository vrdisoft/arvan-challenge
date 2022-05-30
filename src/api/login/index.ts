import request from "../axios";
const register = (data: object) => request({ url: "users", data });
const login = (data: object) => request({ url: "users/login", data });

export { login, register };
