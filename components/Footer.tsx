export default function Footer() {
  return (
    <footer className="mt-8">
      <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-500">
        Weblists is an Open Source project with the goal to build a platform
        where people can share lists with anyone on the internet, without having
        to sign up anywhere. It&apos;s a project built by{" "}
        <a className="link" href="https://albingroen.com">
          Albin Groen
        </a>
        , but really anyone can contribute if they want to. If you want to read
        the source code, you can do so{" "}
        <a className="link" href="https://github.com/albingroen/frontend-lists">
          here
        </a>
        , and{" "}
        <a className="link" href="https://github.com/albingroen/service-lists">
          here
        </a>
        .
      </p>

      <a
        href="https://www.producthunt.com/posts/weblists?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-weblists"
        className="block mt-8 transform scale-90 origin-top-left"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=301235&theme=light"
          alt="Weblists - Create and share lists with anyone on the web | Product Hunt"
          style={{ width: 250, height: 54 }}
          width={250}
          height={54}
        />
      </a>
    </footer>
  );
}
