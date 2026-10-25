import { wedding } from "@/config/wedding";
import { asset } from "@/lib/assets";
import { LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";
import { GalleryGrid } from "./GalleryGrid";

export function Gallery() {
  if (!wedding.gallery.length) return null;
  const images = wedding.gallery.map((g) => ({ ...g, src: asset(g.src) }));
  return (
    <section id="gallery" className="section">
      <div className="container-wide">
        <Reveal className="text-center">
          <p className="t-label text-gold">Moments</p>
          <h2 className="t-h2 mt-4">Gallery</h2>
          <LotusDivider className="mt-6" />
        </Reveal>
        <GalleryGrid images={images} />
      </div>
    </section>
  );
}
