import THEME_DEFAULT_BLACK_ON_WHITE from "./themes";
import GenerateThemeBlackOnWhite from "./Themes/Black_On_White";
import type { WishlistItem } from "./WishListItem";
import { renderToString } from "react-dom/server";
import FileSaver from "file-saver"

function generate_html(theme:number,all_wishlist_items:WishlistItem[],user_name:String) {
    
    console.log(all_wishlist_items)

    let blob_parts = `<!DOCTYPE html> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>${user_name} Wishlist</title> </head> ` 

    switch (theme) {
        case THEME_DEFAULT_BLACK_ON_WHITE:
           
            blob_parts = blob_parts.concat("<style> /*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */ @layer properties; @layer theme, base, components, utilities; @layer theme { :root, :host { --font-sans: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; --color-blue-400: oklch(70.7% 0.165 254.624); --color-gray-300: oklch(87.2% 0.01 258.338); --color-gray-500: oklch(55.1% 0.027 264.364); --color-gray-800: oklch(27.8% 0.033 256.848); --color-gray-900: oklch(21% 0.034 264.665); --color-white: #fff; --spacing: 0.25rem; --text-xl: 1.25rem; --text-xl--line-height: calc(1.75 / 1.25); --text-2xl: 1.5rem; --text-2xl--line-height: calc(2 / 1.5); --text-5xl: 3rem; --text-5xl--line-height: 1; --radius-sm: 0.25rem; --default-font-family: var(--font-sans); --default-mono-font-family: var(--font-mono); } } @layer base { *, ::after, ::before, ::backdrop, ::file-selector-button { box-sizing: border-box; margin: 0; padding: 0; border: 0 solid; } html, :host { line-height: 1.5; -webkit-text-size-adjust: 100%; tab-size: 4; font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'); font-feature-settings: var(--default-font-feature-settings, normal); font-variation-settings: var(--default-font-variation-settings, normal); -webkit-tap-highlight-color: transparent; } hr { height: 0; color: inherit; border-top-width: 1px; } abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; } h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; } a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; } b, strong { font-weight: bolder; } code, kbd, samp, pre { font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace); font-feature-settings: var(--default-mono-font-feature-settings, normal); font-variation-settings: var(--default-mono-font-variation-settings, normal); font-size: 1em; } small { font-size: 80%; } sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } sub { bottom: -0.25em; } sup { top: -0.5em; } table { text-indent: 0; border-color: inherit; border-collapse: collapse; } :-moz-focusring { outline: auto; } progress { vertical-align: baseline; } summary { display: list-item; } ol, ul, menu { list-style: none; } img, svg, video, canvas, audio, iframe, embed, object { display: block; vertical-align: middle; } img, video { max-width: 100%; height: auto; } button, input, select, optgroup, textarea, ::file-selector-button { font: inherit; font-feature-settings: inherit; font-variation-settings: inherit; letter-spacing: inherit; color: inherit; border-radius: 0; background-color: transparent; opacity: 1; } :where(select:is([multiple], [size])) optgroup { font-weight: bolder; } :where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; } ::file-selector-button { margin-inline-end: 4px; } ::placeholder { opacity: 1; } @supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px) { ::placeholder { color: currentcolor; @supports (color: color-mix(in lab, red, red)) { color: color-mix(in oklab, currentcolor 50%, transparent); } } } textarea { resize: vertical; } ::-webkit-search-decoration { -webkit-appearance: none; } ::-webkit-date-and-time-value { min-height: 1lh; text-align: inherit; } ::-webkit-datetime-edit { display: inline-flex; } ::-webkit-datetime-edit-fields-wrapper { padding: 0; } ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field { padding-block: 0; } ::-webkit-calendar-picker-indicator { line-height: 1; } :-moz-ui-invalid { box-shadow: none; } button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button { appearance: button; } ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; } [hidden]:where(:not([hidden='until-found'])) { display: none!important; } } @layer utilities { .absolute { position: absolute; } .relative { position: relative; } .left-1\\/2 { left: calc(1/2 * 100%); } .float-left { float: left; } .mt-2 { margin-top: calc(var(--spacing) * 2); } .mr-2 { margin-right: calc(var(--spacing) * 2); } .mb-2 { margin-bottom: calc(var(--spacing) * 2); } .mb-3 { margin-bottom: calc(var(--spacing) * 3); } .mb-4 { margin-bottom: calc(var(--spacing) * 4); } .inline-block { display: inline-block; } .h-fit { height: fit-content; } .h-full { height: 100%; } .max-h-72 { max-height: calc(var(--spacing) * 72); } .min-h-16 { min-height: calc(var(--spacing) * 16); } .w-1\\/2 { width: calc(1/2 * 100%); } .w-1\\/4 { width: calc(1/4 * 100%); } .w-2\\/4 { width: calc(2/4 * 100%); } .w-3\\/4 { width: calc(3/4 * 100%); } .w-16 { width: calc(var(--spacing) * 16); } .w-full { width: 100%; } .max-w-72 { max-width: calc(var(--spacing) * 72); } .min-w-16 { min-width: calc(var(--spacing) * 16); } .-translate-x-1\\/2 { --tw-translate-x: calc(calc(1/2 * 100%) * -1); translate: var(--tw-translate-x) var(--tw-translate-y); } .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .overflow-x-hidden { overflow-x: hidden; } .overflow-y-auto { overflow-y: auto; } .rounded-sm { border-radius: var(--radius-sm); } .border-2 { border-style: var(--tw-border-style); border-width: 2px; } .border-gray-900 { border-color: var(--color-gray-900); } .bg-gray-800 { background-color: var(--color-gray-800); } .bg-gray-900 { background-color: var(--color-gray-900); } .pr-1 { padding-right: calc(var(--spacing) * 1); } .pl-1 { padding-left: calc(var(--spacing) * 1); } .text-center { text-align: center; } .text-2xl { font-size: var(--text-2xl); line-height: var(--tw-leading, var(--text-2xl--line-height)); } .text-5xl { font-size: var(--text-5xl); line-height: var(--tw-leading, var(--text-5xl--line-height)); } .text-xl { font-size: var(--text-xl); line-height: var(--tw-leading, var(--text-xl--line-height)); } .text-ellipsis { text-overflow: ellipsis; } .text-blue-400 { color: var(--color-blue-400); } .text-gray-300 { color: var(--color-gray-300); } .text-white { color: var(--color-white); } .placeholder-gray-500 { &::placeholder { color: var(--color-gray-500); } } } @property --tw-translate-x { syntax: \"*\"; inherits: false; initial-value: 0; } @property --tw-translate-y { syntax: \"*\"; inherits: false; initial-value: 0; } @property --tw-translate-z { syntax: \"*\"; inherits: false; initial-value: 0; } @property --tw-border-style { syntax: \"*\"; inherits: false; initial-value: solid; } @layer properties { @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) { *, ::before, ::after, ::backdrop { --tw-translate-x: 0; --tw-translate-y: 0; --tw-translate-z: 0; --tw-border-style: solid; } } }</style>")
            
            blob_parts = blob_parts.concat( renderToString(
                <div className="w-full absolute h-full bg-gray-800">
                    <GenerateThemeBlackOnWhite all_wishlist_items={all_wishlist_items} name={user_name}></GenerateThemeBlackOnWhite>
                </div>
            ))

            blob_parts = blob_parts.concat("<script>let name_search = document.getElementById('name_search'); let max_price = document.getElementById('price_search'); let vendor_search = document.getElementById('vendor_search'); let all_items = document.getElementsByClassName('wishlist_item'); name_search.addEventListener('input', () => { filter_results(name_search.value, max_price.value, vendor_search.value); }); max_price.addEventListener('input',() => { filter_results(name_search.value, max_price.value, vendor_search.value); }); vendor_search.addEventListener('input', () => { filter_results(name_search.value, max_price.value, vendor_search.value); }); function filter_results(name_filter,max_price_filter,vendor_search_filter) { for (let index = 0; index < all_items.length; index++) { let real_name_filter = ''; let real_price = Number.MAX_VALUE; let real_vendor_preference = ''; console.log(Number(max_price_filter)); if (name_filter != 'null') { real_name_filter = name_filter; } if (!Number.isNaN(max_price_filter) && max_price_filter != 0) { real_price = max_price_filter; } if (vendor_search_filter != 'null') { real_vendor_preference = vendor_search_filter; } if ( real_price >= Number(all_items[index].children[0].children[0].children[1].textContent.split(':')[1].split('$')[0]) && ( all_items[index].children[1].children[0].children[1].innerHTML.includes(real_vendor_preference) ) && all_items[index].children[0].children[0].children[0].textContent.split(':')[1].includes(real_name_filter) ) { all_items[index].setAttribute('style',''); } else { all_items[index].setAttribute('style','display:none'); }; }; };</script>")


            break;
        default:
            return
    }

    const blob = new Blob([blob_parts], {type: "html"})


    FileSaver.saveAs(blob, "index.html")
    

    // let link = <a download={"index.html"} href={window.webkitURL.createObjectURL(blob)} ref={diddybludref} onLoad={(x) => {
    //     x.target.dispatchEvent(new MouseEvent("click"))
    // }}></a>


    // return link

}

function generate_wishlist_theme_preview(theme:number) {

    let wishlist_items:WishlistItem = {
        id: "HIDEVELOPER",
        wishlist_item_name: "example",
        wishlist_item_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Rustacean-orig-noshadow.svg/320px-Rustacean-orig-noshadow.svg.png",
        wishlist_item_price: 25,
        wishlist_storefront_link: "https://play.rust-lang.org/",
        alternative_storefront_links: [
            "https://doc.rust-lang.org/stable/std/index.html",
            "https://doc.rust-lang.org/stable/book/index.html"
        ],
        pinned: true
    }

    switch (theme) {
        case THEME_DEFAULT_BLACK_ON_WHITE:
            return <GenerateThemeBlackOnWhite name={"your name here"} all_wishlist_items={[wishlist_items]} ></GenerateThemeBlackOnWhite>
        default:
            return <></>;
    }
}

export {generate_html,generate_wishlist_theme_preview}