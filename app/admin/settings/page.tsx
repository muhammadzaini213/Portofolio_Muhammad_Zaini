// app/admin/settings/page.tsx
import { prisma } from "@/lib/prisma"
import SettingsClient from "./SettingsClient"

export default async function SettingsPage() {
  const [siteConfig, profile, siteMetadata] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.siteMetadata.findUnique({ where: { id: 1 } }),
  ])

  return (
    <SettingsClient
      siteConfig={siteConfig}
      profile={profile}
      siteMetadata={siteMetadata}
    />
  )
}