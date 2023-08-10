### Introdução

Uma API Rest, feita com Node, Typescript, Express, TypeORM, PostgreSQL, Jest, Supertest, ESLint, JWT e Bcrypt.

Esta API possui um sistema de cadastro e login, e também possui um sistema de CRUD para as salvar a geolocalização de uma cidade, e esses dados são obtidos através de uma API externa.

### Requisitos

* [Node](https://nodejs.org/pt-br/download) v18+
* [PostgreSQL](https://www.postgresql.org/download) v15+
* Uma chave de API do [OpenWeatherMap](https://openweathermap.org/api)

### Instruções

1. __Clone este repositório__
    ```
    git clone https://github.com/OLuwis/WeatherAPI-Node.git
    ```
2. __Instale as dependências__
    ```
    npm install
    ```
3. __Crie um arquivo .env e defina as variáveis de ambiente (exemplo com minha chave para API:)__
    ```
    APP_PORT=3000
    DB_PASSWORD=1234
    SECRET=exemplo
    API_KEY=723ca64927535b20437a4d2d07490252
    ```
4. __Inicie a aplicação__
    ```
    npm run dev
    ```
5. __Cheque se a aplicação está rodando (exemplo:)__
    ```
    DB Connected
    Server running on http://localhost:3000
    ```

### Documentação

1. __Clone este repositório__
    ```
    git clone https://github.com/OLuwis/TodoAPI-Node.git
    ```
2. __Depois vá em [Swagger Editor](https://editor.swagger.io)__
3. __Clique em "File" > "Import File"__
4. __Por fim selecione o arquivo "documentation.yaml"__
