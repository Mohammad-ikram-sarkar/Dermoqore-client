import type { SVGProps } from "react";

const iconProps = (props: SVGProps<SVGSVGElement>) => ({
  width: "48",
  height: "48",
  viewBox: "0 0 512 512",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: "16",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Dark Spots & Pigmentation — face with acne/dark spot marks */
export function DarkSpotsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <g {...strokeProps}>
        {/* Head sides */}
        <path d="M180 60C120 80 80 140 80 220V260" />
        <path d="M332 60C392 80 432 140 432 220V260" />
        {/* Hair */}
        <path d="M256 24V190" />
        <path d="M256 120L320 104" />
        {/* Face outline */}
        <path d="M100 240C100 360 160 430 240 472" />
        <path d="M412 240C412 360 352 430 272 472" />
        {/* Chin */}
        <path d="M256 456V488" />
        {/* Ears */}
        <path d="M80 220C64 220 56 232 56 256V292C56 316 64 328 88 328" />
        <path d="M432 220C448 220 456 232 456 256V292C456 316 448 328 424 328" />
        {/* Forehead curves */}
        <path d="M120 250C150 200 200 160 260 128" />
        <path d="M392 250C362 200 322 165 272 132" />
        {/* Eyebrows */}
        <path d="M120 278C145 260 180 260 205 274" />
        <path d="M307 274C332 260 367 260 392 278" />
        {/* Eyes */}
        <circle cx="170" cy="320" r="12" fill="currentColor" />
        <circle cx="342" cy="320" r="12" fill="currentColor" />
        {/* Nose */}
        <path d="M256 260V360" />
        <path d="M256 360C250 370 245 375 238 378" />
        {/* Mouth */}
        <path d="M220 400C235 408 277 408 292 400" />
        {/* Chin line */}
        <path d="M240 430H272" />
        {/* Dark spot dots */}
        <circle cx="125" cy="340" r="6" fill="currentColor" />
        <circle cx="145" cy="365" r="6" fill="currentColor" />
        <circle cx="120" cy="390" r="6" fill="currentColor" />
        <circle cx="170" cy="390" r="6" fill="currentColor" />
        <circle cx="155" cy="330" r="12" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Acne Marks — face with raised bumps / acne clusters */
export function AcneMarksIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <g {...strokeProps}>
        {/* Face outline oval */}
        <ellipse cx="256" cy="280" rx="160" ry="200" />
        {/* Eyebrows */}
        <path d="M160 210C175 198 205 198 220 210" />
        <path d="M292 210C307 198 337 198 352 210" />
        {/* Eyes */}
        <ellipse cx="192" cy="248" rx="22" ry="14" />
        <ellipse cx="320" cy="248" rx="22" ry="14" />
        {/* Nose */}
        <path d="M256 260V320" />
        <path d="M238 330C246 336 266 336 274 330" />
        {/* Mouth */}
        <path d="M216 370C234 382 278 382 296 370" />
        {/* Acne bumps – right cheek cluster */}
        <circle cx="360" cy="290" r="10" />
        <circle cx="385" cy="315" r="8" />
        <circle cx="358" cy="338" r="12" />
        <circle cx="382" cy="268" r="7" />
        {/* Acne bumps – left cheek */}
        <circle cx="148" cy="300" r="9" />
        <circle cx="130" cy="328" r="7" />
        {/* Forehead bump */}
        <circle cx="256" cy="140" r="9" />
      </g>
    </svg>
  );
}

/** Uneven Skin Tone — face with half-tone shading lines */
export function UnevenSkinToneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <g {...strokeProps}>
        {/* Face oval */}
        <ellipse cx="256" cy="280" rx="160" ry="200" />
        {/* Vertical centre divider */}
        <path d="M256 80V472" strokeDasharray="18 12" />
        {/* Left side shading lines (uneven) */}
        <path d="M130 200H248" />
        <path d="M110 230H248" />
        <path d="M110 260H248" />
        <path d="M118 290H248" />
        <path d="M130 320H248" />
        <path d="M150 350H248" />
        {/* Eyebrows */}
        <path d="M152 218C168 206 196 206 212 218" />
        <path d="M300 218C316 206 344 206 360 218" />
        {/* Eyes */}
        <ellipse cx="188" cy="256" rx="20" ry="13" />
        <ellipse cx="324" cy="256" rx="20" ry="13" />
        {/* Nose */}
        <path d="M256 268V328" />
        <path d="M240 338C248 344 264 344 272 338" />
        {/* Mouth */}
        <path d="M218 378C236 390 276 390 294 378" />
      </g>
    </svg>
  );
}

