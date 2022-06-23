<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

//Incluir a conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

$query_chamado = "INSERT INTO logincadastro (nome, email, senha) VALUES (:nome, :email, :senha)";

$senha_segura = password_hash($dados['senha'], PASSWORD_DEFAULT);

$cad_chamado = $conn->prepare($query_chamado);
$cad_chamado->bindParam(':nome', $dados['nome']);
$cad_chamado->bindParam(':email', $dados['email']);
$cad_chamado->bindParam(':senha', $senha_segura);

$cad_chamado->execute();

http_response_code(200);
echo json_encode($response);
