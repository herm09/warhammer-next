import Image from 'next/image';
import Link from 'next/link'
import "./style.css";

export default async function Hero() {
    interface Hero {
        id: number;
        name: string;
        design: [{
            name: string,
            url: string,
        }]
        slug: string;
    }

    const response = await fetch("http://localhost:1337/api/heroes?populate=*");
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return (
        <>
            <div className="List">
                <Link href ="/" className="buttonHeroes">Retour</Link>
                <h2>Liste des héros de la faction Tzeentch</h2>
            </div>
            <div>
                {data.data.map((hero: Hero) => (
                    <Link href={"/heroes/" + hero.slug}  key={hero.id}>
                        <h3 className="heroName">{hero.name}</h3>
                        <Image
                            src={`http://localhost:1337${hero.design[0].url}`}
                            width={200}
                            height={100}
                            alt={hero.name}
                        />
                    </Link>
                ))}
            </div>
        </>    
    );
}