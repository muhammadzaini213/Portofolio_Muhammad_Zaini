// app/admin/settings/SettingsClient.tsx
"use client"

import { useState, useRef } from "react"
import { Save, Loader2, Upload, CheckCircle } from "lucide-react"
import { uploadImage } from "@/lib/upload"
import { updateProfile, updateSiteConfig, updateSiteMetadata } from "./actions"

type Tab = "hero" | "profile" | "seo"

interface Props {
  siteConfig: {
    heroTitle: string
    heroSubtitle: string
    aboutText: string
    aboutSubtext: string
    profileImg: string
  } | null
  profile: {
    email: string
    itchioUrl: string | null
    githubUrl: string | null
    linkedinUrl: string | null
    cvPdfUrl: string | null
    portfolioPdf: string | null
  } | null
  siteMetadata: {
    title: string
    description: string
    siteUrl: string
    ogImage: string
    twitterImage: string
    whatsappImage: string
    googleVerifyId: string | null
  } | null
}

function InputField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  hint,
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  type?: string
  hint?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all"
      />
      {hint && <p className="text-[9px] text-white/20">{hint}</p>}
    </div>
  )
}

function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all resize-none"
      />
    </div>
  )
}

function SaveButton({ loading, saved }: { loading: boolean; saved: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-3 bg-accent hover:bg-white text-black font-black px-8 py-4 text-[10px] uppercase tracking-[0.3em] transition-all disabled:opacity-40"
    >
      {loading ? (
        <><Loader2 className="animate-spin" size={14} /> SAVING...</>
      ) : saved ? (
        <><CheckCircle size={14} /> SAVED!</>
      ) : (
        <><Save size={14} /> SAVE_CHANGES</>
      )}
    </button>
  )
}

