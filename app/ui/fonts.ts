import localFont from 'next/font/local'

export const lxgwBright = localFont({
  src: [
    {
      path: './fonts/LXGWWenKaiLite-Light.ttf',
      weight: '100',
      style: 'normal'
    },
    {
      path: './fonts/LXGWWenKaiLite-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/LXGWWenKaiLite-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
})
