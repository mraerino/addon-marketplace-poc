import React from "react"
import slugg from "slugg"

import { PlanDetails } from "../templates/addon"

interface AddonMetaProps {
  title: string
  name: string
  plan: PlanDetails
}

interface AddonMeta {
  sku: string
  title: string
  description?: string
  prices: {
    amount: string
    currency: string
  }[]
  interval?: string
  webhook?: string
}

const mapAddon = (
  title: string,
  name: string,
  plan: PlanDetails,
): AddonMeta => ({
  sku: slugg(`${name}-${plan.name}`),
  title: `${title} - ${plan.name}`,
  prices: [
    {
      amount: String(plan.price),
      currency: "USD",
    },
  ],
  interval: plan.interval || "",
})

const AddonMeta: React.FC<AddonMetaProps> = ({ title, name, plan }) => (
  <script className="gocommerce-service" type="application/json">
    {JSON.stringify(mapAddon(title, name, plan), undefined, 2)}
  </script>
)

export default AddonMeta