export default function SettingsClient({ siteConfig, profile, siteMetadata }: Props) {
  const [tab, setTab] = useState<Tab>("hero")

  // Hero/SiteConfig state
  const [heroLoading, setHeroLoading] = useState(false)
  const [heroSaved, setHeroSaved] = useState(false)
  const [profileImg, setProfileImg] = useState(siteConfig?.profileImg ?? "")
  const [imgUploading, setImgUploading] = useState(false)
  const imgInputRef = useRef<HTMLInputElement>(null)

  // Profile state
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  // SEO state
  const [seoLoading, setSeoLoading] = useState(false)
  const [seoSaved, setSeoSaved] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setImgUploading(true)
      const url = await uploadImage(file)
      setProfileImg(url)
    } catch {
      alert("Upload gagal.")
    } finally {
      setImgUploading(false)
    }
  }

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHeroLoading(true)
    const fd = new FormData(e.currentTarget)
    fd.set("profileImg", profileImg)
    await updateSiteConfig(fd)
    setHeroLoading(false)
    setHeroSaved(true)
    setTimeout(() => setHeroSaved(false), 2500)
  }

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProfileLoading(true)
    const fd = new FormData(e.currentTarget)
    await updateProfile(fd)
    setProfileLoading(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const handleSeoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSeoLoading(true)
    const fd = new FormData(e.currentTarget)
    await updateSiteMetadata(fd)
    setSeoLoading(false)
    setSeoSaved(true)
    setTimeout(() => setSeoSaved(false), 2500)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "hero", label: "Hero_&_About" },
    { id: "profile", label: "Social_Links" },
    { id: "seo", label: "SEO_&_Meta" },
  ]

  return (
    <div className="font-mono max-w-3xl">
      <div className="mb-8">
        <h2 className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">System_Configuration</h2>
        <h1 className="text-4xl font-black">SYS_SETTINGS<span className="text-accent animate-pulse">_</span></h1>
      </div>

      {/* Tab Nav */}
      <div className="flex border-b border-white/10 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-[10px] uppercase tracking-widest font-bold transition-all border-b-2 -mb-px ${
              tab === t.id
                ? "border-accent text-accent"
                : "border-transparent text-white/30 hover:text-white/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: Hero & About */}
      {tab === "hero" && (
        <form onSubmit={handleHeroSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="bg-white/[0.02] border border-white/10 p-6">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold block mb-4">
              Profile_Image
            </label>
            <div className="flex items-center gap-6">
              <div
                onClick={() => imgInputRef.current?.click()}
                className="w-24 h-24 border-2 border-dashed border-white/20 hover:border-accent/50 flex items-center justify-center cursor-pointer transition-all relative overflow-hidden"
              >
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={20} className="text-white/20" />
                )}
                {imgUploading && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <Loader2 className="animate-spin text-accent" size={20} />
                  </div>
                )}
                <input type="file" ref={imgInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/40 mb-2">Or paste URL directly:</p>
                <input
                  type="text"
                  value={profileImg}
                  onChange={(e) => setProfileImg(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Hero Fields */}
          <div className="bg-white/[0.02] border border-white/10 p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold border-b border-white/5 pb-3">Hero_Section</p>
            <InputField label="Hero_Title" name="heroTitle" defaultValue={siteConfig?.heroTitle} placeholder="Game Developer" />
            <TextAreaField label="Hero_Subtitle" name="heroSubtitle" defaultValue={siteConfig?.heroSubtitle} placeholder="Tagline di bawah nama..." rows={3} />
          </div>

          {/* About Fields */}
          <div className="bg-white/[0.02] border border-white/10 p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold border-b border-white/5 pb-3">About_Section</p>
            <TextAreaField label="About_Text (Main)" name="aboutText" defaultValue={siteConfig?.aboutText} rows={5} />
            <TextAreaField label="About_Subtext (Secondary)" name="aboutSubtext" defaultValue={siteConfig?.aboutSubtext} rows={4} />
          </div>

          <SaveButton loading={heroLoading} saved={heroSaved} />
        </form>
      )}

      {/* TAB: Social Links */}
      {tab === "profile" && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="bg-white/[0.02] border border-white/10 p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold border-b border-white/5 pb-3">Contact_&_Social</p>
            <InputField label="Email" name="email" type="email" defaultValue={profile?.email} placeholder="you@email.com" />
            <InputField label="Itch.io_URL" name="itchioUrl" defaultValue={profile?.itchioUrl ?? ""} placeholder="https://yourname.itch.io" />
            <InputField label="GitHub_URL" name="githubUrl" defaultValue={profile?.githubUrl ?? ""} placeholder="https://github.com/yourname" />
            <InputField label="LinkedIn_URL" name="linkedinUrl" defaultValue={profile?.linkedinUrl ?? ""} placeholder="https://linkedin.com/in/yourname" />
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold border-b border-white/5 pb-3">Downloadable_Files</p>
            <InputField label="CV_PDF_URL" name="cvPdfUrl" defaultValue={profile?.cvPdfUrl ?? ""} placeholder="https://..." hint="Direct link to your CV PDF" />
            <InputField label="Portfolio_PDF_URL" name="portfolioPdf" defaultValue={profile?.portfolioPdf ?? ""} placeholder="https://..." hint="Direct link to your portfolio PDF" />
          </div>

          <SaveButton loading={profileLoading} saved={profileSaved} />
        </form>
      )}

      {/* TAB: SEO & Metadata */}
      {tab === "seo" && (
        <form onSubmit={handleSeoSubmit} className="space-y-6">
          <div className="bg-white/[0.02] border border-white/10 p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold border-b border-white/5 pb-3">Site_Identity</p>
            <InputField label="Site_Title" name="title" defaultValue={siteMetadata?.title} placeholder="Zaini | Unity Gameplay Programmer" />
            <TextAreaField label="Site_Description" name="description" defaultValue={siteMetadata?.description} rows={3} placeholder="Meta description untuk SEO..." />
            <InputField label="Site_URL" name="siteUrl" defaultValue={siteMetadata?.siteUrl} placeholder="https://yourdomain.com" />
            <InputField label="Google_Verify_ID" name="googleVerifyId" defaultValue={siteMetadata?.googleVerifyId ?? ""} hint="Google Search Console verification ID" />
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-6 space-y-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold border-b border-white/5 pb-3">OG_Images</p>
            <InputField label="OG_Image (LinkedIn & FB) — 1200×630" name="ogImage" defaultValue={siteMetadata?.ogImage} placeholder="https://..." />
            <InputField label="Twitter_Image — 1200×600" name="twitterImage" defaultValue={siteMetadata?.twitterImage} placeholder="https://..." />
            <InputField label="WhatsApp_Image — 400×400" name="whatsappImage" defaultValue={siteMetadata?.whatsappImage} placeholder="https://..." />
          </div>

          <SaveButton loading={seoLoading} saved={seoSaved} />
        </form>
      )}
    </div>
  )
}