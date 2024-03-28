// emotion-cache.tsx 的作用是优化使用 Next.js 框架和 Emotion 库时，服务端渲染 (Server Side Render, SSR) 的样式处理
// Emotion 是一个高性能的 CSS-in-JS 库，它允许你在 JavaScript 文件中以字符串或对象的形式写入样式

"use client";

import type {
  EmotionCache,
  Options as OptionsOfCreateCache,
} from "@emotion/cache";
import createCache from "@emotion/cache";
import React from "react";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";

// Registry 用来记录样式、整理样式和提供样式
// 当你在组件中使用样式时，比如给一个按钮添加颜色，这个样式会被加入到 Registry 中
// 当你的页面或组件准备好显示到屏幕上时，Registry 中的 flush 函数就会将里面记录的所有样式收集起来
// 交给浏览器去显示，然后 flush 还会清空 Registry。这样做的好处是，在 SSR 的情况下，你可以
// 确保每次所有需要的样式都已经准备好，并且在页面加载时就可以直接使用，避免了页面加载后样式突然改变的闪烁问题
interface Registry {
  cache: EmotionCache;
  flush: () => Array<{ name: string; isGlobal: boolean }>;
}

export interface NextAppDirEmtionCacheProviderProps {
  // options 是 Emotion 库用来创建样式缓存的方法，它的选项可以用于定制缓存行为
  options: Omit<OptionsOfCreateCache, "insertionPoint">;
  // CacheProvider 允许你提供一个自定义的缓存提供者组件，如果没有提供，将使用 DefaultCacheProvider
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.ReactElement | null;
  // 组件的子元素
  children: React.ReactNode;
}

// 以下代码在 https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx 的基础上进行修改
export default function NextAppDirEmtionCacheProvider(
  props: NextAppDirEmtionCacheProviderProps,
): React.ReactElement {
  // 从 propos 中解析出数据
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  // useState 钩子的参数可以是一个函数，当你使用函数来作为 useState 的参数时，这个函数被称为“惰性初始状态函数”
  // 当初始状态的计算比较昂贵时，使用参数可以提高性能，React 只会在组件的初始渲染时调用这个函数来获取初始值
  // 这意味着如果组件重新渲染，这个函数不会被再次调用，从而避免了不必要的计算开销
  const [registry] = React.useState<Registry>(() => {
    const cache = createCache(options);
    cache.compat = true; // 确保 Emotion 的缓存实例与旧版本的 Emotion 库的兼容性

    // 先将原来的 insert 方法保存到 prevInsert，后面将对 insert 进行重写，insert 方法负责将样式添加到缓存中
    // 如果这里不添加 bind(cache)，会被 eslint 警告丢失 cache 信息
    // bind 本质上是创建了一个新的函数，使其 this 永远被绑定为 cache，即使后面 cache.insert 被修改了
    // prevInsert 依然保持为绑定前的 insert 方法的引用
    const prevInsert = cache.insert.bind(cache);
    // inserted 用来记录每个被插入 Emotion 缓存的样式的相关信息
    // name 用来存储样式的唯一标识符，isGlobal 用来记录样式是全局样式还是局部样式
    let inserted: Array<{ name: string; isGlobal: boolean }> = [];

    cache.insert = (...args) => {
      const [selector, serialized] = args;

      // 检查传入的样式是否已经被插入到了 inserted 数组
      if (cache.inserted[serialized.name] === undefined) {
        // 如果 selector 不存在，那么就表示这是一个全局样式
        inserted.push({
          name: serialized.name,
          isGlobal: selector === undefined,
        });
      }

      // 调用之前保存的 insert 方法来保存样式
      return prevInsert(...args);
    };

    // 定义 flush 方法，当调用时，他会返回 inserted 数组中记录的所有样式信息，并清空数组以备下次使用
    const flush = (): Array<{ name: string; isGlobal: boolean }> => {
      // prevInserted 保存之前插入的样式
      const prevInserted = inserted;
      // 清空样式
      inserted = [];
      // 将之前的样式返回
      return prevInserted;
    };

    // 返回 cache 和 flush 函数给 registry
    return { cache, flush };
  });

  // useServerInsertedHTML 钩子用于在服务端渲染期间将收集到的样式插入到 HTML 中
  useServerInsertedHTML((): React.ReactElement | null => {
    // 获取之前存储的样式
    const inserted = registry.flush();

    // 如果之前没有收集到任何的样式，那么直接返回 null
    if (inserted.length === 0) {
      return null;
    }

    let dataEmotionAttribute = registry.cache.key;
    let styles = "";

    const globals: Array<{ name: string; style: string }> = [];

    inserted.forEach(({ name, isGlobal }) => {
      // 获取样式信息，根据样式是否为全局样式，将其添加到不同的容器中
      // 全局样式添加到 globals 数组中，非全局样式直接拼接到 styles 字符串中
      const style = registry.cache.inserted[name];

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          dataEmotionAttribute += `${name}`;
          styles += style;
        }
      }
    });

    return (
      <React.Fragment>
        {/* 遍历 globals 中包含的全局样式信息 */}
        {globals.map(
          ({ name, style }): React.ReactElement => (
            <style
              // 将样式字符串 style 作为 HTML 直接插入到 style 内部
              // 由于 React 默认会转移 HTML 来防止 XSS 攻击，使用 dangerouslySetInnerHTML 可以绕过这个行为
              dangerouslySetInnerHTML={{ __html: style }}
              // data-emotion 用于标识样式
              data-emotion={`${registry.cache.key}-global ${name}`}
              // key 是 React 列表渲染的要求
              key={name}
            />
          ),
        )}
        {styles !== "" ? (
          <style
            dangerouslySetInnerHTML={{ __html: styles }}
            data-emotion={dataEmotionAttribute}
          />
        ) : null}
      </React.Fragment>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
