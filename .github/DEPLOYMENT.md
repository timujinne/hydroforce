# Руководство по деплою

## Настройка GitHub Pages

### Шаг 1: Включите GitHub Pages

1. Перейдите в настройки репозитория: **Settings** → **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. Сохраните настройки

### Шаг 2: Добавьте секреты (опционально)

Если ваше приложение использует API ключи:

1. Перейдите в **Settings** → **Secrets and variables** → **Actions**
2. Нажмите **New repository secret**
3. Добавьте секрет:
   - Name: `GEMINI_API_KEY`
   - Value: ваш API ключ

### Шаг 3: Настройте base path

В `vite.config.ts` обновите значение `base`:

```typescript
const base = mode === 'production' ? '/your-repo-name/' : '/';
```

Замените `your-repo-name` на имя вашего репозитория.

**Для кастомного домена** установите:
```typescript
const base = '/';
```

### Шаг 4: Запустите деплой

Деплой происходит автоматически при:
- Push в ветку `main`
- Ручном запуске workflow

Для ручного запуска:
1. Перейдите в **Actions**
2. Выберите **Deploy to GitHub Pages**
3. Нажмите **Run workflow**

## Проверка деплоя

После успешного деплоя ваше приложение будет доступно по адресу:
```
https://<username>.github.io/<repository>/
```

## Альтернативные платформы деплоя

### Vercel

1. Установите Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Деплой:
   ```bash
   vercel
   ```

3. Production деплой:
   ```bash
   vercel --prod
   ```

### Netlify

1. Установите Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Деплой:
   ```bash
   netlify deploy
   ```

3. Production деплой:
   ```bash
   netlify deploy --prod
   ```

## Настройка кастомного домена

### GitHub Pages

1. Добавьте файл `CNAME` в директорию `public/`:
   ```
   yourdomain.com
   ```

2. Настройте DNS записи у вашего регистратора домена:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  <username>.github.io
   ```

3. В настройках репозитория (**Settings** → **Pages**) добавьте кастомный домен

## Troubleshooting

### Проблема: 404 при переходе по маршрутам

**Решение**: Добавьте файл `404.html` в `public/` с содержимым `index.html`

### Проблема: Ресурсы не загружаются

**Решение**: Проверьте правильность настройки `base` в `vite.config.ts`

### Проблема: API ключи не работают

**Решение**: Убедитесь, что секреты добавлены в настройках репозитория
