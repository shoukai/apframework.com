# 图示规格

## D1：AI-native SDLC artifact 驱动的交付闭环

- 章节：第二节“六个阶段：流程名称不变，交接接口改变”
- 解释目标：帮助读者同时理解六个阶段、阶段之间的 artifact 交接、Maintain 到 Plan 的反馈闭环，以及共享上下文、Skills、Hooks 和人工判断门组成的控制层。
- 读者看图后应理解：AI-native SDLC 不是只在 Build 阶段生成代码；每个阶段都留下可版本化产物，生产信号可以重新进入 Plan，而生产授权和高风险判断仍保留在人类控制之下。
- 证据：E04、E05、E06、E08、E10；六阶段和 artifact 链依据 Anthropic 官方 playbook，控制层和反馈关系是对来源机制的概念化表达。
- 边界：图示不表示所有团队必须使用这些文件名，也不表示所有阶段都能完全自动化；不把图中的箭头解释为某个产品的固定实现或通用安全基线。
- 源文件：`assets/ai-native-sdlc-artifact-loop.svg`
- 成稿图片：`assets/ai-native-sdlc-artifact-loop.png`
- 正文嵌入：`![AI-native SDLC artifact 驱动的交付闭环](assets/ai-native-sdlc-artifact-loop.png)`
- 图说：AI-native SDLC 的六阶段 artifact loop。Maintain 阶段的生产信号可以重新生成 `intent.md`，进入下一轮 Plan。
- 渲染检查：已使用本地 SVG→PNG 渲染器生成 PNG，并通过图像检查确认六阶段、主流程箭头、反馈箭头、控制层和来源说明均可见；文章正文嵌入后的 Markdown 预览需在本轮复核中确认。
