import Image from 'next/image';
import Link from 'next/link'

export default async function HeroesPage({ params, }: { params: Promise<{ slug: string }> }) {
    interface Hero {
        id: number;
        name: string;
        details: [{
            type: string;
            children: [{
                type: string;
                text: string;
            }];
        }]
        design: [{
            name: string,
            url: string,
        }]
        slug: string;
    }

    const { slug } = await params;
    const response = await fetch(`http://localhost:1337/api/heroes?filters[slug][$eq]=${slug}&populate=*`)
    const hero: Hero = (await response.json()).data[0]
    return (
        <div>
            <h3>{hero.name}</h3>
            <Image
                src={`http://localhost:1337${hero.design[0].url}`}
                width={200}
                height={100}
                alt={hero.name}
            />
            {hero.details.map((detail, index) => (
                <p key={index}>{detail.children[0].text}</p>
            ))}
            <Link href="/heroes">Retour</Link>
        </div>
    );
}