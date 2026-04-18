type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

type StructuredDataInput = JsonLdValue | JsonLdValue[];

const SITE_URL = "https://www.mycrm-ui.com";
const ORGANIZATION_NAME = "mycrm";
const SOFTWARE_NAME = "mycrm UI";

export function StructuredDataScript({ data }: { data: StructuredDataInput }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export function createHomeStructuredData(): StructuredDataInput[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SOFTWARE_NAME,
      url: SITE_URL,
      inLanguage: "ko-KR",
      description:
        "React를 위한 헤드리스 UI 라이브러리. 데이터 중심 CRM 인터페이스와 AI 네이티브 DX를 위해 설계되었습니다.",
      publisher: {
        "@type": "Organization",
        name: ORGANIZATION_NAME,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SOFTWARE_NAME,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      inLanguage: "ko-KR",
      description:
        "React를 위한 헤드리스 CRM UI 라이브러리로, 데이터 중심 인터페이스와 AI 협업형 DX를 위한 문서와 컴포넌트를 제공합니다.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: ORGANIZATION_NAME,
      },
    },
  ];
}

export function createReactTableStructuredData(): StructuredDataInput[] {
  const pageUrl = `${SITE_URL}/document/react-table`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "@mycrm-ui/react-table",
      name: "@mycrm-ui/react-table",
      url: pageUrl,
      inLanguage: "ko-KR",
      description:
        "React 18과 React 19에서 사용할 수 있는 헤드리스 테이블 컴포넌트 문서입니다. 정렬, 필터, 선택, 편집, 가상 스크롤, 컬럼 관리 예제를 제공합니다.",
      author: {
        "@type": "Organization",
        name: ORGANIZATION_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: ORGANIZATION_NAME,
      },
      about: {
        "@type": "SoftwareApplication",
        name: "@mycrm-ui/react-table",
        applicationCategory: "DeveloperApplication",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "문서",
          item: `${SITE_URL}/document`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "@mycrm-ui/react-table",
          item: pageUrl,
        },
      ],
    },
  ];
}
