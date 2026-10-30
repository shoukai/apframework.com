# 关键判断清单

| 判断 | 类型 | 依据 | 强度与范围 |
|---|---|---|---|
| Build 加速后，计划、评审/测试、部署可能成为新的约束 | source-claim | Anthropic 官方 playbook；来源摘要与 E02 | 来源对自身实践的判断，不是跨组织测量 |
| 六阶段仍保留，但交接更多依赖版本化 artifact | source-claim | 官方 playbook E03、E04 | 是该 playbook 的流程模型，不是唯一标准 |
| artifact 可以同时作为人和 Agent 的交接接口 | analysis-hypothesis | 官方 artifact 链、vateo 的“API”比喻 | 解释性判断；不要求所有组织使用相同文件名或 Git 结构 |
| Skills 是 advisory control，Hooks 和权限承担更确定的边界 | source-claim + analysis-hypothesis | 官方 playbook E08 | 具体安全效果取决于实际配置，不能等同完整安全基线 |
| Maintain 通过确定性监控和分级授权处理生产信号 | source-claim | 官方 playbook E11 | 阈值和权限模型需要结合具体系统验证 |
| 人工关注点可能从逐项陪同转向意图、风险和证据审查 | analysis-hypothesis | E07、E09、E10 | 只有在测试、审计和门禁可靠时才成立 |
| 局部提速不必然转化为全流程吞吐 | analysis-hypothesis | vateo 二次解读 E12、官方瓶颈诊断 E02 | 是分析视角，不是普适测量结论 |
