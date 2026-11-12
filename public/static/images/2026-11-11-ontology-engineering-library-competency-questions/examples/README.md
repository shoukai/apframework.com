# 图书馆本体示例

- `library.ttl`：教学用 RDF 图，含 TBox、ABox 和题设数据。
- `queries.rq`：五条 SPARQL 查询；每段包含一个查询，按顺序单独执行。
- `library-shapes.ttl`：Holding 与 BorrowRecord 的 SHACL Core 形状。

## 复现

在已有 RDFLib 的环境中，从文章目录运行：

```bash
python3 artifacts/verify-examples.py
```

脚本实际读取 Turtle 和五条查询，断言五个结果及关键负例；若已有 pySHACL，会再执行正负形状校验，否则明确报告 SHACL 未运行。本文实际执行环境是 Python 3.13.12、RDFLib 7.6.0，无 pySHACL。为避免环境漂移，本次没有安装新依赖。

基础命名空间为 `https://example.org/library#`，这是示例 IRI，不是线上服务。数据中的借阅记录特意保留显式 `loanStatus`；演示数据只代表题设时间点。OWL/RDFS 声明中的 domain/range 允许推导类型，不负责拒绝不合规输入。执行 SHACL 应使用支持 SHACL Core 的处理器；五条查询需在包含 `library.ttl` 的 RDF 数据集上分别执行。
