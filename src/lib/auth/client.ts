// AuthClient 用于从服务器上获取用户信息从而验证用户信息
import { type User } from "@/types/user";

// TODO: 移除该模拟数据
// 用于测试的模拟数据
const user = {
  id: "12345678",
  name: "张三",
  avatar: "/assets/avatar.png",
  email: "zhangsan@ecnc.link",
} satisfies User;

class AuthClient {
  // getUser 从服务器上获取信息，所以应该是异步的
  async getUser(): Promise<{ data: User | null; error?: string | null }> {
    // TODO: 添加一个 API 请求
    return { data: user };
  }
}

export const authClient = new AuthClient();
