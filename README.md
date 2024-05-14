# Documentação da Aplicação sdwc-test-front

### Informações do projeto
Esta aplicação foi desenvolvida entre os dias 13 de maio de 2024 e 14 de maio de 2024, ela é destinada ao Teste Técnico proposto pela empresa  [SDWC](https://sdwc.me) (Sanduíche) para a vaga de Desenvolvedor Fullstack Pleno

### Objetivo do sistema
De acordo com o teste técnico: 
> Desenvolver um painel analytics que contabilize acessos de usuários e cliques nos
links de uma página web. A aplicação deve consistir em um frontend para a página
web e uma API em Node.js. A API será responsável por fornecer dados de acesso
diários, e a interface web exibirá um gráfico com o total de acessos por dia e uma
tabela com os links mais acessados nos últimos 7 dias.

Este objetivo foi atingido.

### Tecnologias utilizadas
- A aplicação foi criada usando o framework [NextJs](https://nextjs.org).
- Para a estilização foi utilizado a lib tailwindcss e shadcn.
- Para um único componente foi utilizado a lib nextui.
- Para fazer as requisições HTTP foi utilizada a lib axios.
- Para a geração dos gráficos foi utilizada a lib [react-chartjs-2](https://react-chartjs-2.js.org/).
- Para gerir o estado da aplicação foi utilizada a lib reduxjs/toolkit.
- Como já era esperado, também foi utilizda a lib React.
- Para tratar as datas foi utilizada a lib moment-timezone.
- Para gerar notificações pop-up foi utilizada a lib toastify.
- Como biblioteca de ícones foi escolhida a lucide-react.


### Estrutura do projeto
- O projeto está dividido em 5 páginas principais (todas dentro da src/)
1. `common/` Esta pasta define todos os tipos de funções, classes, hooks, interfaces, serviços e svgs que seriam utilizados em toda a aplicação.
2. `components/` Esta pasta armazena os componentes feitos em `.tsx` que seriam utilizados em toda a aplicação.
3. `lib/` Nesta pasta ficam localizadas todas as configurações necessárias para poder utilizar as libs citadas no tópico anterior.
4. `pages/` Esta pasta foi gerada automaticamente pelo Next e define quais as rotas e quais os arquivo serão carregados nessas rotas.
5. `styles/` Assim como a `pages/` essa página foi gerada automaticamente e guarda arquivos de estilização.

### Informações adicionais
- Para a aplicação funcionar apropriadamente, é necessário estar autenticado, criar links a serem rastreados e clicar no botão "Gerar dados aleatórios". Com isso as informações serão geradas na API e a aplicação passará a exibir os dados.

---

# Servindo a Aplicação sdwc-test-front

Este tópico fornece instruções sobre como servir a aplicação sdwc-test-front.

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte:

- Node.js instalado na sua máquina.
- yarn ou npm instalado na sua máquina.

- Certifique-se de ter uma instância do projeto sdwc-test-api em execução (preferencialmente localmente e na porta 1337)

- Caso a sua instância do sdwc-test-api não esteja acessível pela url `http://localhost:1337`, será necessário alterar o arquivo `/src/common/services/api.service.ts`, modificando a linha 
```
baseURL: "http://localhost:1337",
```
substitua a propriedade `baseURL` informando a sua url de acesso à Api.

### Servindo em modo de desenvolvimento

Para servir a aplicação em modo de desenvolvimento, siga estas etapas:


1. Instale as dependências usando `npm i` ou `yarn`

2. Execute o seguinte comando para iniciar a aplicação em modo de desenvolvimento:

```
yarn dev
```
ou
```
npm run dev
```

Com essas instruções, você deverá ser capaz de servir a aplicação sdwc-test-front em modo de desenvolvimento.
