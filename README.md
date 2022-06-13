# Boas vindas ao repositório do teste técnico Olimpiadas RadarFit!

## Passos para rodar o projeto:

1. Clone o repositório:
  - Exemplo com SSH:
    - Use o comando: `git clone git@github.com:enioandrade92/radarFit-olimpiadas.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd radarFit-olimpiadas`

2. Instale as dependências:
  - Para isso, use o seguinte comando: `npm install`

3. Faça essa verificação:
  - Neste projeto utilizaremos docker e docker-compose.
  - Caso não tenha instalado, acesse os links abaixo e siga as instruções:
    - https://devimalplanet.com/how-to-install-docker-on-linux-pop-os - **docker**
    - https://devimalplanet.com/how-to-install-docker-compose-on-linux-pop-_os-19-04 - **docker-compose**
    - Você pode acessar as instruções de outras distribuições:
      - https://docs.docker.com/engine/install/ 

4. Rode o seguinte script na raiz do projeto:
  - npm run start 
    - Caso ocorra algum problema, você pode rodar os scritps separadamente:
      - npm run dockerup - **Criar um container postgre**
      - npm run prisma - **Criar ou restaurar os dados no DB**
      - npm run dev - **Rodar o nodemon**

5. Para testar, utilize o seguinte script:
  - npm run test
    - Obs: O banco de dados é restaurado todas as vezes que o teste roda.


## Caso você tenha algum problema nos passos anteriores, não hesite em entrar em contato.

# Obrigado!
