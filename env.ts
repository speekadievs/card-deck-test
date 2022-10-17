/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

let rules: { [key: string]: any } = {
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),

  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),

  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
}

if (process.env.DB_CONNECTION === 'pg') {
  rules.PG_HOST = Env.schema.string({ format: 'host' })
  rules.PG_PORT = Env.schema.number()
  rules.PG_USER = Env.schema.string()
  rules.PG_PASSWORD = Env.schema.string.optional()
  rules.PG_DB_NAME = Env.schema.string()
}

export default Env.rules(rules)
