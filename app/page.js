import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import Link from "./Link";
import Color from "colorjs.io";
import { sans } from "./fonts";

export const metadata = {
  title: "Coffee Shop",
  description: "Coffee Shop",
};

export async function getDrinks()
{
  const entries = await readdir("./public/", { withFileTypes: true })

  const drinkTypes = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  console.log(drinkTypes)
  
  const fileContents = await Promise.all(
    drinkTypes.map(async (type) => {
      const entries2 = await readdir(`./public/${type}/`, { withFileTypes: true })

      console.log(entries2)
      const drinkNames = entries2
        .filter((entry) => entry.isFile())
        .forEach((name) => readFile(`./public/${type}/${name}.md`, "utf8"))
    })
  )

  console.log(fileContents)

  const drinks = drinkTypes.map((slug, i) =>
  {
    const fileContent = fileContents[i]
    const { data } = matter(fileContent)
    return { slug, ...data }
  })

  drinks.sort((a, b) =>
  {
    return Date.parse(a.price) < Date.parse(b.price) ? 1 : -1;
  })

  return drinks
}

export default async function Home()
{
  const drinks = await getDrinks()

  return (
    <div>
      {drinks.map((drink) => (
        <Link
          key={drink.slug}
          href={"/" + drink.slug + "/"}
        >
          <article>
            <DrinkImage drink={drink} />
            <DrinkName drink={drink} />
            <DrinkPrice drink={drink} />
          </article>
        </Link>
      ))}
    </div>
  );
}

function DrinkName({ drink })
{
  return (
    <h2>
      {drink.name}
    </h2>
  );
}

function DrinkPrice({ drink }) {
  return (
    <p>
      <small>from </small>
      <strong>{drink.price}</strong>
    </p>
  );
}

function DrinkImage({ drink }) {
  return <img src="{drink.src}"/>;
}
