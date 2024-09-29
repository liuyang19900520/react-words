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
  request.get("/listWords", {
    params: {
      word: params.word,
      freq: params.freq,
      typ: params.typ, // 传递数组，axios 会自动处理
      lvl: params.lvl, // 传递数组
    },
  });
