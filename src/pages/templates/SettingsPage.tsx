import * as React from "react"
import { DefaultPageWithSidebar } from "./DefaultPageWithSidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Home, BarChart3, File, Settings, Shield, Bell, CreditCard, User } from "lucide-react"

function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true)
  const [loginAlerts, setLoginAlerts] = React.useState(true)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <CardTitle>Security</CardTitle>
        </div>
        <CardDescription>
          Manage your security settings and authentication methods
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              id="2fa"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when someone logs into your account
              </p>
            </div>
            <Switch
              id="login-alerts"
              checked={loginAlerts}
              onCheckedChange={setLoginAlerts}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="flex gap-2">
              <Input type="password" value="••••••••" readOnly className="flex-1" />
              <Button variant="outline">Change</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Security Settings</Button>
      </CardFooter>
    </Card>
  )
}

function BillingInfo() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <CardTitle>Billing Information</CardTitle>
        </div>
        <CardDescription>
          Manage your payment methods and billing address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Payment Method</Label>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
                  <span className="text-xs font-semibold">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="billing-name">Cardholder Name</Label>
              <Input id="billing-name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-email">Billing Email</Label>
              <Input id="billing-email" type="email" defaultValue="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-address">Billing Address</Label>
            <Input id="billing-address" defaultValue="123 Main St, San Francisco, CA 94102" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Add Payment Method</Button>
        <Button>Update Billing</Button>
      </CardFooter>
    </Card>
  )
}

function AccountOverview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <CardTitle>Account Overview</CardTitle>
        </div>
        <CardDescription>
          Your account information and subscription details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            <Badge variant="secondary" className="mt-1">Pro Plan</Badge>
          </div>
          <Button variant="outline">Change Avatar</Button>
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="text-muted-foreground">Member Since</Label>
            <p className="font-medium">January 2024</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Account Status</Label>
            <p className="font-medium">Active</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Subscription</Label>
            <p className="font-medium">Pro - $29/month</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Next Billing</Label>
            <p className="font-medium">March 15, 2024</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationPreferences() {
  const [preferences, setPreferences] = React.useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    weeklyDigest: true,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <CardTitle>Notification Preferences</CardTitle>
        </div>
        <CardDescription>
          Choose how you want to be notified about updates and activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {key === "email" && "Receive notifications via email"}
                  {key === "push" && "Get push notifications on your device"}
                  {key === "sms" && "Receive SMS for important updates"}
                  {key === "marketing" && "Marketing and promotional emails"}
                  {key === "weeklyDigest" && "Weekly summary of your activity"}
                </p>
              </div>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, [key]: checked })
                }
              />
            </div>
            {key !== "weeklyDigest" && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

export function SettingsPage() {
  return (
    <DefaultPageWithSidebar
      pageTitle="Settings"
      pageDescription="Manage your account settings, security, and preferences"
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <AccountOverview />
        <div className="grid gap-6 md:grid-cols-2">
          <SecuritySettings />
          <BillingInfo />
        </div>
        <NotificationPreferences />
      </div>
    </DefaultPageWithSidebar>
  )
}

