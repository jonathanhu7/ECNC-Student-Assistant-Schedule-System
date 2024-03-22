export interface User {
  id: string; // id 可以用学号来代替
  name?: string; // 姓名，"?"表示该属性是可选的，User 接口的对象可以包含该属性，也可以不包含
  avatar?: string; // 头像，存储头像图片的 url
  email?: string; // 邮箱，作为登陆用户名

  // 这行表示 User 接口的对象可以包含任意数量的额外属性
  // 这些额外属性的键为字符串类型，值可以是任意类型
  [key: string]: unknown;
}
