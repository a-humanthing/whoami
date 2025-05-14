import { doto } from "./font";
import Character from "./Character";

export default function Page() {
  return (
    <>
      <div className="h-screen relative">
        <Character />
        <div className="absolute xs:top-3/4 top-1/2 left-0 right-0 flex items-center sm:m-4 justify-center bg-transparent bg-opacity-50 text-white text-lg font-semibold rounded-lg">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
            <h1 className={`${doto.className} text-6xl`}>arunKrishna</h1>
            <ul className="list-inside text-sm text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2">
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  Software Engineer who's trying to create innovation solutions.
                </code>
              </li>
              <li>
                Presently focused on development with javascript based
                solutions, experienced in Standard Product Based Development
                Lifecyle.
              </li>
            </ul>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="/arunKrishnaV1.pdf"
                  download="ArunKrishna.pdf"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://github.com/a-humanthing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://www.linkedin.com/in/arunkrishnakt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://www.instagram.com/a.humanthing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
