import { KEY_PROVIDERS, type KeyProvider } from "@/types/api";

export const DEFAULT_SERVER_PROVIDER: KeyProvider = "openrouter";
export const DEFAULT_PRIMARY_MODEL = "openrouter/free";
/** rules.md §4.2, tried in order after the primary model. */
export const DEFAULT_FREE_MODELS: readonly string[] = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "google/gemma-4-31b-it:free",
];
const DEFAULT_BUDGET_MS = 120_000;
const DEFAULT_CUSTOM_BUDGET_MS = 240_000;
const MAX_CUSTOM_BUDGET_MS = 240_000;
const DEFAULT_DAILY_LIMIT = 10;
const DEFAULT_HOURLY_REQUEST_LIMIT = 20;

export interface AnalyzeConfig {
  serverApiKey: string | null;
  serverProvider: KeyProvider;
  serverBaseUrl: string | null;
  primaryModel: string;
  fallbackModels: string[];
  budgetMs: number;
  customBudgetMs: number;
  dailyLimit: number;
  /** Requests per network per clock hour, with any key (rules.md §4.3.6). */
  hourlyRequestLimit: number;
  quotaSecret: string | null;
  upstash: { url: string; token: string } | null;
  /** ADR-009: custom endpoints may use plain HTTP and private or loopback hosts. Off unless set to true. */
  allowPrivateEndpoints: boolean;
  /** Only enable when ingress overwrites forwarded client headers. */
  trustedProxyHeaders: boolean;
  production: boolean;
}

type Env = Readonly<Record<string, string | undefined>>;

function text(env: Env, name: string): string | null {
  const value = env[name]?.trim();
  return value ? value : null;
}

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function provider(value: string | null): KeyProvider {
  return value !== null && (KEY_PROVIDERS as readonly string[]).includes(value) ? (value as KeyProvider) : DEFAULT_SERVER_PROVIDER;
}

/** Server environment, read per request. The Vercel Marketplace names are accepted for Upstash. */
export function readConfig(env: Env = process.env): AnalyzeConfig {
  const url = text(env, "UPSTASH_REDIS_REST_URL") ?? text(env, "KV_REST_API_URL");
  const token = text(env, "UPSTASH_REDIS_REST_TOKEN") ?? text(env, "KV_REST_API_TOKEN");
  const serverProvider = provider(text(env, "SERVER_PROVIDER"));
  const fallbackModels = (text(env, "SERVER_FALLBACK_MODELS") ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);
  return {
    serverApiKey: text(env, "SERVER_API_KEY"),
    serverProvider,
    serverBaseUrl: text(env, "SERVER_BASE_URL"),
    primaryModel: text(env, "SERVER_MODEL") ?? (serverProvider === "openrouter" ? DEFAULT_PRIMARY_MODEL : ""),
    fallbackModels: fallbackModels.length > 0 ? fallbackModels : serverProvider === "openrouter" ? [...DEFAULT_FREE_MODELS] : [],
    customBudgetMs: Math.min(positiveInteger(env.CUSTOM_PROVIDER_TIMEOUT_MS, DEFAULT_CUSTOM_BUDGET_MS), MAX_CUSTOM_BUDGET_MS),
    budgetMs: positiveInteger(env.SERVER_TIMEOUT_MS, DEFAULT_BUDGET_MS),
    dailyLimit: positiveInteger(env.DAILY_ANALYSIS_LIMIT, DEFAULT_DAILY_LIMIT),
    hourlyRequestLimit: positiveInteger(env.HOURLY_REQUEST_LIMIT, DEFAULT_HOURLY_REQUEST_LIMIT),
    quotaSecret: text(env, "QUOTA_HASH_SECRET"),
    upstash: url && token ? { url: url.replace(/\/+$/, ""), token } : null,
    allowPrivateEndpoints: /^(true|1)$/i.test(env.ALLOW_PRIVATE_ENDPOINTS?.trim() ?? ""),
    trustedProxyHeaders: /^(true|1)$/i.test(env.TRUSTED_PROXY_HEADERS?.trim() ?? ""),
    production: env.NODE_ENV === "production",
  };
}
