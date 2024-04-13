<?php

$drinks = [
    [
        "id" => "espresso",
        "title" => "Эспрессо",
        "src" => "/assets/images/coffee/espresso.jpg",
        "name" => "Эспрессо",
        "alt" => "Чашка эспрессо",
        "price" => 79
    ],
    [
        "id" => "espresso-x2",
        "title" => "Двойной эспрессо",
        "src" => "/assets/images/coffee/espresso.jpg",
        "name" => "Эспрессо",
        "alt" => "Чашка двойного эспрессо",
        "price" =>109
    ],
    [
        "id" => "americano",
        "title" => "Американо",
        "src" => "/assets/images/coffee/americano.jpg",
        "name" => "Американо",
        "alt" => "Чашка американо",
        "price" => 119
    ],
    [
        "id" => "latte",
        "title" => "Латте",
        "src" => "/assets/images/coffee/latte.jpg",
        "name" => "Латте",
        "alt" => "Чашка латте",
        "price" => 129
    ],
    [
        "id" => "capuchino",
        "title" => "Капучино",
        "src" => "/assets/images/coffee/capuchino.png",
        "name" => "Капучино",
        "alt" => "Чашка капучино",
        "price" => 129
    ],
    [
        "id" => "makiato",
        "title" => "Макиато",
        "src" => "/assets/images/coffee/makiato.jpg",
        "name" => "Макиато",
        "alt" => "Чашка макиато",
        "price" => 129
    ]
];

$content = json_encode(
    array_map(fn ($t) => (object) $t, $drinks),
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
);

$length = mb_strlen($content);

http_response_code(200);

header("Content-type: application/json");
//header("Content-length: {$length}");

echo $content;
exit;