import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import Link from "./Link";
import Color from "colorjs.io";
import { sans } from "./fonts";

export const metadata = {
  title: "Coffee Shop",
  description: "Coffee Shop",
};

export async function getMenu()
{
  const entries = await readdir(`./public/`, { withFileTypes: true })

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name.replace(/\.md$/, ``))
  
  const contents = await Promise.all(
    files.map(name => readFile(`./public/${name}.md`, "utf8"))
  )

  const menu = files.map((slug, i) => {
    const content = contents[i]
    const { data } = matter(content)
    return { slug, ... data }
  })

  console.log(menu)

  return menu
}

export async function getDrinks(type)
{
  const entries = await readdir(`./public/${type}`, { withFileTypes: true })

  const files = entries
    .filter((entry) => entry.isFile())
    .map(entry => entry.name)

  const contents = await Promise.all(
    files.map(name => readFile(`./public/${type}/${name}`, "utf8"))
  )

  const drinks = files.map((slug, i) => {
    const content = contents[i]
    const { data } = matter(content)
    return { data }
  })

  drinks.sort((a, b) =>
  {
    return a.price < b.price ? 1 : -1;
  })

  return drinks
}

export default async function Home()
{
  const menu = await getMenu()

  return (
      menu.map((item) => (
        <li>
          <a 
            key={item.slug}
            href={"/" + item.slug + "/"}
          >
            <DrinkImage drink={item} />
            <DrinkName drink={item} />
          </a>
        </li>
    )
  ))
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
