import Head from "next/head";

interface ISeoProps {
  description: string;
  keywords?: string[];
  title: string;
  image: string;
  url: string;
}

export default function Seo({
  description,
  keywords,
  image,
  title,
  url,
}: ISeoProps) {
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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta property="og:image" content={image} />
      <meta itemProp="image" content={image} />
      <meta content={image} name="image" />
    </Head>
  );
}
