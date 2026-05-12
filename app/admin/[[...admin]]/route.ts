import AdminJS from 'adminjs'
import * as AdminJSPrisma from '@adminjs/prisma'
import { prisma } from '@/lib/prisma'
import { adminOptions } from '@/utils/admin-config'

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const admin = new AdminJS(adminOptions)

const handler = async (req: Request) => {

  return new Response("AdminJS is initializing...", { status: 200 })
}

export { handler as GET, handler as POST }