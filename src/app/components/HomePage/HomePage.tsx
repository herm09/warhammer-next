"use client";

import "./HomePage.css";
import Image from "next/image";
import Link from 'next/link'
import { useState, useEffect } from "react";

export default function HomePage() {
    interface Paragraph {
        type: string;
        children: [{
            type: string;
            text: string;
        }];
    }

    interface Faction {
        id: number;
        title: string;
        description: Paragraph[];
        design: [{
            url: string;
        }];
    }

    const [faction, setFaction] = useState<Faction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArmyData() {
            try {
                const response = await fetch("http://localhost:1337/api/Army?populate=*");
                console.log(response);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setFaction(data.data);
                console.log(faction);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'armée :", error);
                setError("Impossible de récupérer les données");
                setLoading(false);
            }
        }

        // Appeler la fonction fetch
        fetchArmyData();

    }, []);

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="homePage">
            <h1>Warhammer c&apos;est quoi ?</h1>

            <section className="presentation">
                <p className="presTxt">
                    Warhammer est un jeu de figurines qui se joue avec des armées de figurines
                    en plastique ou en métal. Les figurines sont peintes et assemblées par les
                    joueurs, puis utilisées pour simuler des batailles entre différentes armées. Le
                    jeu est joué sur une table recouverte d&apos;un tapis de jeu, et les joueurs
                    utilisent des dés et des règles pour déterminer le résultat des combats.
                </p>
                <Image
                    src="/homePage.jpeg"
                    width={400}
                    height={300}
                    alt="Warhammer"
                />
            </section>

            <section className="factions">
                <h2>{faction ? faction.title : "Faction inconnue"}</h2>

                {faction && faction.design[0].url && (
                    <Image
                        src={`http://localhost:1337${faction.design[0].url}`}
                        width={200}
                        height={100}
                        alt={faction.title}
                    />
                )}

                {faction && faction.description.map((paragraph, index) => (
                    <p key={index} className="factionsTxt">{paragraph.children[0].text}</p>
                ))}
            </section>
            
            <div className="button-container">
                <Link href="/heroes" className="buttonHome">Découvrir les héros</Link>
            </div>
        </div>
    );
}
