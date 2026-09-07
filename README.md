# Flearning — 前端工程化 · Git 学习报告

> 本仓库用于系统学习**前端工程化**与 **Git 版本控制**，记录核心概念、常用命令、工具链与学习进度。
> 目标：从"会写页面"进阶到"能驾驭工程化流程"，掌握团队协作的规范与工具。

---

## 目录

- [一、前端工程化](#一前端工程化)
  - [1.1 什么是前端工程化](#11-什么是前端工程化)
  - [1.2 为什么需要工程化](#12-为什么需要工程化)
  - [1.3 工程化的四大支柱](#13-工程化的四大支柱)
  - [1.4 工具链全景](#14-工具链全景)
- [二、Git 版本控制](#二git-版本控制)
  - [2.1 版本控制概述](#21-版本控制概述)
  - [2.2 Git 的工作区模型](#22-git-的工作区模型)
  - [2.3 常用命令速查表](#23-常用命令速查表)
  - [2.4 分支管理](#24-分支管理)
  - [2.5 协作工作流](#25-协作工作流)
  - [2.6 提交信息规范](#26-提交信息规范)
- [三、学习路线](#三学习路线)
- [四、学习资源](#四学习资源)
- [五、学习进度](#五学习进度)

---

## 一、前端工程化

### 1.1 什么是前端工程化

前端工程化是指**用软件工程的方法和工具，系统化地解决前端开发中"效率、质量、协作、维护"问题**的一系列实践。它不是某个具体的工具，而是一整套理念 + 工具链的集合。

> 一句话理解：把前端的"手工作坊"升级成"工业化流水线"。

### 1.2 为什么需要工程化

| 痛点 | 工程化的解决方式 |
|------|-----------------|
| 代码量大、文件多、依赖复杂 | 模块化 + 打包工具（Webpack / Vite） |
| 多人协作、风格不一 | 代码规范 + 格式化（ESLint / Prettier） |
| 重复劳动多、易出错 | 自动化（脚手架 / 构建 / 部署） |
| 上线前质量无保障 | 测试 + 类型检查（Jest / TypeScript） |
| 手动发布易失误 | CI/CD 自动化流水线 |

### 1.3 工程化的四大支柱

1. **模块化**：把代码拆成可复用的独立单元（ES Module / CommonJS），解决命名冲突与依赖混乱。
2. **组件化**：UI 层面按功能拆分组件（React / Vue），提升复用与可维护性。
3. **规范化**：统一代码风格、目录结构、提交信息，让团队协作有章可循。
4. **自动化**：用工具自动完成构建、测试、部署等重复工作，减少人工干预。

### 1.4 工具链全景

| 环节 | 主流工具 |
|------|---------|
| 构建打包 | Webpack、Vite、Rollup、esbuild、Turbopack |
| 包管理 | npm、yarn、pnpm |
| 代码规范 | ESLint、Prettier、Stylelint、commitlint |
| 类型系统 | TypeScript |
| 测试 | Jest、Vitest、Cypress、Playwright |
| 持续集成/部署 | GitHub Actions、GitLab CI、Jenkins |
| 脚手架 | create-vite、create-react-app、Vue CLI |

---

## 二、Git 版本控制

### 2.1 版本控制概述

版本控制（VCS）用于**跟踪文件的每一次修改**，支持回溯历史、多人协作、分支开发。

- **本地版本控制**：如简单的复制粘贴、RCS，只在单机记录版本。
- **集中式（CVCS）**：如 SVN，代码集中在中央服务器，离线受限。
- **分布式（DVCS）**：如 **Git**，每个开发者都有完整仓库副本，可离线工作、灵活分支。

> Git 的核心优势：**分布式 + 快照式存储 + 强大的分支管理**。

### 2.2 Git 的工作区模型

Git 有四个区域，理解它才能理解 Git 命令：

```
工作区(Working Directory)  →  暂存区(Staging Area/Index)  →  本地仓库(Local Repo)  →  远程仓库(Remote Repo)
       git add                     git commit                      git push
       ↑ git restore/checkout      ↑ git restore --staged          ↑ git pull / git fetch
```

| 区域 | 说明 |
|------|------|
| 工作区 | 你正在编辑的文件 |
| 暂存区 | 通过 `git add` 暂存、准备提交的快照 |
| 本地仓库 | 通过 `git commit` 提交的历史版本 |
| 远程仓库 | 托管在 GitHub / GitLab 等平台的共享仓库 |

### 2.3 常用命令速查表

**初始化与配置**

```bash
git init                  # 初始化本地仓库
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

**基本提交流程**

```bash
git status                # 查看工作区状态
git add <file>            # 暂存指定文件
git add .                 # 暂存所有改动
git commit -m "说明"       # 提交到本地仓库
git log --oneline         # 查看提交历史
```

**远程仓库**

```bash
git remote add origin <url>   # 关联远程仓库
git push -u origin main       # 推送到远程并建立跟踪
git pull                      # 拉取并合并远程更新
git clone <url>               # 克隆远程仓库
```

**撤销与回退**

```bash
git restore <file>            # 撤销工作区改动
git restore --staged <file>   # 取消暂存
git reset --soft HEAD~1       # 撤销提交，保留改动
git reset --hard HEAD~1       # 撤销提交，丢弃改动（谨慎）
git revert <commit>           # 生成反向提交（更安全的回退）
```

**分支操作**

```bash
git branch                    # 查看分支
git branch <name>             # 创建分支
git checkout <name>           # 切换分支
git checkout -b <name>        # 创建并切换分支
git merge <name>              # 合并分支到当前分支
git branch -d <name>          # 删除分支
```

### 2.4 分支管理

分支是 Git 最强大的特性之一，让不同功能/任务可以**并行开发、互不干扰**。

**常见分支模型：**

- `main` / `master`：稳定主干，始终可发布。
- `develop`：开发集成分支。
- `feature/xxx`：功能分支，完成后合并回 `develop`。
- `hotfix/xxx`：线上紧急修复分支。

**合并方式：**

| 方式 | 命令 | 特点 |
|------|------|------|
| 快进合并 | `git merge <branch>` | 无分叉时直接移动指针，历史呈线性 |
| 非快进合并 | `git merge --no-ff <branch>` | 保留分支记录，历史更清晰 |
| 变基 | `git rebase <branch>` | 重写提交历史，保持线性整洁 |

### 2.5 协作工作流

**GitHub Flow（推荐入门）：**

```
main 分支 → 新建 feature 分支 → 开发提交 → 推送 → 发起 Pull Request → 代码评审 → 合并回 main → 部署
```

**核心原则：**
1. `main` 分支始终可部署。
2. 每个功能/修复都开独立分支。
3. 通过 Pull Request 合并，进行代码评审。
4. 合并后删除功能分支。

**多人协作常见冲突处理：**

```bash
git pull                      # 先同步最新代码
# 若出现冲突，编辑冲突文件解决标记后：
git add <冲突文件>
git commit -m "fix: 解决合并冲突"
git push
```

### 2.6 提交信息规范

采用 **Conventional Commits（约定式提交）**，让提交历史清晰可读：

```
<type>(<scope>): <subject>

类型    说明
feat    新功能
fix     修复 bug
docs    文档改动
style   格式调整（不影响逻辑）
refactor 重构（非新功能、非修复）
test    测试相关
chore   构建/工具/杂项
```

**示例：**

```bash
git commit -m "feat(login): 新增登录功能"
git commit -m "fix(cart): 修复购物车金额计算错误"
```

---

## 三、学习路线

1. [ ] 掌握 Git 基础命令与工作区模型
2. [ ] 理解分支模型与合并/变基
3. [ ] 熟悉 GitHub Flow 与 Pull Request 协作流程
4. [ ] 学会 `.gitignore` 与提交信息规范
5. [ ] 掌握 npm / pnpm 包管理
6. [ ] 学会 Vite / Webpack 构建工具
7. [ ] 接入 ESLint + Prettier 代码规范
8. [ ] 使用 TypeScript 做类型约束
9. [ ] 了解 Jest / Vitest 单元测试
10. [ ] 搭建 GitHub Actions CI/CD 流水线

## 四、学习资源

**官方文档**

- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git（中文版）](https://git-scm.com/book/zh/v2)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [Webpack 官方文档](https://webpack.js.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

**交互式学习**

- [Learn Git Branching](https://learngitbranching.js.org/)（可视化分支练习，强烈推荐）
- [GitHub Skills](https://skills.github.com/)（GitHub 官方交互教程）

**参考手册**

- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)
- [gitignore 模板](https://github.com/github/gitignore)

## 五、学习进度

> 持续更新中。每次学完一个知识点，在此勾选并记录。

- [ ] 已初始化本地仓库并完成首次提交
- [ ] 已关联远程仓库并完成推送
- [ ] 已完成一次分支创建与合并
- [ ] 已解决过一次合并冲突
- [ ] 已配置 `.gitignore`

---

*本报告随学习进度持续更新，欢迎补充与修正。*
