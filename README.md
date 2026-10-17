# postgresql express node js
## បង្កើត folder 
```bash
mkdir name-of-project
cd name-of-project
```
## តំឡើង node
```bash
npm init -y
```
## តំឡើង express និង node mode
```bash
npm install express
```
```bash
npm install node nodemon
```
### ប្រសិនជាចង់ដំឡើង ts (optional)
```bash
npm install -D typescript ts-node @types/node nodemon
npm install -D @types/express
```
បង្កើតឯកសារ tsconfig.json៖
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```


## ដំឡើង Prisma
```bash
npm install prisma --save-dev
```
or
```bash
npm install prisma@6 --save-dev
```
## prisma client 
វាជា Library ដែល Express.js ប្រើតាមរយៈ JavaScript ដើម្បីទាក់ទង Database។
```bash
npm install @prisma/client
```
or
```bash
npm install @prisma/client@6
```
## ចាប់ផ្ដើម Prisma
ប្រសិនជាប្រើ PostgreSQL៖
```bash
npx prisma init
```
ប្រសិនជាវាអត់បង្កើត folder prisma ដូច្នេះយើងសរសេរបែបនេះវិញ
```bash
npx prisma@6 init --datasource-provider postgresql
```
ប្រសិនជាចេញ faild ទៀតគឺ
```bash
rm prisma.config.ts
```
```bash
npx prisma@6 init --datasource-provider postgresql
```

### នៅក្នុង prisma/schema.prisma 
យើងអាចលុប output ចោលបាន នៃ generator យកតែបែបនេះ
```bash
generator client {
  provider = "prisma-client"
}
```
បន្ទាបមក
```bash
npx prisma generate
```
នេះវាគឺសម្រាប់តែ prisma client តែប៉ុន្នោះ។ ប្រសិនជាចង់ប្តូរនៅ db យើងត្រូវ។
```bash
npx prisma migrate dev --name add-todo
```

## មើល db online
```bash
npx prisma studio
```