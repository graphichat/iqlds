import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { cn } from "@/lib/utils"
import {
  Check,
  ChevronRight,
  User,
  Building2,
  Settings2,
  ClipboardList,
} from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

// ─── Step definitions ────────────────────────────────────────────────────────

interface Step {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

const STEPS: Step[] = [
  { id: 1, title: "Personal Info",   description: "Your basic details",        icon: User },
  { id: 2, title: "Organization",    description: "Company & team details",     icon: Building2 },
  { id: 3, title: "Preferences",     description: "Configure your experience",  icon: Settings2 },
  { id: 4, title: "Review",          description: "Confirm and submit",         icon: ClipboardList },
]

// ─── Form state ───────────────────────────────────────────────────────────────

interface WizardFormData {
  // Step 1 — Personal
  firstName: string
  lastName: string
  email: string
  phone: string
  // Step 2 — Organization
  company: string
  role: string
  teamSize: string
  website: string
  // Step 3 — Preferences
  plan: string
  newsletter: boolean
  notifications: boolean
  bio: string
}

const DEFAULT_FORM: WizardFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  teamSize: "",
  website: "",
  plan: "",
  newsletter: true,
  notifications: true,
  bio: "",
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({
  steps,
  currentStep,
}: {
  steps: Step[]
  currentStep: number
}) {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
      {steps.map((step, i) => {
        const isDone    = currentStep > step.id
        const isActive  = currentStep === step.id
        const Icon      = step.icon
        return (
          <React.Fragment key={step.id}>
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 transition-all",
                  isDone   && "bg-primary border-primary text-primary-foreground",
                  isActive && "border-primary text-primary bg-primary/10",
                  !isDone && !isActive && "border-muted text-muted-foreground",
                )}
              >
                {isDone ? (
                  <Check strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                ) : (
                  <Icon strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                )}
              </div>
              <div className="text-center">
                <p className={cn("text-xs font-medium leading-tight",
                  isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
              </div>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className={cn(
                "h-0.5 flex-1 mt-[-18px] mx-1 min-w-[16px] transition-colors",
                currentStep > step.id ? "bg-primary" : "bg-muted",
              )} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ─── Step 1: Personal Info ────────────────────────────────────────────────────

function StepPersonal({
  data,
  onChange,
}: {
  data: WizardFormData
  onChange: (partial: Partial<WizardFormData>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
          <Input
            id="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </div>
    </div>
  )
}

// ─── Step 2: Organization ─────────────────────────────────────────────────────

function StepOrganization({
  data,
  onChange,
}: {
  data: WizardFormData
  onChange: (partial: Partial<WizardFormData>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">Company Name <span className="text-destructive">*</span></Label>
        <Input
          id="company"
          placeholder="Acme Corp"
          value={data.company}
          onChange={(e) => onChange({ company: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Your Role <span className="text-destructive">*</span></Label>
        <Input
          id="role"
          placeholder="Product Manager"
          value={data.role}
          onChange={(e) => onChange({ role: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teamSize">Team Size</Label>
        <Select
          value={data.teamSize}
          onValueChange={(v) => onChange({ teamSize: v })}
        >
          <SelectTrigger id="teamSize">
            <SelectValue placeholder="Select team size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solo">Just me</SelectItem>
            <SelectItem value="2-10">2–10 people</SelectItem>
            <SelectItem value="11-50">11–50 people</SelectItem>
            <SelectItem value="51-200">51–200 people</SelectItem>
            <SelectItem value="200+">200+ people</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Company Website</Label>
        <Input
          id="website"
          type="url"
          placeholder="https://acme.com"
          value={data.website}
          onChange={(e) => onChange({ website: e.target.value })}
        />
      </div>
    </div>
  )
}

// ─── Step 3: Preferences ──────────────────────────────────────────────────────

const PLANS = [
  { id: "free",       label: "Free",       description: "Up to 3 projects, 1 GB storage",    price: "$0/mo" },
  { id: "pro",        label: "Pro",        description: "Unlimited projects, 50 GB storage",  price: "$19/mo" },
  { id: "enterprise", label: "Enterprise", description: "Custom limits, SLA, priority support", price: "Custom" },
]

function StepPreferences({
  data,
  onChange,
}: {
  data: WizardFormData
  onChange: (partial: Partial<WizardFormData>) => void
}) {
  return (
    <div className="space-y-6">
      {/* Plan selection */}
      <div className="space-y-3">
        <Label>Select a Plan <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => onChange({ plan: plan.id })}
              className={cn(
                "w-full flex items-center justify-between rounded-lg border p-4 text-left transition-all",
                data.plan === plan.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex size-4 items-center justify-center rounded-full border-2",
                  data.plan === plan.id ? "border-primary bg-primary" : "border-muted-foreground",
                )}>
                  {data.plan === plan.id && <div className="size-1.5 rounded-full bg-primary-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{plan.label}</p>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>
              <Badge variant={plan.id === "pro" ? "default" : "outline"} className="shrink-0">
                {plan.price}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Notification prefs */}
      <div className="space-y-3">
        <Label>Communication Preferences</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="newsletter"
              checked={data.newsletter}
              onCheckedChange={(c) => onChange({ newsletter: c === true })}
            />
            <label htmlFor="newsletter" className="text-sm">
              Receive product updates and announcements
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="notifications"
              checked={data.notifications}
              onCheckedChange={(c) => onChange({ notifications: c === true })}
            />
            <label htmlFor="notifications" className="text-sm">
              Enable in-app notifications
            </label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Short Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us a bit about yourself or your use case…"
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}

// ─── Step 4: Review ───────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value || <span className="text-muted-foreground italic">—</span>}</span>
    </div>
  )
}

function StepReview({ data }: { data: WizardFormData }) {
  const selectedPlan = PLANS.find((p) => p.id === data.plan)
  return (
    <div className="space-y-6">
      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted/40 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Personal Information</p>
        </div>
        <div className="px-4 divide-y">
          <ReviewRow label="Name"   value={[data.firstName, data.lastName].filter(Boolean).join(" ")} />
          <ReviewRow label="Email"  value={data.email} />
          <ReviewRow label="Phone"  value={data.phone} />
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted/40 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Organization</p>
        </div>
        <div className="px-4 divide-y">
          <ReviewRow label="Company"   value={data.company} />
          <ReviewRow label="Role"      value={data.role} />
          <ReviewRow label="Team Size" value={data.teamSize} />
          <ReviewRow label="Website"   value={data.website} />
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted/40 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preferences</p>
        </div>
        <div className="px-4 divide-y">
          <ReviewRow label="Plan"          value={selectedPlan ? `${selectedPlan.label} (${selectedPlan.price})` : undefined} />
          <ReviewRow label="Newsletter"    value={data.newsletter ? "Subscribed" : "Not subscribed"} />
          <ReviewRow label="Notifications" value={data.notifications ? "Enabled" : "Disabled"} />
          {data.bio && <ReviewRow label="Bio" value={data.bio} />}
        </div>
      </div>
    </div>
  )
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, data: WizardFormData): string | null {
  if (step === 1) {
    if (!data.firstName.trim()) return "First name is required."
    if (!data.lastName.trim())  return "Last name is required."
    if (!data.email.trim())     return "Email is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Enter a valid email address."
  }
  if (step === 2) {
    if (!data.company.trim()) return "Company name is required."
    if (!data.role.trim())    return "Your role is required."
  }
  if (step === 3) {
    if (!data.plan) return "Please select a plan."
  }
  return null
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface WizardPageProps {
  onSubmit?: (data: WizardFormData) => void
}

/**
 * WizardPage — multi-step form with a step indicator.
 *
 * Demonstrates how to handle a complex, multi-step onboarding flow with
 * per-step validation, back/next navigation, and a final review step.
 *
 * @example
 * ```tsx
 * <WizardPage onSubmit={(data) => handleOnboarding(data)} />
 * ```
 */
export function WizardPage({ onSubmit }: WizardPageProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData]       = React.useState<WizardFormData>(DEFAULT_FORM)
  const [error, setError]             = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isComplete, setIsComplete]   = React.useState(false)

  const totalSteps = STEPS.length

  const handleChange = (partial: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }))
    setError(null)
  }

  const handleNext = () => {
    const err = validateStep(currentStep, formData)
    if (err) { setError(err); return }
    setError(null)
    setCurrentStep((s) => Math.min(s + 1, totalSteps))
  }

  const handleBack = () => {
    setError(null)
    setCurrentStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        await new Promise((r) => setTimeout(r, 1200))
        console.log("Wizard submitted:", formData)
      }
      setIsComplete(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Success state ──
  if (isComplete) {
    return (
      <PageShell>
        <PageHeaderWithBack title="Setup Wizard" />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-12 px-4 max-w-lg">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                  <Check strokeWidth={ICON_STROKE_WIDTH} className="size-10 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">All done!</h2>
                <p className="mt-2 text-muted-foreground">
                  Your account has been set up successfully. Welcome aboard,{" "}
                  <span className="font-medium text-foreground">{formData.firstName}</span>!
                </p>
              </div>
              <Button onClick={() => { setIsComplete(false); setCurrentStep(1); setFormData(DEFAULT_FORM) }}>
                Start over
              </Button>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  const stepTitles: Record<number, string> = {
    1: "Tell us about yourself",
    2: "Your organization",
    3: "Set your preferences",
    4: "Review your details",
  }
  const stepDescriptions: Record<number, string> = {
    1: "We'll use this to personalise your experience.",
    2: "Help us understand your team and company.",
    3: "Choose a plan and configure notifications.",
    4: "Make sure everything looks correct before submitting.",
  }

  return (
    <PageShell>
      <PageHeaderWithBack title="Setup Wizard" />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 max-w-2xl">
          {/* Step indicator */}
          <StepIndicator steps={STEPS} currentStep={currentStep} />

          {/* Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{stepTitles[currentStep]}</CardTitle>
                  <CardDescription className="mt-1">{stepDescriptions[currentStep]}</CardDescription>
                </div>
                <Badge variant="outline" className="shrink-0 text-xs">
                  Step {currentStep} of {totalSteps}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              {currentStep === 1 && <StepPersonal data={formData} onChange={handleChange} />}
              {currentStep === 2 && <StepOrganization data={formData} onChange={handleChange} />}
              {currentStep === 3 && <StepPreferences data={formData} onChange={handleChange} />}
              {currentStep === 4 && <StepReview data={formData} />}

              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-4 border-t pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
              >
                Back
              </Button>

              <div className="flex items-center gap-2">
                {/* Mini dot progress */}
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      s.id === currentStep  ? "bg-primary w-4" : "",
                      s.id < currentStep    ? "bg-primary" : "",
                      s.id > currentStep    ? "bg-muted" : "",
                    )}
                  />
                ))}
              </div>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className="gap-1.5">
                  Continue
                  <ChevronRight strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Submit"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
