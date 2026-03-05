import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { User, Shield, Bell, CreditCard, Palette, ChevronRight } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

const SETTINGS_SECTIONS = [
  { id: "account", label: "Account", icon: User, description: "Profile & personal info" },
  { id: "security", label: "Security", icon: Shield, description: "Password & authentication" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alert preferences" },
  { id: "billing", label: "Billing", icon: CreditCard, description: "Payment & subscription" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Theme & display" },
] as const

type SettingsSection = (typeof SETTINGS_SECTIONS)[number]["id"]

function AccountSection() {
  const [formData, setFormData] = React.useState({
    firstName: "John", lastName: "Doe",
    email: "john.doe@example.com", phone: "+1 (555) 123-4567",
    bio: "Software engineer passionate about building great products.",
    location: "San Francisco, CA", website: "https://johndoe.com",
  })
  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((p) => ({ ...p, [k]: e.target.value }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle><CardDescription>Your public profile information</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-16"><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback>JD</AvatarFallback></Avatar>
            <div className="flex flex-col gap-1.5">
              <Button variant="outline" size="sm">Change Avatar</Button>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>First Name</Label><Input value={formData.firstName} onChange={set("firstName")} /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input value={formData.lastName} onChange={set("lastName")} /></div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="flex gap-2">
              <Input type="email" value={formData.email} onChange={set("email")} className="flex-1" />
              <Badge variant="outline" className="self-center shrink-0">Verified</Badge>
            </div>
          </div>
          <div className="space-y-2"><Label>Phone</Label><Input type="tel" value={formData.phone} onChange={set("phone")} /></div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <textarea className="flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none" value={formData.bio} onChange={set("bio")} rows={3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Location</Label><Input value={formData.location} onChange={set("location")} /></div>
            <div className="space-y-2"><Label>Website</Label><Input value={formData.website} onChange={set("website")} /></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2"><Button variant="outline">Cancel</Button><Button>Save Changes</Button></CardFooter>
      </Card>
      <Card className="border-destructive/50">
        <CardHeader><CardTitle className="text-destructive">Danger Zone</CardTitle><CardDescription>Irreversible account actions</CardDescription></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
            <div><p className="text-sm font-medium">Delete Account</p><p className="text-sm text-muted-foreground">Permanently delete your account and all data</p></div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecuritySection() {
  const [twoFactor, setTwoFactor] = React.useState(true)
  const [loginAlerts, setLoginAlerts] = React.useState(true)
  const [sessionTimeout, setSessionTimeout] = React.useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Password</CardTitle><CardDescription>Keep your account secure with a strong password</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {[["current-password","Current Password"],["new-password","New Password"],["confirm-new","Confirm New Password"]].map(([id, label]) => (
            <div key={id} className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} type="password" placeholder="••••••••" /></div>
          ))}
        </CardContent>
        <CardFooter><Button>Update Password</Button></CardFooter>
      </Card>
      <Card>
        <CardHeader><CardTitle>Two-Factor Authentication</CardTitle><CardDescription>Add an extra layer of security</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {[
            { id:"2fa", label:"Two-Factor Authentication", desc:"Require a code when signing in", val:twoFactor, set:setTwoFactor },
            { id:"alerts", label:"Login Alerts", desc:"Get notified of new sign-ins", val:loginAlerts, set:setLoginAlerts },
            { id:"timeout", label:"Auto Session Timeout", desc:"Sign out after 30 min of inactivity", val:sessionTimeout, set:setSessionTimeout },
          ].map(({id,label,desc,val,set}, i, arr) => (
            <React.Fragment key={id}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label htmlFor={id}>{label}</Label><p className="text-sm text-muted-foreground">{desc}</p></div>
                <Switch id={id} checked={val} onCheckedChange={set} />
              </div>
              {i < arr.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Active Sessions</CardTitle><CardDescription>Manage your active login sessions</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {[
            { device:"MacBook Pro — Chrome", location:"San Francisco, CA", current:true },
            { device:"iPhone 15 — Safari", location:"San Francisco, CA", current:false },
            { device:"Windows PC — Edge", location:"New York, NY", current:false },
          ].map(({ device, location, current }) => (
            <div key={device} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium flex items-center gap-2">{device}{current && <Badge variant="secondary" className="text-xs">Current</Badge>}</p>
                <p className="text-xs text-muted-foreground">{location}</p>
              </div>
              {!current && <Button variant="outline" size="sm">Revoke</Button>}
            </div>
          ))}
        </CardContent>
        <CardFooter><Button variant="outline" className="text-destructive hover:text-destructive">Revoke All Other Sessions</Button></CardFooter>
      </Card>
    </div>
  )
}

function NotificationsSection() {
  const [prefs, setPrefs] = React.useState({ emailMarketing:false, emailUpdates:true, emailSecurity:true, emailDigest:true, pushAll:true, pushMentions:true, pushComments:false })
  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Email Notifications</CardTitle><CardDescription>Choose which emails you want to receive</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {[
            { k:"emailMarketing" as const, label:"Marketing", desc:"Promotional emails and offers" },
            { k:"emailUpdates" as const, label:"Product Updates", desc:"New features and improvements" },
            { k:"emailSecurity" as const, label:"Security Alerts", desc:"Sign-in activity and account changes" },
            { k:"emailDigest" as const, label:"Weekly Digest", desc:"Summary of your weekly activity" },
          ].map(({k, label, desc}, i, arr) => (
            <React.Fragment key={k}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>{label}</Label><p className="text-sm text-muted-foreground">{desc}</p></div>
                <Switch checked={prefs[k]} onCheckedChange={() => toggle(k)} />
              </div>
              {i < arr.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
        <CardFooter><Button>Save Preferences</Button></CardFooter>
      </Card>
      <Card>
        <CardHeader><CardTitle>Push Notifications</CardTitle><CardDescription>Browser and mobile push settings</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {[
            { k:"pushAll" as const, label:"All Notifications", desc:"Show all push notifications" },
            { k:"pushMentions" as const, label:"Mentions", desc:"When someone mentions you" },
            { k:"pushComments" as const, label:"Comments", desc:"Replies on your posts" },
          ].map(({k, label, desc}, i, arr) => (
            <React.Fragment key={k}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>{label}</Label><p className="text-sm text-muted-foreground">{desc}</p></div>
                <Switch checked={prefs[k]} onCheckedChange={() => toggle(k)} />
              </div>
              {i < arr.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function BillingSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Current Plan</CardTitle><CardDescription>Manage your subscription</CardDescription></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="flex items-center gap-2 mb-1"><p className="font-semibold">Pro Plan</p><Badge>Active</Badge></div>
              <p className="text-sm text-muted-foreground">$29/month · Renews March 15, 2025</p>
            </div>
            <Button variant="outline" size="sm">Change Plan</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-14 items-center justify-center rounded bg-muted text-xs font-bold">VISA</div>
              <div><p className="text-sm font-medium">•••• •••• •••• 4242</p><p className="text-xs text-muted-foreground">Expires 12/25</p></div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full">+ Add Payment Method</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
        <CardContent>
          {[["Feb 15, 2025","$29.00"],["Jan 15, 2025","$29.00"],["Dec 15, 2024","$29.00"]].map(([date,amount]) => (
            <div key={date} className="flex items-center justify-between py-2 border-b last:border-0">
              <div><p className="text-sm font-medium">{date}</p><p className="text-xs text-muted-foreground">Pro Plan</p></div>
              <div className="flex items-center gap-3">
                <span className="text-sm">{amount}</span>
                <Badge variant="outline" className="text-green-600 border-green-200">Paid</Badge>
                <Button variant="ghost" size="sm" className="h-7 text-xs">PDF</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function AppearanceSection() {
  const [theme, setTheme] = React.useState<"light"|"dark"|"system">("system")
  const [density, setDensity] = React.useState<"compact"|"default"|"comfortable">("default")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Theme</CardTitle><CardDescription>Select your preferred color scheme</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {(["light","dark","system"] as const).map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={cn("flex flex-col items-center gap-2 rounded-lg border p-4 text-sm capitalize transition-colors hover:bg-muted", theme===t && "border-primary bg-primary/5 font-medium")}>
                <div className={cn("size-8 rounded-full border-2", t==="light"&&"bg-white border-gray-200", t==="dark"&&"bg-zinc-900 border-zinc-700", t==="system"&&"bg-gradient-to-br from-white to-zinc-900 border-gray-300")} />
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Layout Density</CardTitle><CardDescription>Adjust the spacing of the interface</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {(["compact","default","comfortable"] as const).map((d) => (
              <button key={d} onClick={() => setDensity(d)} className={cn("rounded-lg border px-3 py-2 text-sm capitalize transition-colors hover:bg-muted", density===d && "border-primary bg-primary/5 font-medium")}>{d}</button>
            ))}
          </div>
        </CardContent>
        <CardFooter><Button>Save Appearance</Button></CardFooter>
      </Card>
    </div>
  )
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = React.useState<SettingsSection>("account")
  const activeConfig = SETTINGS_SECTIONS.find((s) => s.id === activeSection)!

  const sectionComponents: Record<SettingsSection, React.ReactNode> = {
    account: <AccountSection />,
    security: <SecuritySection />,
    notifications: <NotificationsSection />,
    billing: <BillingSection />,
    appearance: <AppearanceSection />,
  }

  return (
    <PageShell>
      <PageHeader title="Settings" />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            {/* Vertical nav */}
            <aside className="md:w-56 shrink-0">
              <nav className="space-y-1">
                {SETTINGS_SECTIONS.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button key={section.id} onClick={() => setActiveSection(section.id as SettingsSection)}
                      className={cn("w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left", isActive ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                      <Icon strokeWidth={ICON_STROKE_WIDTH} className="size-4 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div>{section.label}</div>
                        <div className={cn("text-xs truncate", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>{section.description}</div>
                      </div>
                      {isActive && <ChevronRight strokeWidth={ICON_STROKE_WIDTH} className="size-3 shrink-0" />}
                    </button>
                  )
                })}
              </nav>
            </aside>

            {/* Section content */}
            <main className="flex-1 min-w-0">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">{activeConfig.label}</h2>
                <p className="text-sm text-muted-foreground">{activeConfig.description}</p>
              </div>
              {sectionComponents[activeSection]}
            </main>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
