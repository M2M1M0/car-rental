"use client"
import { Menu } from '@headlessui/react'
import React from 'react'
import { CiMenuFries } from 'react-icons/ci'

const SearchMenu = () => {
    return (
        <div>
            <Menu>
                <Menu.Button>
                    <CiMenuFries />
                </Menu.Button>
                <Menu.Items className={"bg-black rounded-md"}>
                    <Menu.Item>
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item disabled>
                        <span className="opacity-75">Invite a friend (coming soon!)</span>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default SearchMenu