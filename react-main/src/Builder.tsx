import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import placeholder_image from "./assets/placeholder image for giftme.png"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { WishlistItem } from "./WishListItem";
import {generate_html, generate_wishlist_theme_preview} from "./generate_html";
import THEME_DEFAULT_BLACK_ON_WHITE from "./themes";


function Builder() {
    let [all_items,all_items_updater] = useState<WishlistItem[]>([]);
    let [name, set_name] = useState<String>("");

    let current_id = crypto.randomUUID().toString();

    return (
        <div className="absolute w-full h-full bg-gray-800 overflow-x-hidden">
            <div className="relative w-full h-fit text-center text-white text-5xl">Giftme</div>
            <div className="relative w-full h-fit text-center text-white text-xl">Your local reliable tool for making your own wishlist</div>
            <div className="w-full h-fit relative mt-2 mb-2">
                <div className="w-1/2 left-1/2 relative -translate-x-1/2">
                    <div className="w-full h-fit relative text-2xl text-white mb-2">The name you want on your Wishlist</div>
                    <input type="text" placeholder=" your name here" className="w-full h-full relative bg-gray-900 rounded-sm text-2xl text-white placeholder-gray-500"
                    value={name.toString()}
                    onChange={(e) => {
                        set_name(e.target.value)
                    }}/>
                </div>
            </div>

            <div className="mt-4 mb-2 ">
                {all_items.map((item) => {
                    return (
                        <div className="w-full mt-2 mb-2">
                            <div className="w-1/2 left-1/2 relative -translate-x-1/2 ">
                                <WishlistItemElement wishlist_item={item} state_all_items={all_items} state_all_items_updater={all_items_updater}></WishlistItemElement>
                            </div>
                        </div>
                    )
                })}
                
                
            </div>

            <div className="w-full h-fit relative mt-2">
                <div className="w-1/2 left-1/2 relative -translate-x-1/2">
                    <div className="w-full h-16 relative border-gray-400 rounded-md border-2 cursor-pointer hover:bg-gray-600"
                    onClick={
                        () => {
                            
                            let new_wishlist_item:WishlistItem = {
                                id:current_id,
                                wishlist_item_name: "",
                                wishlist_item_image: "",
                                wishlist_item_price: 0,
                                wishlist_storefront_link: "",
                                alternative_storefront_links: [],
                                pinned: false
                            }

                            all_items_updater(
                                all_items.concat([
                                    new_wishlist_item
                                ])
                            )
                        }
                    }>
                        <div className="w-fit h-fit relative top-1/2 left-1/2 -translate-1/2">
                            <FontAwesomeIcon className="text-white" icon={faPlus}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit relative mt-2 mb-10">
                <div className="w-1/2 left-1/2 relative -translate-x-1/2">
                    <div className="w-full h-16 relative border-gray-400 rounded-md border-2 cursor-pointer hover:bg-gray-600"
                    onClick={() => {
                        generate_html(THEME_DEFAULT_BLACK_ON_WHITE,all_items,name)
                    }}
                    >
                        <div className="w-fit h-fit relative top-1/2 left-1/2 -translate-1/2 text-white">
                            Generate index.html 
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className=" relative w-full">
                    <h1 className="text-white relative text-center text-5xl mb-3">Theme Preview</h1>
                    {generate_wishlist_theme_preview(THEME_DEFAULT_BLACK_ON_WHITE)}
                </div>
            </div>
        </div>
    )
}


interface WishlistItemElementProps {
    wishlist_item:WishlistItem,
    state_all_items:WishlistItem[],
    state_all_items_updater:React.Dispatch<React.SetStateAction<WishlistItem[]>>
}

