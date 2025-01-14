export default async function HeroesPage({params, } : {params : Promise<{slug: string}>}) {
    const test = (await params).slug;
    return (
        <div>
            {test}
        </div>
    );
}