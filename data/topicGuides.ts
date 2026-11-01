export const topicGuides: Record<
  string,
  {
    title: string
    description: string
    takeaway: string
    readings: { path: string; reason: string }[]
  }
> = {
  'ai-agent': {
    title: 'AI Agent 架构与治理',
    description: '从单 Agent 到多智能体编排，按职责边界、上下文隔离和质量门禁理解架构选型。',
    takeaway:
      '先定义任务和失败代价，再决定是否拆分 Agent。多智能体适合边界明确、需要不同知识域或独立验收的流程；组件变多也会增加路由、传递和运维成本。',
    readings: [
      {
        path: 'blog/essay/2026-10-25-agent-architecture-evolution',
        reason: '先看五种编排方式的职责边界和选型条件。',
      },
      {
        path: 'blog/essay/2026-10-24-thin-orchestrator-production-agent-orchestration',
        reason: '再用 Meta 的公开案例理解薄编排器和 specialist 的分工。',
      },
      {
        path: 'blog/essay/2026-10-31-production-ai-system-design',
        reason: '最后把容量、安全、恢复和评估放入生产设计。',
      },
    ],
  },
  'context-engineering': {
    title: '上下文与知识工程',
    description: '研究如何选择、组织和回写 Agent 需要的信息，并区分语义、记忆与代码结构。',
    takeaway:
      '上下文不是资料越多越好。稳定规则、任务证据、领域语义和代码关系的生命周期不同，需要分别管理来源、更新与失效。',
    readings: [
      {
        path: 'blog/essay/2025-07-02-context',
        reason: '从上下文工程的基本问题和常见载体入手。',
      },
      {
        path: 'blog/essay/2026-10-28-coding-agent-long-term-memory',
        reason: '理解会话事件、工程决定和来源知识的分层。',
      },
      {
        path: 'blog/essay/2026-10-29-graphify-codebase-knowledge-graph',
        reason: '看代码知识图谱如何作为结构预检索，仍回到源码与测试。',
      },
    ],
  },
  'agent-evaluation': {
    title: 'Agent 评估与生产质量',
    description: '从工具调用到端到端回答，理解评估对象、静默失败和持续反馈。',
    takeaway:
      '可用性监控只能说明系统在响应；可信度还需要任务级样本、轨迹、人工复核与线上反馈。案例中的阈值需要按自己的业务重新设定。',
    readings: [
      {
        path: 'blog/essay/2026-02-19-Validation-Measurement',
        reason: '先看验证与测量的基础维度。',
      },
      {
        path: 'blog/essay/2026-10-27-agentcore-production-evaluation-framework',
        reason: '再看 AWS 公开案例的工具、Agent 和编排三层评估。',
      },
      {
        path: 'blog/essay/2026-10-31-production-ai-system-design',
        reason: '将质量门禁与生产发布、安全和恢复串起来。',
      },
    ],
  },
}
