<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This project is built using the [Nest](https://github.com/nestjs/nest) framework, a progressive Node.js framework for building efficient and scalable server-side applications. The backend is implemented with NestJS and integrates MongoDB as the database. **Key features include:**

- **User Authentication**: API endpoints for user sign-up and sign-in.
- **Security Best Practices**: Implementation of JWT for authentication, Helmet for securing HTTP headers, rate limiting to prevent abuse, and CORS configuration.
- **TypeScript**: The entire project is written in TypeScript for better type safety and developer experience.
- **Logging**: Integrated logging for better traceability and debugging.
- **Modular Architecture**: Organized folder structure for scalability and maintainability.

This setup ensures a robust and secure backend for any application requiring user authentication and data management.

## Folder structure

```
src
├── app
│   ├── user
│   │   ├── dtos
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.schema.ts
│   │   ├── user.service.ts
├── common
│   ├── config
│   │   ├── config.module.ts
│   │   ├── config.service.ts
│   │   ├── password-policy.config.ts
│   ├── connectors
│   │   ├── mongoose-connection.service.ts
│   ├── filters
│   │   ├── all-exceptions.filter.ts
│   ├── interceptors
│   │   ├── logging.interceptor.ts
│   ├── utils
│   │   ├── default.utils.ts
│   │   ├── index.ts
│   │   ├── password.utils.ts
├── core
├── main.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── .env
├── .env.example
```

## Endpoints

### Login

`POST http://localhost:3001/user/login`

**Body:**

```json
{
  "email": "ahmad.raza6@test.com",
  "password": "P@ssw0rd!1"
}
```

### Register

`POST http://localhost:3001/user/register`

**Body:**

```json
{
  "email": "ahmad.raza6@test.com",
  "name": "Ahmad Raza",
  "password": "P@ssw0rd!1"
}
```



## Project setup

```bash
$ npm install
```

## Compile and run the project
Before running the project, copy the `.env.example` file into a `.env` file and change configurations accordingly.

```bash
$ cp .env.example .env
```


Details for each env to change according to requirements:

- `ENV_JWT_SECRET_KEY`: Secret key used for signing JWT tokens.
- `ENV_JWT_EXPIRY_IN_MINUTES`: Expiry time for JWT tokens in minutes.
- `ENV_APPLICATION_PORT`: Port on which the application will run.
- `ENV_DB_HOST`: Hostname of the database server.
- `ENV_DB_PORT`: Port number of the database server.
- `ENV_DB_NAME`: Name of the database.
- `ENV_DB_USER`: Username for the database (leave empty if not required).
- `ENV_DB_PASSWORD`: Password for the database (leave empty if not required).
- `ENV_CORS_ENABLED`: Enable or disable CORS.
- `ENV_CORS_ALLOWED_ORIGINS`: Allowed origins for CORS.
- `ENV_THROTTLE_TTL`: Time to live for throttling in minutes.
- `ENV_THROTTLE_LIMIT`: Maximum number of requests allowed in the TTL period.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ahmad Raza](https://www.linkedin.com/in/ahmadraza2012/)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

