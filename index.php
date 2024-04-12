<?php

class CoffeeShop
{
    static function route(string $uri): void
    {
        $name = preg_replace('#[^a-z]+#', ' ', trim($uri));

        try
        {
            if (method_exists(static::class, $name))
            {
                http_response_code(200);
                header("Content-type: application/json");
                echo json_encode(static::{$name}());
            }
            else
            {
                http_response_code(404);
            }
        }
        catch (\Throwable $ex)
        {
            http_response_code(500);
        }

        exit;
    }

    protected static function menu(): array
    {
        return [
            [
                "id" => "coffee"
            ],
            [
                "id" => "tea"
            ],
            [
                "id" => "milkshake"
            ],
            [
                "id" => "fruit"
            ]
        ];
    }

    static function isAjax(): bool
    {
        return "xmlhttprequest"
            === strtolower($_SERVER["HTTP_X_REQUESTED_WITH"] ?? "");
    }
}

CoffeeShop::isAjax() && CoffeeShop::route($_SERVER["REQUEST_URI"]);

?>

<!DOCTYPE html>
<html lang="ru">

    <head>

        <title>Coffee Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/styles/main.css">
        
    </head>

    <body>

        <header>

            <h1>Выбор напитка</h1>
        
            <nav>
                <a href="#phone">T</a>
                <a href="#login">Вход</a>
                <a href="#register">Регистрация</a>
            </nav>
        
        </header>
        
        <menu>

            <li>
                <img src="/assets/images/coffee.png" title="Бодрящий кофе" alt="Чашка эспрессо">
                <p>Кофе</p>
            </li>
            
            <li>
                <img src="/assets/images/tea.png" title="Ароматный чай" alt="Чай">
                <p>Чай</p>
            </li>
            
            <li>
                <img src="/assets/images/milkshake.png" title="Пломбир и отборное молоко" alt="Молочный коктейль">
                <p>Молочные коктейли</p>
            </li>
            
            <li>
                <img src="/assets/images/fruit.png" title="Фруктовая сладость" alt="Фруктовый напиток">
                <p>Морсы и газ. напитки</p>
            </li>
        
        </menu>

        <main>

            <h1>Кофе</h1>
                
            <article>
                <div>
                    <img src="/assets/images/coffee/espresso.jpg" alt="Чашка эспрессо">
                    <h1>Эспрессо</h1>
                    <p>от <span>79₽</span></p>
                </div>
            </article>
            
            <article>
                <div>
                    <img src="/assets/images/coffee/espresso.jpg" alt="Чашка двойного эспрессо">
                    <h1>Эспрессо</h1>
                    <p>от <span>109₽</span></p>
                </div>
            </article>
                
            <article>
                <div>
                    <img src="/assets/images/coffee/americano.jpg" alt="Чашка американо">
                    <h1>Американо</h1>
                    <p>от <span>119₽</span></p>
                </div>
            </article>
                
            <article>
                <div>
                    <img src="/assets/images/coffee/americano.jpg" alt="Чашка американо">
                    <h1>Американо</h1>
                    <p>от <span>119₽</span></p>
                </div>
            </article>

        </main>

        <script src="/assets/scripts/index.js"></script>

    </body>

</html>