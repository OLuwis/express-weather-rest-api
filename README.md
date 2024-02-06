<div align="center">
  <h3 align="center">Weather Rest API</h3>

  <p align="center">
    Uma API Rest Feita Com Express, Typescript E Axios.
  </p>
</div>

### Sobre o projeto:

Um projeto que fiz de uma API Rest com Node.js, Typescript, Express.js, TypeORM, PostgreSQL, Jest, Supertest, ESLint, JWT e Bcrypt.

Esta API possui authenticação, rotas para cadastro e login, JsonWebTokens para authenticação, criptografia de senhas, também possui testes de integração feitas com o Supertest.

### Feito com:

[![Node][Node.js]][Node-url]
[![Typescript][Typescript]][Typescript-url]
[![Express][Express.js]][Express-url]
[![PostgreSQL][PostgreSQL]][PostgreSQL-url]
[![Jest][Jest]][Jest-url]
[![ESLint][ESLint]][ESLint-url]
[![JWT][JWT]][JWT-url]

### Requisitos:

* [Node.js 18+][Node-url]
* [PostgreSQL 15+][PostgreSQL-url]
* Uma chave de API do [OpenWeatherMap][OpenWeatherMap-url]

### Instalação:

1. Pegue uma API gratis em: [https://openweathermap.org/api](https://openweathermap.org/api)

2. Clone este repositório:
   ```sh
   git clone https://github.com/OLuwis/WeatherAPI-Node.git
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Crie um arquivo `.env` e defina as variáveis de ambiente (exemplo com minha chave para API):
   ```js
   APP_PORT=3000
   DB_PASSWORD=1234
   SECRET=exemplo
   API_KEY=723ca64927535b20437a4d2d07490252
   ```

## Inicialização

Para iniciar o projeto rode o seguinte comando:

   ```sh
   npm run dev
   ```

### Contatos:

[![LinkedIn][LinkedIn]][Linkedin-url]
[![Gmail][Gmail]][Gmail-url]

<!-- LINKS -->
[LinkedIn]: https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge
[Linkedin-url]: https://linkedin.com/in/luismiguelreis

[Gmail]: https://img.shields.io/badge/Gmail-EA4335?logo=gmail&logoColor=fff&style=for-the-badge
[Gmail-url]: mailto:oluismrs@gmail.com

[Node.js]: https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=for-the-badge
[Node-url]: https://nodejs.org/

[Typescript]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge
[Typescript-url]: https://typescriptlang.org/

[Express.js]: https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge
[Express-url]: https://expressjs.com/pt-br/

[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge
[PostgreSQL-url]: https://postgresql.org/

[Jest]: https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge
[Jest-url]: https://jestjs.io/pt-BR/

[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge
[ESLint-url]: https://eslint.org/

[JWT]: https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=for-the-badge
[JWT-url]: https://jwt.io/

[OpenWeatherMap-url]: https://openweathermap.org/