/** Oily & Acne Prone Skin — face with oil droplets */
export function OilyAcneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <g {...strokeProps}>
        {/* Face oval */}
        <ellipse cx="256" cy="280" rx="155" ry="195" />
        {/* Eyebrows */}
        <path d="M158 218C174 204 202 204 218 218" />
        <path d="M294 218C310 204 338 204 354 218" />
        {/* Eyes */}
        <ellipse cx="190" cy="258" rx="20" ry="13" />
        <ellipse cx="322" cy="258" rx="20" ry="13" />
        {/* Nose */}
        <path d="M256 272V330" />
        <path d="M240 340C248 346 264 346 272 340" />
        {/* Mouth */}
        <path d="M220 378C238 390 274 390 292 378" />
        {/* Oil droplets */}
        {/* Forehead drop */}
        <path d="M256 104C256 104 244 120 244 132C244 144 256 152 256 152C256 152 268 144 268 132C268 120 256 104 256 104Z" />
        {/* Left cheek drop */}
        <path d="M148 310C148 310 138 324 138 334C138 344 148 350 148 350C148 350 158 344 158 334C158 324 148 310 148 310Z" />
        {/* Right cheek drop */}
        <path d="M364 310C364 310 354 324 354 334C354 344 364 350 364 350C364 350 374 344 374 334C374 324 364 310 364 310Z" />
        {/* Small dots on nose */}
        <circle cx="248" cy="300" r="5" fill="currentColor" />
        <circle cx="264" cy="300" r="5" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Dry & Dehydrated Skin — face with crack/flake lines */
export function DryDehydratedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <g {...strokeProps}>
        {/* Face oval */}
        <ellipse cx="256" cy="280" rx="155" ry="195" />
        {/* Eyebrows */}
        <path d="M158 218C174 204 202 204 218 218" />
        <path d="M294 218C310 204 338 204 354 218" />
        {/* Eyes */}
        <ellipse cx="190" cy="258" rx="20" ry="13" />
        <ellipse cx="322" cy="258" rx="20" ry="13" />
        {/* Nose */}
        <path d="M256 272V330" />
        <path d="M240 340C248 346 264 346 272 340" />
        {/* Mouth – slightly downturned (dry/tight) */}
        <path d="M224 382C238 374 274 374 288 382" />
        {/* Crack lines on cheeks */}
        <path d="M148 290L132 308" />
        <path d="M132 308L148 322" />
        <path d="M148 322L136 338" />
        <path d="M364 290L380 308" />
        <path d="M380 308L364 322" />
        <path d="M364 322L378 338" />
        {/* Forehead crack */}
        <path d="M240 148L256 164L272 152" />
        {/* Flake dots */}
        <circle cx="160" cy="360" r="4" fill="currentColor" />
        <circle cx="176" cy="375" r="3" fill="currentColor" />
        <circle cx="350" cy="355" r="4" fill="currentColor" />
        <circle cx="338" cy="372" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Sensitive Skin — face with gentle radiating lines */
export function SensitiveSkinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <g {...strokeProps}>
        {/* Face oval */}
        <ellipse cx="256" cy="280" rx="155" ry="195" />
        {/* Eyebrows */}
        <path d="M158 218C174 204 202 204 218 218" />
        <path d="M294 218C310 204 338 204 354 218" />
        {/* Eyes */}
        <ellipse cx="190" cy="258" rx="20" ry="13" />
        <ellipse cx="322" cy="258" rx="20" ry="13" />
        {/* Nose */}
        <path d="M256 272V330" />
        <path d="M240 340C248 346 264 346 272 340" />
        {/* Mouth */}
        <path d="M220 378C238 390 274 390 292 378" />
        {/* Redness radiating arcs – right cheek */}
        <path d="M360 280C374 294 378 314 372 332" />
        <path d="M376 268C396 286 402 314 394 342" />
        {/* Redness radiating arcs – left cheek */}
        <path d="M152 280C138 294 134 314 140 332" />
        <path d="M136 268C116 286 110 314 118 342" />
        {/* Gentle feather lines at forehead */}
        <path d="M210 140C220 128 236 122 256 122" />
        <path d="M302 140C292 128 276 122 256 122" />
      </g>
    </svg>
  );
}
