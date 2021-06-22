export default function Footer() {
  return (
    <footer className="mt-8">
      <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-500">
        Weblists is an Open Source project with the goal to build a platform
        where people can share lists with anyone on the internet, without having
        to sign up anywhere. It's a project built by{" "}
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
    </footer>
  );
}
