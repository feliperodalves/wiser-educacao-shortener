# Desafio Wiser Educação (Challenge Encurtador - Backend)

## Descrição do serviço

Seu serviço irá receber inicialmente como parâmetro uma URL que deverá ser encurtada conforme as seguintes regras:

- Mínimo de 5 e máximo de 10 caracteres.
- Apenas letras e números.
  A URL retornada deverá ser salva no banco de dados e possui prazo de validade (você poderá escolher quanto tempo) e ao receber uma URL encurtada, deverá fazer o redirecionamento para a URL salva no banco.

### Exemplo ao encurtar

Seu sistema recebe uma chamada para encurtar a URL http://wisereducacao.com e retorna o seguinte json:

```json
{ "newUrl": "http://localhost:8081/abc123ab" }
```

O endpoint que salva a URL e retorna a URL encurtada deve ser um POST com a rota http://localhost:8081/encurtador recebendo no body:

```json
{ "url": "http://wisereducacao.com" }
```

## Executando o código

- Clone o repositório em qualquer local
- Acesse a pasta e rode `yarn` ou `npm install` para baixar as dependências
- Crie um arquivo chamado `.env` com base no `.env.example` e preencha todos os campos
- Depois rode `yarn dev:server` ou `npm run dev:server` para iniciar o servidor de desenvolvimento
- Seu servidor estará executando na url: http://localhost:3333.
- Em caso de realização de deploy em produção o script `yarn build` ou `npm run build` será necessário
- Testes podem ser executados com o script `yarn test` ou `npm run test`

## Ferramentas e Dependências

- NodeJs com Express e Typescript como base do projeto
- nanoid para geração de hash
- postgres para armazenamento dos dados

## Demonstração e Documentação

- Serviço está hospedado em droplet da DigitalOcean [neste link](http://wiser.felipealves.tech)
- Documentação da API disponibilizado via postman [neste link](https://documenter.getpostman.com/view/9571652/TWDZJwn1)

## Próximos passos e possibilidades

- Realizar a dockerização do serviço
- Implementar SSL (https)
