// 日志系统

// as const 是一个类型断言，用于将一个对象字面量标记为常量，从而是对象中的所有属性都成为只读
export const LogLevel = {
  NONE: "NONE",
  ERROR: "ERROR",
  WARN: "WARN",
  DEBUG: "DEBUG",
  ALL: "ALL",
} as const;

const LogLevelNumber = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  DEBUG: 3,
  ALL: 4,
} as const;

export interface LogerOptions {
  prefix?: string;
  level?: keyof typeof LogLevel;
  showLevel?: boolean;
}

export class Logger {
  protected prefix: string; // 日志前缀
  protected level: keyof typeof LogLevel; // level = "NONE" | "ERROR" | "WARN" | "DEBUG" | "ALL"
  protected showLevel: boolean; // showLevel 为 true 的话，则会在日志信息前面加上日志的等级

  private readonly levelNumber: number;

  constructor({
    prefix = "",
    level = LogLevel.ALL,
    showLevel = true,
  }: LogerOptions) {
    this.prefix = prefix;
    this.level = level;
    this.levelNumber = LogLevelNumber[this.level];
    this.showLevel = showLevel;
  }

  // canWrite 函数用来判断某个日志是否能被输出
  private canWrite(level: keyof typeof LogLevel): boolean {
    return this.levelNumber >= LogLevelNumber[level];
  }

  // write 函数用来写日志
  private write(level: keyof typeof LogLevel, ...args: unknown[]): void {
    let prefix = this.prefix;

    // 根据 showLevel 判断是否要在前缀之前加上日志等级
    if (this.showLevel) {
      prefix = `- ${level} ${prefix}`;
    }
    // 根据日志类别来判断要以什么方式来输出日志
    if (level === LogLevel.ERROR) {
      console.error(prefix, ...args);
    } else {
      console.log(prefix, ...args);
    }
  }

  debug = (...args: unknown[]): void => {
    if (this.canWrite(LogLevel.DEBUG)) {
      this.write(LogLevel.DEBUG, ...args);
    }
  };

  warn = (...args: unknown[]): void => {
    if (this.canWrite(LogLevel.WARN)) {
      this.write(LogLevel.WARN, ...args);
    }
  };

  error = (...args: unknown[]): void => {
    if (this.canWrite(LogLevel.ERROR)) {
      this.write(LogLevel.ERROR, ...args);
    }
  };
}

export function createLogger({
  prefix,
  level,
  showLevel,
}: LogerOptions = {}): Logger {
  return new Logger({ prefix, level, showLevel });
}
