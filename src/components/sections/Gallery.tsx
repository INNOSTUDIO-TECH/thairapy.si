import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site-config";

// Editorial mosaic of the studio and treatments. A tall feature leads, with
// the two real interior shots woven in among the Thai-massage photography.
const TILES = [
  {
    src: "/photos/279e3f0a-2a52-4594-b509-afaa5b0cb2e1.JPG",
    alt: "Tajska masaža z raztezanjem v studiu Thairapy Massage",
    span: "sm:col-span-7 sm:row-span-2 aspect-[4/5] sm:aspect-auto",
    sizes: "(min-width: 640px) 58vw, 100vw",
  },
  {
    src: "/photos/2666565d-d77c-4735-9814-d3dda02d0c6a.JPG",
    alt: "Sprejemni prostor studia Thairapy Massage",
    span: "sm:col-span-5 aspect-[4/3]",
    sizes: "(min-width: 640px) 40vw, 100vw",
  },
  {
    src: "/photos/e6ba4414-6a29-43b2-89c0-5295fa3a3e32.JPG",
    alt: "Sprostitvena oljna masaža hrbta",
    span: "sm:col-span-5 aspect-[4/3]",
    sizes: "(min-width: 640px) 40vw, 100vw",
  },
  {
    src: "/photos/d31ac3c6-6f0d-4dc9-a579-751a9ed4bae6.JPG",
    alt: "Masažni prostor s pregrinjalom in svežim cvetjem",
    span: "sm:col-span-4 aspect-[4/3]",
    sizes: "(min-width: 640px) 32vw, 100vw",
  },
  {
    src: "/photos/a4c07714-6da4-4891-9076-c4619dcc0058.JPG",
    alt: "Tradicionalna tajska masaža z raztezanjem",
    span: "sm:col-span-4 aspect-[4/3]",
    sizes: "(min-width: 640px) 32vw, 100vw",
  },
  {
    src: "/photos/e17a3ca7-1069-4240-bd0f-9d4d31ee2e8d.JPG",
    alt: "Tajska masaža ramen in hrbta",
    span: "sm:col-span-4 aspect-[4/3]",
    sizes: "(min-width: 640px) 32vw, 100vw",
  },
];

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <Section id="gallery" className="bg-stone">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="bg-brass h-px w-8" />
              <span className="eyebrow text-brass">{t("eyebrow")}</span>
            </div>
            <h2 className="text-ink mt-5 text-[clamp(2rem,4.5vw,3.4rem)]">
              {t("title")}
            </h2>
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-ink text-sm font-medium tracking-wide"
          >
            <InstagramIcon className="h-4 w-4" />
            {t("followCta")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-12">
          {TILES.map((tile, i) => (
            <Reveal
              key={tile.src}
              delay={i * 80}
              className={`group bg-stone-deep relative overflow-hidden ${tile.span}`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes={tile.sizes}
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <span className="border-ivory/15 pointer-events-none absolute inset-3 border" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
