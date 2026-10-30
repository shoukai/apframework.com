# Evidence Ledger

| ID 与拟用表述 | 判断归属 | 说话者与确认 | 来源定位 | 支持关系 | 状态 | 边界 |
|---|---|---|---|---|---|---|
| E01：文章把传统线性 SDLC 改写为嵌入 AI、自动交接和人工判断门的循环。 | source-claim | Louis Claxton / 官方 playbook | `https://claude.com/resources/articles/the-ai-native-sdlc-playbook`; raw `#L42-L68` | 直接支持 | 已核实来源文本 | 是 Anthropic playbook 的过程定义，不代表行业共识。 |
| E02：Build 加速后，瓶颈转向 Plan、Review/Test、Deploy，治理例外成本上升。 | source-claim | Louis Claxton | raw `#L28-L40` | 直接支持 | 已核实来源文本 | 文章没有提供跨组织的统一实证比例。 |
| E03：六阶段为 Plan、Design、Build、Test、Deploy、Maintain。 | source-claim | Louis Claxton | raw `#L51-L68`, `#L70-L91` | 直接支持 | 已核实来源文本 | 六阶段可以模块化、渐进采用。 |
| E04：artifact 链为 `intent.md → spec.md → plan.md → code/tests → PR/review → incident → intent.md`。 | source-claim | Louis Claxton | raw `#L64-L68`, `#L85-L87`, `#L899-L932` | 直接支持 | 已核实来源文本 | 文件命名和 Git 作为载体是来源建议，不是唯一实现。 |
| E05：`intent.md` 把发起人的问题、结果、影响对象、约束和开放问题保存为可版本化输入。 | source-claim | Louis Claxton | raw `#L100-L169` | 直接支持 | 已核实来源文本 | 仍需要产品负责人校正和接受。 |
| E06：Design 阶段把需求和设计压缩到一次会话，Skills 在写入时施加规则并标出冲突。 | source-claim | Louis Claxton | raw `#L178-L227` | 直接支持 | 已核实来源文本 | 不能据此断言设计师角色消失。 |
| E07：Build 先产出 `plan.md`，工程师在代码生成前审查文件、顺序、风险和验证方式。 | source-claim | Louis Claxton | raw `#L236-L299` | 直接支持 | 已核实来源文本 | 来源描述的是 Claude Code plan mode 实践。 |
| E08：CLAUDE.md、Skills、Hooks 分别承担共享上下文、制度知识和确定性阻断。 | source-claim | Louis Claxton | raw `#L324-L458` | 直接支持 | 已核实来源文本 | Skill 是 advisory control；硬安全边界还需要 Hooks、权限和审查。 |
| E09：Test 阶段要求 Agent 自己运行测试、构建或截图，并将配置变化纳入连续 eval。 | source-claim | Louis Claxton | raw `#L526-L662` | 直接支持 | 已核实来源文本 | 20–50 个历史任务是建议起点，不是通用标准。 |
| E10：Deploy 阶段让 Agent 走到生产门前，生产授权仍由指定人完成。 | source-claim | Louis Claxton | raw `#L671-L735`, `#L736-L797`, `#L836-L898` | 直接支持 | 已核实来源文本 | 实际门禁依赖分支保护、凭证、Hook 和环境设计。 |
| E11：Maintain 阶段由确定性脚本监测控制带，按等级允许记录、只读诊断或开 PR/触发预批准 runbook。 | source-claim | Louis Claxton | raw `#L899-L967` | 直接支持 | 已核实来源文本 | 分级阈值和统计规则必须结合自身系统验证。 |
| E12：二次解读把问题概括为“每一步更快，但全流程不一定更快”，强调从局部优化走向全流程自治。 | source-claim | vateo / 二次解读 | raw `#L35-L54` | 间接支持/分析视角 | 已核实来源文本 | 属于评论者解读，不是独立验证，也不是本文作者立场。 |
| E13：二次解读强调文档从备忘录变成人和 Agent 之间的 API。 | source-claim | vateo；与官方 artifact 链相互印证 | raw `#L62-L89`；官方 raw `#L64-L68` | 间接支持 | 已核实来源文本 | “API”是解释性比喻。 |
| E14：本文分析假设：AI-native SDLC 的核心变化不只是“用 AI 写代码”，而是把阶段交接改造成可触发、可审计的 artifact loop。 | analysis-hypothesis | 本文分析 | 基于 E01、E04、E08、E10、E11 | 由多条证据推导 | 待读者检验 | 这是本文分析框架，不归因给用户或官方作者。 |
| E15：本文分析假设：人工关注点从逐行观察 Agent 行为，转向在 artifact gate 上审查意图、风险和证据。 | analysis-hypothesis | 本文分析 | 基于 E04、E07、E09、E10 | 间接支持 | 待读者检验 | 适用于具备足够测试、审计和门禁条件的团队。 |
