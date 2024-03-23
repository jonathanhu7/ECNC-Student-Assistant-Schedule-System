import { LogLevel } from "./lib/logger";

export interface Config {
  LogLevel: keyof typeof LogLevel;
}

export const config: Config = {
  LogLevel:
    // 读取环境变量 NEXT_PUBLIC_LOG_LEVEL，并将其设置为日志等级
    // 如果 NEXT_PUBLIC_LOG_LEVEL 是空值或者 undefined，那么默认使用 LogLevel.ALL
    (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ??
    LogLevel.ALL,
};
