import type { CompanionBanner as CompanionBannerData } from '../types/document'

interface CompanionBannerProps {
  banner: CompanionBannerData
}

export function CompanionBanner({ banner }: CompanionBannerProps) {
  return (
    <div className="companion-banner">
      <span>{banner.text}</span>
    </div>
  )
}
