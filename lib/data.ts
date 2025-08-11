import companyData from "@/data/company.json"
import servicesData from "@/data/services.json"
import newsData from "@/data/news.json"
import worksData from "@/data/works.json"
import faqData from "@/data/faq.json"

export const company = companyData
export const services = servicesData
export const news = newsData
export const works = worksData
export const faq = faqData

// Helper functions
export const getNewsById = (id: number) => {
  return news.news.find((item) => item.id === id)
}

export const getNewsBySlug = (slug: string) => {
  return news.news.find((item) => item.slug === slug)
}

export const getProjectById = (id: number) => {
  return works.projects.find((project) => project.id === id)
}

export const getServiceById = (id: string) => {
  return services.services.find((service) => service.id === id)
}

export const getLatestNews = (limit = 3) => {
  return news.news.slice(0, limit)
}

export const getProjectsByCategory = (category?: string) => {
  if (!category) return works.projects
  return works.projects.filter((project) => project.category === category)
}
