import Card from "../components/Card";
import Image from "next/image";

export default function Work() {
  return (
    <div className="flex min-h-screen items-start justify-center font-sans dark:bg-background px-4 py-12">
      <main className="w-full max-w-5xl flex flex-col gap-8">
        <Card className="w-full">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight dark:text-(--accent) mb-6">
            Work Experience
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="sub">
              <div className="flex items-start gap-4">
                <a
                  href="https://www.evolutio-ophthalmology.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white rounded-lg p-2 ring-2 ring-(--accent) hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    src="/evonnect.svg"
                    alt="Evolutio Ophthalmology"
                    width={48}
                    height={48}
                  />
                </a>
                <div className="flex-1">
                  <h2 className="text-xl font-medium dark:text-(--accent)">Evolutio Ophthalmology, Sligo Town</h2>
                  <p className="text-sm dark:text-(--muted)">Jr. Web Developer</p>
                  <p className="text-xs mt-1 dark:text-(--muted)">September 2025 – December 2025</p>
                </div>
              </div>
            </Card>

            <Card variant="sub">
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex flex-col gap-2">
                  <a
                    href="https://www.camile.ie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg p-2 ring-2 ring-(--accent) hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src="/camile.png"
                      alt="Camile Thai"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </a>
                  <a
                    href="https://www.thindi.ie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg p-2 ring-2 ring-(--accent) hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src="/image.png"
                      alt="Thindi"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </a>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-medium dark:text-(--accent)">Camile Thai & Thindi, Ardkeen</h2>
                  <p className="text-sm dark:text-(--muted)">Front of House Staff</p>
                  <p className="text-xs mt-1 dark:text-(--muted)">July 2022 – May 2025</p>
                </div>
              </div>
            </Card>

            <Card variant="sub">
              <div className="flex items-start gap-4">
                <a
                  href="https://www.mcdonalds.com/ie/en-ie.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white rounded-lg p-2 ring-2 ring-(--accent) hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    src="/mcdonalds.png"
                    alt="McDonalds"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </a>
                <div className="flex-1">
                  <h2 className="text-xl font-medium dark:text-(--accent)">McDonalds, Cork Road</h2>
                  <p className="text-sm dark:text-(--muted)">Crew Member</p>
                  <p className="text-xs mt-1 dark:text-(--muted)">August 2021 – May 2022</p>
                </div>
              </div>
            </Card>

            <Card variant="sub">
              <div className="flex items-start gap-4">
                <a
                  href="https://www.fitzmauricescaravanpark.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white rounded-lg p-2 ring-2 ring-(--accent) hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    src="/caravan-svgrepo-com.svg"
                    alt="Fitzmaurices Caravan Park"
                    width={48}
                    height={48}
                  />
                </a>
                <div className="flex-1">
                  <h2 className="text-xl font-medium dark:text-(--accent)">Fitzmaurices Caravan Park, Tramore</h2>
                  <p className="text-sm dark:text-(--muted)">Crew Member</p>
                  <p className="text-xs mt-1 dark:text-(--muted)">June 2017 – September 2018</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </main>
    </div>
  );
}