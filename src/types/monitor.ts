export interface LLMLog {
  timestamp: string;
  generator_type: 'analysis' | 'sql' | 'answer';
  model_name: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  latency_ms: number;
  success: boolean;
  error_message: string;
  retry_count: number;
  prompt_cost: number;
  completion_cost: number;
  total_cost: number;
  detail: {
    input?: Record<string, unknown>;
    output?: Record<string, unknown>;
    method?: string;
  };
}

export interface GeneratorStats {
  calls: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  total_latency_ms: number;
  avg_latency_ms: number;
  errors: number;
  error_rate: number;
  prompt_cost: number;
  completion_cost: number;
  total_cost: number;
}

export interface MonitorSummary {
  total_calls: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_tokens: number;
  avg_latency_ms: number;
  error_rate: number;
  total_prompt_cost: number;
  total_completion_cost: number;
  total_cost: number;
  model_name: string;
  by_generator: Record<string, GeneratorStats>;
}

export interface HourlyStat {
  hour: string;
  calls: number;
  tokens: number;
  cost: number;
  errors: number;
  avg_latency_ms: number;
}
