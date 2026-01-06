import { useState } from "react";
import type { WishlistItem } from "../WishListItem";

interface GenerateThemeBlackOnWhiteProps {
    all_wishlist_items:WishlistItem[],
    name:String
}

function GenerateThemeBlackOnWhite(props:GenerateThemeBlackOnWhiteProps) {
    let [price_filter,set_price_filter] = useState(NaN)
    let [vendor_filter,set_vendor_filter] = useState<String>("")
    let [name_filter,set_name_filter] = useState<String>("")
    let regex = new RegExp("^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)");
    let all_vendors = new Set<String>([]);
    let vendor_filter_enabled = (vendor_filter != "null");



    props.all_wishlist_items.forEach((x) => {
        let y:any = regex.exec(x.wishlist_storefront_link.toString())

        if (y[0] == null) {

        }
        else {
            all_vendors.add(y[1])
        }

        x.alternative_storefront_links.forEach((e) => {
            y = regex.exec(e.toString());
            
            if (y[0] == null) {
                
            }
            else {
                all_vendors.add(y[1])
            }

        })
    })

    




    return (
        <div className="w-full h-full relative overflow-y-auto overflow-x-hidden">
            <div className="w-full h-fit relative left-1/2 -translate-x-1/2 mb-2 pr-1 pl-1">
                <div className="text-2xl w-full text-center text-white mb-4 mt-2">{props.name}'s wishlist</div>
                <div className="w-full h-fit relative mb-2">
                    <BlackOnWhiteWishlistSearch
                    price_filter={price_filter} set_price_filter={set_price_filter}
                    vendor_filter={vendor_filter} set_vendor_filter={set_vendor_filter}
                    name_filter={name_filter} set_name_filter={set_name_filter}
                    vendors={Array.from(all_vendors)}
                    ></BlackOnWhiteWishlistSearch>
                </div>

                <div className="w-full h-fit relative">
                    {props.all_wishlist_items.filter((x) => {

                        // let name_filter_status = name_filter == "null"
                        let real_name_filter = ""
                        let real_price = Number.MAX_VALUE
                        let real_vendor_preference = ""
                        if (name_filter != "null") {
                            real_name_filter = name_filter.toString();
                        } 
                        if (!Number.isNaN(price_filter)) {
                            real_price = price_filter
                        }
                        if (vendor_filter_enabled) {
                            real_vendor_preference = vendor_filter.toString();
                        }

                        if (
                            real_price >= x.wishlist_item_price.valueOf() && 
                            (
                                x.wishlist_storefront_link.includes(real_vendor_preference.toString()) || 
                                // x.alternative_storefront_links.includes(real_vendor_preference)
                                x.alternative_storefront_links.filter((e) => {
                                    if (e.includes(real_vendor_preference)) {
                                        return e
                                    }
                                    else {
                                        return
                                    }
                                }).length != 0 
                            ) &&
                            x.wishlist_item_name.includes(real_name_filter)
                        ) {
                            return x
                        }

                        return
                        
                    }).map((a) => <BlackOnWhiteWishlistItem wishlist_item={a}></BlackOnWhiteWishlistItem>)}
                </div>
            </div>
        </div>
    )
}


type BlackOnWhiteWishlistItemProps = {
    wishlist_item:WishlistItem
}

function BlackOnWhiteWishlistItem(props:BlackOnWhiteWishlistItemProps) {
    let alternative_links = <></>

    if (props.wishlist_item.alternative_storefront_links.length != 0) {
        alternative_links = (
            <div>
                <div className="inline-block mr-2 h-fit text-white relative">Alternative Vendor Links:</div>
                {props.wishlist_item.alternative_storefront_links.map((x) => {
                    let a = x;

                    if (x.length >= 32) {
                        a = a.substring(0,29).concat("...")
                    }

                    return <a href={x.toString()} className="relative text-blue-400 mr-2 w-16 h-fit truncate ">{a}</a>
                }
                    
                    )}
            </div>
        )
    }

    return (
        <div className="w-full h-fit bg-gray-900 rounded-sm border-2 border-gray-900 mt-2 mb-2 wishlist_item">
            <div className="w-full h-fit relative inline-block">
                <div className="float-left inline-block w-2/4 h-fit ">
                    <div className="w-full h-fit relative text-2xl text-white">
                        Item Name: {props.wishlist_item.wishlist_item_name}
                    </div>
                    <div className="w-full h-fit relative text-2xl text-white">
                        Price: {props.wishlist_item.wishlist_item_price.toString()}$
                    </div>
                </div>
                <div className=" inline-block w-2/4 h-fit">
                    <div className="w-full h-full">
                        <img src={props.wishlist_item.wishlist_item_image.toString()} alt="" className="w-full h-full relative left-1/2 -translate-x-1/2 max-w-72 max-h-72 min-h-16 min-w-16 "/>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit mt-2">
                <div className="w-full h-fit text-xl">
                    <div className="inline-block h-fit mr-2 text-white">Main Vendor Link:</div>
                    <a href={props.wishlist_item.wishlist_storefront_link.toString()} className="text-blue-400 inline-block w-3/4 h-fit text-ellipsis">{props.wishlist_item.wishlist_storefront_link}</a>
                </div>
                <div className="w-full h-fit">
                    {alternative_links}
                </div>
            </div>
        </div>
    )
}


type BlackOnWhiteWishlistSearchProps = {
    price_filter:number,
    set_price_filter:React.Dispatch<React.SetStateAction<number>>,
    vendor_filter:String,
    set_vendor_filter:React.Dispatch<React.SetStateAction<String>>,
    name_filter:String,
    set_name_filter:React.Dispatch<React.SetStateAction<String>>,
    vendors:String[]
}

function BlackOnWhiteWishlistSearch(props:BlackOnWhiteWishlistSearchProps) {

    

    return (
        <div className="w-full h-fit relative">
            <div className="w-full h-fit">
                <div className="w-1/2 inline-block relative h-fit pr-1">
                    <input type="text" placeholder="Search" id="name_search" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500"
                    value={props.name_filter.toString()}
                    onChange={(e) => {
                        props.set_name_filter(e.target.value)
                    }}

                    />
                </div>
                <div className="w-1/2 inline-block relative h-fit pl-1 pr-1">
                    <input type="number"  placeholder="Max Price" id="price_search" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm z-10  text-white placeholder-gray-500"
                    value={props.price_filter}
                    onChange={(e) => {
                        props.set_price_filter(e.target.valueAsNumber)
                    }}
                    />
                </div>
            </div>
            <div className="w-full h-fit mt-2">
                <div className="w-1/2 h-fit relative inline-block left-1/2 -translate-x-1/2  ">
                    <div className="w-2/4 h-fit inline-block text-2xl text-gray-300 "> Filter by Vendor?</div>
                     <select id="vendor_search" className="w-1/2 h-fit text-2xl bg-gray-900 text-gray-300 rounded-sm "
                     onChange={(e) => {
                        props.set_vendor_filter(e.target.value)
                     }}
            
                     >
                        <option selected value={"null"} key={"null"}></option>
                        {props.vendors.map((x) => <option value={x.toString()} key={x.toString()}>{x}</option>)}
                     </select>
                </div>
            </div>
        </div>
    )
}



export default GenerateThemeBlackOnWhite;