function WishlistItemElement(props:WishlistItemElementProps) {
    const item = props.wishlist_item;
    let VendorImage:string;


    if (item.wishlist_item_image.length != 0) {
        VendorImage = item.wishlist_item_image.toString();
    }
    else {
        VendorImage = placeholder_image;
    }

    return (
        <div className="w-full h-fit">
            <div className="inline-block w-1/2 h-fit pr-2">
                <input type="text" placeholder="Item name" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500 mb-2" 
                value={item.wishlist_item_name.toString()}
                onChange={(e) => {

                    let new_wishlist:WishlistItem = {
                        id: item.id,
                        wishlist_item_name: e.target.value,
                        wishlist_item_image: item.wishlist_item_image,
                        wishlist_item_price: item.wishlist_item_price,
                        wishlist_storefront_link: item.wishlist_storefront_link,
                        alternative_storefront_links: item.alternative_storefront_links,
                        pinned: item.pinned
                    } 

                    update_wishlist_item_property(
                        item.id,
                        new_wishlist,
                        props.state_all_items,
                        props.state_all_items_updater
                    )
                }}/>
                <div className="w-full h-fit mb-2">
                    <div className="w-1/4 inline-block relative h-fit pr-1">
                        <input type="number" placeholder="Item Price" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500"
                        value={item.wishlist_item_price.valueOf()}
                        onChange={(e) => {

                        let new_wishlist:WishlistItem = {
                            id: item.id,
                            wishlist_item_name: item.wishlist_item_name,
                            wishlist_item_image: item.wishlist_item_image,
                            wishlist_item_price: e.target.valueAsNumber,
                            wishlist_storefront_link: item.wishlist_storefront_link,
                            alternative_storefront_links: item.alternative_storefront_links,
                            pinned: item.pinned
                        } 

                        update_wishlist_item_property(
                            item.id,
                            new_wishlist,
                            props.state_all_items,
                            props.state_all_items_updater
                        )
                        }}/>
                    </div>
                    <div className="w-3/4 inline-block relative h-fit pl-1">
                        <input type="text" placeholder="Item vendor link" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500"
                        value={item.wishlist_storefront_link.toString()}
                        onChange={(e) => {

                        let new_wishlist:WishlistItem = {
                            id: item.id,
                            wishlist_item_name: item.wishlist_item_name,
                            wishlist_item_image: item.wishlist_item_image,
                            wishlist_item_price: item.wishlist_item_price,
                            wishlist_storefront_link: e.target.value,
                            alternative_storefront_links: item.alternative_storefront_links,
                            pinned: item.pinned
                        } 

                        update_wishlist_item_property(
                            item.id,
                            new_wishlist,
                            props.state_all_items,
                            props.state_all_items_updater
                        )
                        }}/>
                    </div>
                </div>
                <input type="text" placeholder="Item image link" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500 mb-2"
                value={item.wishlist_item_image.toString()}
                    onChange={(e) => {

                        let new_wishlist:WishlistItem = {
                            id: item.id,
                            wishlist_item_name: item.wishlist_item_name,
                            wishlist_item_image: e.target.value,
                            wishlist_item_price: item.wishlist_item_price,
                            wishlist_storefront_link: item.wishlist_storefront_link,
                            alternative_storefront_links: item.alternative_storefront_links,
                            pinned: item.pinned
                        } 

                        update_wishlist_item_property(
                            item.id,
                            new_wishlist,
                            props.state_all_items,
                            props.state_all_items_updater
                        )
                }}/>
                <input type="text" placeholder="Alternative vendor link" className="w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500 mb-2"
                value={item.alternative_storefront_links.toString()}
                onChange={(e) => {

                    let new_wishlist:WishlistItem = {
                        id: item.id,
                        wishlist_item_name: item.wishlist_item_name,
                        wishlist_item_image: item.wishlist_item_image,
                        wishlist_item_price: item.wishlist_item_price,
                        wishlist_storefront_link: item.wishlist_storefront_link,
                        alternative_storefront_links: e.target.value.split(","),
                        pinned: item.pinned
                    } 

                    update_wishlist_item_property(
                        item.id,
                        new_wishlist,
                        props.state_all_items,
                        props.state_all_items_updater
                    )
                }}
                />
                <div className="h-fit w-full mb-2">
                    <div className="w-1/4 h-fit inline-block text-2xl text-gray-300 "> Pin Item?</div>
                    <div className="w-3/4 h-fit inline-block">
                        <select className="w-full h-fit text-2xl bg-gray-900 text-gray-300 rounded-sm "
                        value={Number(item.pinned.valueOf())}
                        onChange={(e) => {

                            let new_wishlist:WishlistItem = {
                                id: item.id,
                                wishlist_item_name: item.wishlist_item_name,
                                wishlist_item_image: item.wishlist_item_image,
                                wishlist_item_price: item.wishlist_item_price,
                                wishlist_storefront_link: item.wishlist_storefront_link,
                                alternative_storefront_links: item.alternative_storefront_links,
                                pinned: Boolean(Number(e.target.value))
                            } 

                            update_wishlist_item_property(
                                item.id,
                                new_wishlist,
                                props.state_all_items,
                                props.state_all_items_updater
                            )
                        }}
                        >
                            <option value={0}>false</option>
                            <option value={1}>true</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="inline-block w-1/2 h-full pl-2">
                <div className="w-full h-fit bg-contain" 
                style={{
                    backgroundImage: `url(${VendorImage})`,
                    backgroundSize: "100% 100%"
                }}>
                    {/* I thought of a crackhead solution */}
                    <div className="absolute z-10">
                        <FontAwesomeIcon className="bg-red-600 text-white cursor-pointer"  icon={faXmark}
                        onClick={() => {
                            remove_wishlist_item_property(item.id, props.state_all_items, props.state_all_items_updater)
                        }}
                        ></FontAwesomeIcon>
                    </div>
                    <div className="opacity-0 cursor-default">
                        <input type="text" placeholder="Item name" className=" cursor-default w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500 mb-2" />
                        <div className="w-full h-fit mb-2">
                            <div className="w-1/4 inline-block relative h-fit pr-1">
                                <input type="text" placeholder="Item Price" className=" cursor-default w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500"/>
                            </div>
                            <div className="w-3/4 inline-block relative h-fit pl-1">
                                <input type="text" placeholder="Item vendor link" className="cursor-default w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500"/>
                            </div>
                        </div>
                        <input type="text" placeholder="Item image link" className="cursor-default w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500 mb-2" />
                        <input type="text" placeholder="Alternative vendor link" className="cursor-default w-full h-full relative text-2xl bg-gray-900 rounded-sm  text-white placeholder-gray-500 mb-2" />
                        <div className="h-fit w-full mb-2">
                            <div className="cursor-default w-1/4 h-fit inline-block text-2xl text-gray-300 "> Pin Item?</div>
                            <div className="cursor-default w-3/4 h-fit inline-block">
                                <select className="cursor-default w-full h-fit text-2xl bg-gray-900 text-gray-500 rounded-sm ">
                                    <option value={0}>false</option>
                                    <option value={1}>true</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* dont get mad if youre not a GENIUS like me  */}
                </div>
               
            </div>
        </div>
    )
}


function update_wishlist_item_property(id:string,value:WishlistItem,state_all_items:WishlistItem[],state_all_items_updater:React.Dispatch<React.SetStateAction<WishlistItem[]>>) {
    const new_arr = state_all_items.map((x) => {
        if (x.id == id) {
            return value
        }
        else {
            return x
        }
        
    })

    state_all_items_updater(new_arr);
}

function remove_wishlist_item_property(id:String,state_all_items:WishlistItem[],state_all_items_updater:React.Dispatch<React.SetStateAction<WishlistItem[]>>) {
    state_all_items_updater(
        state_all_items.filter(x =>
            x.id != id 
        )
    )
}
export default Builder;
