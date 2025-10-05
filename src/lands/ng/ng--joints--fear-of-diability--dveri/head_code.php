<?php

$CURRENT_DATE = date("Y-m-d");

$url = basename($_SERVER['REQUEST_URI']);
$query = parse_url($url, PHP_URL_QUERY);
if ($query != null) {
    parse_str($query, $params);
} else {
    $params = [];
}

$PIXEL = $params['pixel'] ?? '{pixel}';
$BUYER_NAME = "{sub_id_29}";

$PRODUCT_NAME = "{_offer_value:product_name}";
$PRODUCT_IMAGE = "{_offer_value:product_image}";
$PRODUCT_PRICE = "{_offer_value:product_price}";
$PRODUCT_PRICE_OLD = "{_offer_value:product_price_old}";
$CURRENCY = "{_offer_value:product_currency}";
$CURRENCY_LABEL = "{_offer_value:product_currency_l}";

$PRODUCT_IMAGE_PATH = "../products/" . $PRODUCT_IMAGE;

$SEND_SCRIPT_URL = "../post.php";

if ($query != null && trim($query) != "") {
    $SEND_SCRIPT_URL = $SEND_SCRIPT_URL . "?" . urldecode($query);
}
