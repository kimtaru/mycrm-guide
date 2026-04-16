const DEFAULT_SITE_URL = "https://www.mycrm-ui.com";

export function getSiteUrl() {
  const productionSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ??
    DEFAULT_SITE_URL;

  const siteUrl =
    process.env.VERCEL_ENV === "production"
      ? productionSiteUrl
      :
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.SITE_URL ??
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
        productionSiteUrl ??
        DEFAULT_SITE_URL;

  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}
