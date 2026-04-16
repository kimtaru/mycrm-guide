import type { Metadata } from "next";

type SearchParamsLike =
  | { lang?: string }
  | Promise<{ lang?: string }>
  | undefined;

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
};

type LocalizedPageMetadataInput = {
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  pathname: string;
  searchParams?: SearchParamsLike;
};

type SupportedLang = "ko" | "en";

const DEFAULT_OG_IMAGE = "/opengraph-image";
const DEFAULT_SITE_NAME = "mycrm UI";

function normalizeLang(lang?: string): SupportedLang {
  return lang?.toLowerCase() === "en" ? "en" : "ko";
}

async function resolveLang(searchParams?: SearchParamsLike): Promise<SupportedLang> {
  if (!searchParams) return "ko";
  const resolved = searchParams instanceof Promise ? await searchParams : searchParams;
  return normalizeLang(resolved.lang);
}

function buildLanguageAlternates(pathname: string) {
  return {
    ko: pathname,
    en: `${pathname}?lang=en`,
  };
}

export function createPageMetadata({
  title,
  description,
  pathname,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: DEFAULT_SITE_NAME,
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${DEFAULT_SITE_NAME} 대표 공유 이미지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export async function createLocalizedPageMetadata({
  titleKo,
  titleEn,
  descriptionKo,
  descriptionEn,
  pathname,
  searchParams,
}: LocalizedPageMetadataInput): Promise<Metadata> {
  const lang = await resolveLang(searchParams);

  return {
    title: lang === "en" ? titleEn : titleKo,
    description: lang === "en" ? descriptionEn : descriptionKo,
    alternates: {
      canonical: lang === "en" ? `${pathname}?lang=en` : pathname,
      languages: buildLanguageAlternates(pathname),
    },
    openGraph: {
      title: lang === "en" ? titleEn : titleKo,
      description: lang === "en" ? descriptionEn : descriptionKo,
      url: lang === "en" ? `${pathname}?lang=en` : pathname,
      siteName: DEFAULT_SITE_NAME,
      type: "article",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${DEFAULT_SITE_NAME} 대표 공유 이미지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "en" ? titleEn : titleKo,
      description: lang === "en" ? descriptionEn : descriptionKo,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
