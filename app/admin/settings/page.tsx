// app/admin/settings/page.tsx
import { prisma } from "@/lib/prisma"
import SettingsClient from "./SettingsClient"

export default async function SettingsPage() {
  // Wrap dengan try/catch supaya page tetap bisa dibuka
  // meski DB belum terkonek atau model belum ada
  let siteConfig = null
  let profile = null
  let siteMetadata = null

  try {
    ;[siteConfig, profile, siteMetadata] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { id: 1 } }),
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.siteMetadata.findUnique({ where: { id: 1 } }),
    ])
  } catch (err) {
    // DB belum konek atau tabel belum ada — render form kosong dulu
    console.warn("[Settings] DB not ready, rendering empty form:", err)
  }

  return (
    <SettingsClient
      siteConfig={siteConfig}
      profile={profile}
      siteMetadata={siteMetadata}
    />
  )
}
