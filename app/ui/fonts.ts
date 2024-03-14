import localFont from 'next/font/local'
import { Roboto_Slab } from 'next/font/google'

export const lxgwWenKai = localFont({
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

export const robotoSlab = Roboto_Slab({
  subsets: ['latin']
})
