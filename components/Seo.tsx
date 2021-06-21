import Head from "next/head";

interface ISeoProps {
  description: string;
  keywords?: string[];
  image?: string;
  title: string;
  url: string;
}

export default function Seo({ description, keywords, title, url }: ISeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="author" content="Albin Groen" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
}
