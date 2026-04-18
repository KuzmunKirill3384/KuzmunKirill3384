/**
 * Упрощённые типы для демо-ответов, по духу близкие к API СДЭК (расчёт, ПВЗ).
 * Реальная интеграция потребует OAuth и боевых endpoint.
 */

export type CdekCity = {
  code: number;
  name: string;
  region: string;
};

export type CdekCalcRequest = {
  cityCode: number;
  /** Сумма товаров в копейках для условной формулы */
  goodsSumKop: number;
};

export type CdekCalcResponse = {
  tariffCode: string;
  priceRub: number;
  daysMin: number;
  daysMax: number;
  currency: "RUB";
};

export type CdekPvz = {
  code: string;
  name: string;
  address: string;
  workTime: string;
};
