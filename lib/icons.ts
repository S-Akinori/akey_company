import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Cloud,
  Code,
  Database,
  GraduationCap,
  Heart,
  Lightbulb,
  Globe,
  Target,
  Users,
} from "lucide-react"

/**
 * 使用する Lucide アイコンをまとめて管理
 */
export const iconMap = {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Cloud,
  Code,
  Database,
  GraduationCap,
  Heart,
  Lightbulb,
  Globe,
  Target,
  Users,
} as const

/**
 * 文字列からアイコンコンポーネントを取得するヘルパー
 * 該当が無い場合は Building2 を返す
 */
export function getIcon(name?: string) {
  return iconMap[name as keyof typeof iconMap] ?? Building2
}
