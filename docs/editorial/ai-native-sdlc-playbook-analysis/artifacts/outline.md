# Article Outline

## 1. 开头：代码提速之后，流程发生了什么

- 解释目标：引出文章对象和问题，不制造趋势结论。
- 关键问题：为什么单独提高编码速度不一定提高交付速度？
- 证据：E02、E12。
- 推进关系：从问题进入 playbook 的定义。

## 2. AI-native SDLC 的定义：阶段没有消失，交接方式改变

- 解释目标：区分“AI 辅助开发”和“AI-native SDLC”。
- 内容：六阶段仍保留；AI 嵌入每一阶段；artifact 触发下一阶段。
- 证据：E01、E03、E04。
- 推进关系：建立全文主框架。

## 3. Artifact 链：文档成为阶段之间的接口

- 解释目标：说明 `intent.md → spec.md → plan.md → code/tests → PR/review → incident` 各自承担什么作用。
- 证据：E04、E05、E06、E07、E13。
- 讨论：文档不是会议纪要，而是人和 Agent 都能读写的工作接口；Git 提供审计线索。
- 形式：表格；不制作独立图片。

## 4. 六个阶段的工作机制

### 4.1 Plan / Design：从原始意图到可执行规格

- 内容：intent.md、spec.md、规则在写入时进入流程。
- 证据：E05、E06。

### 4.2 Build / Test：从观察 Agent 操作到审查计划和证据

- 内容：plan mode、CLAUDE.md、Skills、Hooks、反馈循环、连续 eval。
- 证据：E07、E08、E09。

### 4.3 Deploy / Maintain：自治走到门前，事故重新进入流程

- 内容：PR review、生产审批、确定性监控、分级授权、intent.md 回流。
- 证据：E10、E11。

## 5. 控制层：为什么 Skills 不等于安全边界

- 解释目标：拆解 advisory 与 deterministic control 的差异。
- 内容：CLAUDE.md / Skills / Hooks / branch protection / human gate 的职责。
- 证据：E08、E10。
- 结论形式：有限分析，不宣称普遍架构。

## 6. 这套模型改变了什么，又没有改变什么

- 解释目标：理解其意义和边界。
- 内容：改变阶段接口、反馈速度和人工关注位置；没有取消需求判断、风险承担、生产授权和回滚责任。
- 证据：E01、E04、E10、E11；A1–A3。
- 边界：渐进采用、基础设施和组织责任。

## 7. 结尾：把它当作流程模型而不是产品清单

- 回答开头问题：核心可复用对象是 artifact loop 和分层控制。
- 交代适用条件：有版本控制、可执行验证、稳定监控和明确审批边界时，才适合逐步采用。
- 不进行作者立场式趋势预测。
