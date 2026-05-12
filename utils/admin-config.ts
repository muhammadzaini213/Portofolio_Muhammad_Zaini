import { prisma } from '@/lib/prisma'
import { AdminJSOptions } from 'adminjs'

export const adminOptions: AdminJSOptions = {
  resources: [
    {
      resource: { model: prisma.project, client: prisma },
      options: {
        navigation: { name: 'Portofolio', icon: 'Folder' },
        properties: {
          content: { type: 'richtext' }, 
          desc: { type: 'textarea' }
        }
      },
    },
    {
      resource: { model: prisma.article, client: prisma },
      options: {
        navigation: { name: 'Portofolio', icon: 'Document' },
        properties: { content: { type: 'richtext' } }
      },
    },
    {
      resource: { model: prisma.siteMetadata, client: prisma },
      options: { navigation: { name: 'Settings', icon: 'Settings' } },
    },
    {
      resource: { model: prisma.siteConfig, client: prisma },
      options: { navigation: { name: 'Settings', icon: 'User' } },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'ZAINI_OS',
    withMadeWithLove: false,
    theme: {
      colors: { primary100: '#fed001' }
    }
  },
}