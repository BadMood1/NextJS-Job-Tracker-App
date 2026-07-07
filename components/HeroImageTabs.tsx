"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Tab = {
    id: number;
    label: string;
    image: string;
    alt: string;
};

const tabs: Tab[] = [
    {
        id: 0,
        label: "Organize Applications",
        image: "/hero-images/hero1.png",
        alt: "Organize Applications",
    },
    {
        id: 1,
        label: "Get Hired",
        image: "/hero-images/hero2.png",
        alt: "Get Hired",
    },
    {
        id: 2,
        label: "Manage Boards",
        image: "/hero-images/hero3.png",
        alt: "Manage Boards",
    },
];

export default function HeroImageTabs() {
    const [activeTab, setActiveTab] = useState(0);

    const currentTab: Tab = tabs[activeTab];

    return (
        <section className="border-t bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    {/* Tabs / Кнопки */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {tabs.map((tab, index) => (
                            <Button
                                key={tab.id}
                                variant={activeTab === index ? "default" : "outline"}
                                onClick={() => setActiveTab(index)}
                                className="transition-all cursor-pointer"
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </div>

                    {/* Изображение */}
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                        <Image
                            key={currentTab.id} // помогает с анимацией
                            src={currentTab.image}
                            alt={currentTab.alt}
                            width={1200}
                            height={800}
                            className="w-full h-auto transition-opacity duration-300"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
