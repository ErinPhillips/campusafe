<?php
if($_POST["Message"]) {
mail("meghangillikin@gmail.com", "Here is the sample subject line",
$_POST["Insert Your Message"]. "From: gillikinme@g.cofc.edu");
}
?>