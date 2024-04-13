<?php

$drinkTypes = [
    [
        "title" => "Бодрящий кофе",
        "src" => "/assets/images/coffee.png",
        "name" => "Кофе",
        "alt" => "Чашка кофе"
    ],
    [
        "title" => "Ароматный чай",
        "src" => "/assets/images/tea.png",
        "name" => "Чай",
        "alt" => "Чашка чая"
    ],
    [
        "title" => "Пломбир и отборное молоко",
        "src" => "/assets/images/milkshake.png",
        "name" => "Молочный коктейль",
        "alt" => "Чашка молочного коктейля"
    ],
    [
        "title" => "Фруктовая свежесть",
        "src" => "/assets/images/fruit.png",
        "name" => "Морсы и газ. напитки",
        "alt" => "Чашка морса"
    ]
];

$content = json_encode($drinkTypes, JSON_UNESCAPED_UNICODE);
$length = mb_strlen($content);

http_response_code(200);

header("Content-type: application/json");
header("Content-length: {$length}");

echo $content;
exit;