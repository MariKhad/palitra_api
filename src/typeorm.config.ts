import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1111',
  database: 'palitra',
  entities: ['*/**/*.entity{.js, .ts}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source был инициализирован!');
  })
  .catch((err) => {
    console.error('Ошибка в процессе Data Source инициализации', err);
  });

export default AppDataSource;
