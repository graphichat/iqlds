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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Star, Zap, Shield, Globe } from "lucide-react"
import { Home, BarChart3, File, Settings, CreditCard } from "lucide-react"

const features = [
  { name: "Unlimited Projects", included: true },
  { name: "Team Collaboration", included: true },
  { name: "Advanced Analytics", included: true },
  { name: "Priority Support", included: true },
  { name: "API Access", included: true },
  { name: "Custom Integrations", included: false },
]

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  popular 
}: { 
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
}) {
  return (
    <Card className={popular ? "border-primary shadow-lg" : ""}>
      {popular && (
        <div className="bg-primary text-primary-foreground rounded-t-lg px-4 py-2 text-center text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={popular ? "default" : "outline"}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function TestimonialCard({ 
  name, 
  role, 
  company, 
  content, 
  avatar 
}: { 
  name: string
  role: string
  company: string
  content: string
  avatar: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <CardDescription>
              {role} at {company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">"{content}"</p>
      </CardContent>
    </Card>
  )
}

export function CardsPage() {
  return (
    <DefaultPageWithSidebar
      pageTitle="Product Showcase"
      pageDescription="Explore our products, features, and pricing plans"
    >
      <div className="space-y-8">
        {/* Features Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Built for speed with optimized performance and instant load times"
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Reliable"
              description="Enterprise-grade security with 99.9% uptime guarantee"
            />
            <FeatureCard
              icon={Globe}
              title="Global Scale"
              description="Deploy anywhere with worldwide CDN and edge computing"
            />
          </div>
        </div>

        <Separator />

        {/* Pricing Section */}
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Pricing Plans</h2>
            <p className="text-muted-foreground">
              Choose the perfect plan for your needs
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <PricingCard
              name="Starter"
              price="9"
              period="month"
              description="Perfect for individuals and small projects"
              features={[
                "Up to 5 projects",
                "Basic analytics",
                "Email support",
                "5GB storage",
              ]}
            />
            <PricingCard
              name="Pro"
              price="29"
              period="month"
              description="For growing teams and businesses"
              features={[
                "Unlimited projects",
                "Advanced analytics",
                "Priority support",
                "100GB storage",
                "Team collaboration",
                "API access",
              ]}
              popular
            />
            <PricingCard
              name="Enterprise"
              price="99"
              period="month"
              description="For large organizations with custom needs"
              features={[
                "Everything in Pro",
                "Custom integrations",
                "Dedicated support",
                "Unlimited storage",
                "SSO & SAML",
                "Custom SLA",
              ]}
            />
          </div>
        </div>

        <Separator />

        {/* Testimonials Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Sarah Johnson"
              role="CTO"
              company="TechCorp"
              content="This platform has transformed how we manage our projects. The analytics are incredible and the team collaboration features are top-notch."
              avatar="https://github.com/shadcn.png"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Product Manager"
              company="StartupXYZ"
              content="Best investment we've made. The ROI was immediate and our team productivity increased by 40% in the first month."
              avatar="https://github.com/shadcn.png"
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Founder"
              company="DesignStudio"
              content="The ease of use combined with powerful features makes this a no-brainer. Customer support is also exceptional."
              avatar="https://github.com/shadcn.png"
            />
          </div>
        </div>
      </div>
    </DefaultPageWithSidebar>
  )
}
