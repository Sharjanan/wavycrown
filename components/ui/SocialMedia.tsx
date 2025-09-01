import React from "react";
import Link from "next/link";
import { TERipple } from "tw-elements-react";

export default function SocialMedia() {
  return (
<>
        {/* Right: Social Media */}
       
  <TERipple rippleColor="light">
    <Link
      href="https://www.facebook.com/WavyCrown1"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full p-3 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg border-3 border-gold hover:bg-gold transition duration-300 ease-in-out"
      aria-label="Facebook"
    >
      {/* Facebook icon (svg) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94z"/>
      </svg>
    </Link>
  </TERipple>


  <TERipple rippleColor="light">
    <Link
      href="https://www.instagram.com/wavycrown_/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full p-3 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg border-3 border-gold hover:bg-gold transition duration-300 ease-in-out"
      aria-label="Instagram"
    >
      {/* Instagram glyph */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.25 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.25 6z"/>
      </svg>
    </Link>
  </TERipple>

  <TERipple rippleColor="light">
    <Link
      href="https://www.tiktok.com/@sky_wavycrown?_r=1&_d=secCgYIASAHKAESPgo8B3I2Rnte%2FwFPrDUvc6fvBQ5ZyhPz4Ea8bQ4yXiindmrqhnhxMAynyO87UrnTYQgbqSj3oKSAyic5iMidGgA%3D&_svg=1&checksum=a5856f89adc7bc703a0a051e0708edf7a9e56edf3468a7704b6564a7932e253c&sec_uid=MS4wLjABAAAAK-VAV990MtauD7Jj_J86nvkx-L3QoH9APDW-ERjIxBwzhMX4Udnz9ImTCeXSG5wD&sec_user_id=MS4wLjABAAAAK-VAV990MtauD7Jj_J86nvkx-L3QoH9APDW-ERjIxBwzhMX4Udnz9ImTCeXSG5wD&share_app_id=1233&share_author_id=6823489741623837702&share_link_id=8CFDE225-AFAF-4695-A5FC-8ECEFA7FB15A&share_scene=1&sharer_language=en&social_share_type=4&source=h5_m&timestamp=1756748615&tt_from=copy&u_code=dc8a2f6i425638&ug_btm=b8727%2Cb0&user_id=6823489741623837702&utm_campaign=client_share&utm_medium=ios&utm_source=copy"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full p-3 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg border-3 border-gold hover:bg-gold transition duration-300 ease-in-out "
      aria-label="TikTok"
    >
      {/* TikTok glyph substitute */}
      <svg xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 256 256" 
  className="h-5 w-5 fill-current">
  <path d="M224 72.6v39.7c-21.2.5-41.2-6.3-57.1-18.7v68.9c0 36.1-29.3 65.4-65.4 65.4s-65.4-29.3-65.4-65.4S65.4 97 101.5 97c2.8 0 5.6.2 8.3.6v40.9c-2.7-.8-5.6-1.2-8.5-1.2-14.9 0-27 12.1-27 27s12.1 27 27 27 27-12.1 27-27V32h39.6c.9 31.1 26.1 56.2 57.5 56.6z"/>
</svg>
    </Link>
  </TERipple>
</>
  );
}
