@AGENTS.md

## Граф знаний (graphify) — обязательно перед работой

В каталоге проекта собран **граф знаний по исходному коду** (AST): узлы по файлам/символам, связи импортов и вызовов, кластеры сообществ.

**Перед любыми задачами по архитектуре, навигации по коду или нетривиальными правками:**

1. Открой и опирайся на **`graphify-out/GRAPH_REPORT.md`** — обзор, «god nodes», сообщества и неочевидные связи.
2. При необходимости деталей — **`graphify-out/graph.json`** или интерактивно **`graphify-out/graph.html`** в браузере.
3. Для точечных вопросов из терминала: `graphify query "…" --graph graphify-out/graph.json` (из каталога `shop/`).

**Обновление графа после изменения кода** (без LLM, только AST): из корня репозитория `graphify update shop`, либо из `shop/`: `graphify update .`

Полный прогон с семантикой по документам/картинкам — команда `/graphify .` в ассистенте с graphify skill (см. документацию graphify).

---

## Быстрый старт для Claude

1. **Рабочая директория:** `shop/` (не корень репозитория `os/`).
2. **После правок:** `cd shop && npm run build && npm run lint`.
3. **Данные:** `shop/data/products.json` + поле `season` у каждого товара; каталог фильтрует по `category`, `brand`, `size`, `season`; подписи фильтров зависят от раздела — см. `lib/catalog-filters.ts` (`getFilterPanelUi`).
4. **Секреты:** не коммитить `.env.local`; для продакшена задать `ADMIN_SESSION_SECRET`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`.
5. **Оформление:** шапка в духе премиального бутика (тёмная полоса контактов) — `components/site-header.tsx`, токены в `app/globals.css`.
6. **Кэш каталога:** для чтения списка товаров использовать `getProductsCached()` из `lib/products-cache.ts`; мутации через API вызывают `revalidateProductCatalog()`. Прямое редактирование `products.json` на диске не инвалидирует кэш до истечения срока или перезапуска — для правок в обход API перезапустите процесс / сделайте деплой.
7. **Cookie:** админка — httpOnly `admin_session` (`lib/auth.ts`, `lib/cookies.ts`); не дублировать секреты в клиентском JS.
8. **PWA:** SW собирается Serwist из `app/sw.ts`; оффлайн-страница `/offline`, оффлайн-заказ — через IDB `lib/pwa/order-outbox.ts` и Background Sync (`atrium-orders`). Инвалидировать клиентский SW-кэш после мутаций — `invalidateApiCacheFromClient()`. См. раздел «PWA / Serwist» в AGENTS.md. Диагностика: `npm run pwa:check`, `npm run pwa:lhci`, `npm run typecheck`.

Подробные соглашения, архитектура и ограничения деплоя — в **AGENTS.md**.
