# Tech Challenge FIAP - Grupo 52

## Objetivo
API destinada ao gerenciamento de pagamento dos pedidos, integração com MercadoPago para geração do QrCode de pagamento, e após receber o webhook com status do qrCode como pago, sinaliza a api de Pedidos atualizando o status do pedido.

## Execução em um cluster k8s

Para executar a aplicação em um cluster Kubernetes, com o `kubectl` corretamente configurado, execute:

```shell
kubectl apply -f k8s
```

Com isso, a API estará disponível na porta 30001 do Cluster. Se for em um ambiente local com Docker Desktop ou _minikube_,
você pode acessar o endereço http://localhost:30001. Em ambientes de nuvem, substitua `localhost` pelo endereço público do cluster.

## Execução para desenvolvimento

Para executar o projeto em modo de desenvolvimento, copie o arquivo ***.env.example*** para ***.env*** e execute os seguintes comandos:

```shell
yarn install
```
```shell
yarn start:dev
```

Com isso, a API estará disponível na porta 3000 e pode ser acessada pelo endereço http://localhost:3000

## Execução em ambiente Docker

Para executar a aplicação usando Docker, basta executar o seguinte comando:

```shell
docker compose up -d
```

Com isso, a API estará disponível na porta 3333 e pode ser acessada pelo endereço http://localhost:3333

## Execução dos testes

Para executar os testes da aplicação, basta executar o seguinte comando:

```shell
yarn test:ci
```

Com isso, os testes irão rodar e mostra a cobertura de %.
![Porcentagem de cobertura dos testes](./out/docs/coverage.png)

## Documentação

A documentação da aplicação é feita usando Swagger e pode ser acessada no endereço `/swagger` da API.
Para uso em ferramentas fora do navegador, como Postman ou Insomnia, o endereço `/swagger-json` pode ser utilizado.

Sendo assim, se a aplicação estiver de pé localmente em um cluster kubernetes, via _minikube_ ou Docker Desktop, por exemplo, você pode acessar http://localhost:30001/swagger e http://localhost:30001/swagger-json .

Já se estiver utilizando Docker, pode acessar em http://localhost:3333/swagger e http://localhost:3333/swagger-json .

E se estiver utilizando o ambiente de desenvolvimento via `yarn`, basta acessar em http://localhost:3000/swagger e http://localhost:3000/swagger-json .



## OWASP ZAP
Executamos o OWASP ZAP na geração de pagamento e webhook do Mercado Pago.
Logo na primeira execução foi encontrada apenas alertas do tipo 'Informational' que não chega nem ser um alerta de baixa prioridade, conforme relátorio abaixo.
![Relatório OWASP ZAP HTML](./out/docs/ZAP%20Scanning%20Report%20-%2008-07-2024-pagamentos.html)
![Relatório OWASP ZAP PDF](./out/docs/2024-07-08-ZAP-Report-.pdf)



