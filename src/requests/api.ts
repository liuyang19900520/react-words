import request from "./index";

// 请求中： 请求参数和返回值的类型都需要进行约束

// 验证码请求
export const CaptchaAPI = (): Promise<CaptchaAPIRes> =>
  request.get("/prod-api/captchaImage");

// 登录请求
export const LoginAPI = (params: LoginAPIReq): Promise<LoginAPIRes> =>
  request.post("/prod-api/login", params);

// WordListAPI
export const WordListAPI = (params: WordListAPIReq): Promise<WordListAPIRes> =>
  request.post("/listWords", params, {
    withCredentials: true, // 确保发送凭据（如 cookies）
  });

// 新的 API 函数，传递参数为 WordListAPIReq 的数组
export const WordListBulkAPI = (
  params: WordListAPIReq[]
): Promise<WordListAPIRes> =>
  request.post("/listWordsBulk", params, {
    withCredentials: true, // 确保发送凭据（如 cookies）
  });
