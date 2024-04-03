// AuthClient 用于从服务器上获取用户信息从而验证用户信息
import { type User } from "@/types/user";

// TODO: 将 generateToken 改成从 API 获取
function generateToken(): string {
  const arr = new Uint8Array(12); // 创建包含 12 个无符号 8 位整数的类型化数组
  window.crypto.getRandomValues(arr); // 为 arr 填充随机数
  // 将每一个 arr 中的 v 转换为 16 禁止，并确保转换结果为 2 个字符，不足的前面会加 0
  // 接着将转换结果拼接成一个字符串
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join(""); 
}

// TODO: 移除该模拟数据
// 用于测试的模拟数据
const user = {
  id: "12345678",
  name: "张三",
  avatar: "/assets/avatar.png",
  email: "zhangsan@ecnc.link",
} satisfies User;

export interface SignInWithPasswordParams {
  netid: string,
  password: string,
}

class AuthClient {
  // getUser 从服务器上获取信息，所以应该是异步的
  async getUser(): Promise<{ data: User | null; error?: string | null }> {
    // TODO: 添加一个 API 请求
    return { data: null, error: null };
  }

  // 使用密码来进行登录
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { netid, password } = params;

    // TODO: 添加一个 API 请求
    // TODO: 删除下面的硬编码数据
    if (netid !== "ecncadmin" || password !== "1qaz2wsx.") {
      return { error: "账户或者密码错误" }
    }

    const token = generateToken();
    localStorage.setItem("custom-auth-token", token);

    return {}
  }
}

export const authClient = new AuthClient();
