<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 每个学生的 AI 生成头像（import 后由 Vite 处理成可访问的 URL）
import avatarLinyiming from "../assets/avatars/linyiming.png";
import avatarXujiang from "../assets/avatars/xujiang.png";
import avatarGaoqiang from "../assets/avatars/gaoqiang.png";
import avatarWusong from "../assets/avatars/wusong.png";
import avatarLikui from "../assets/avatars/likui.png";
import avatarFreud from "../assets/avatars/freud.png";
import avatarZhangxueliang from "../assets/avatars/zhangxueliang.png";

const students = [
{
id: "20230101",
name: "林一鸣",
className: "软件 2301",
direction: "前端开发",
score: 92,
status: "active",
avatar: avatarLinyiming
},
{
id: "20230102",
name: "徐江",
className: "软件 2301",
direction: "前端开发",
score: 90,
status: "active",
avatar: avatarXujiang
},
{
id: "20230103",
name: "高启强",
className: "软件 2301",
direction: "前端开发",
score: 77,
status: "active",
avatar: avatarGaoqiang
},
  {
id: "20230104",
name: "武松",
className: "软件 2301",
direction: "前端开发",
score: 43,
status: "leave",
avatar: avatarWusong
},
  {
id: "20230105",
name: "李逵",
className: "软件 2301",
direction: "前端开发",
score: 66,
status: "active",
avatar: avatarLikui
},
  {
id: "20230106",
name: "弗洛伊德",
className: "软件 2301",
direction: "前端开发",
score: 55,
status: "intern",
avatar: avatarFreud
},
  {
id: "20230107",
name: "张学良",
className: "软件 2301",
direction: "前端开发",
score: 88,
status: "active",
avatar: avatarZhangxueliang
}
]
const viewMode = ref("table");
const STATUS_MAP = {
  active: { text: "在读", type: "success" },
  intern: { text: "实习中", type: "warning" },
  leave: { text: "休学", type: "info" },
}
function scoreColor(score) {
  if (score >= 85) return "#0f9d58";
  if (score >= 70) return "#e6a23c";
  return "#f56c6c";
}
function showDetail(student) {
  ElMessage.success(
      `${student.name}（${student.id}）：${student.direction}，成绩 ${student.score}`,
  );
}
</script>

<template>
  <div class="page">
    <header class="page__head">
      <div>
        <h2 class="page__title">学生名单</h2>
        <p class="page__desc">
          共 {{ students.length }} 人 · 切换视图用的是 v-if / v-else-if / v-else
        </p>
      </div>

      <!-- 视图切换：viewMode 一变，模板自动在几个分支之间换 -->
      <el-radio-group v-model="viewMode">
        <el-radio-button value="table">表格</el-radio-button>
        <el-radio-button value="card">卡片</el-radio-button>
        <el-radio-button value="list">名单</el-radio-button>
      </el-radio-group>
    </header>

    <!-- ===== 条件渲染：下面三块同一时间只会出现一块 ===== -->

    <!-- 第一块：表格模式 -->
    <el-table v-if="viewMode === 'table'" :data="students" stripe border>
      <el-table-column prop="id" label="学号" width="120" />
      <el-table-column prop="name" label="姓名" width="110" />
      <el-table-column prop="className" label="班级" width="120" />
      <el-table-column prop="direction" label="方向" />
      <el-table-column prop="score" label="成绩" width="100" sortable>
        <template #default="scope">
          <span class="score" :style="{ color: scoreColor(scope.row.score) }">{{
              scope.row.score
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110">
        <template #default="scope">
          <el-tag :type="STATUS_MAP[scope.row.status].type" effect="light">
            {{ STATUS_MAP[scope.row.status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template #default="scope">
          <el-button link type="primary" @click="showDetail(scope.row)"
          >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 第二块：卡片模式 -->
    <el-row v-else-if="viewMode === 'card'" :gutter="16">
      <el-col
          v-for="item in students"
          :key="item.id"
          :xs="24"
          :sm="12"
          :md="8"
          class="card-col"
      >
        <el-card shadow="hover" class="stu-card">
          <div class="stu-card__top">
            <el-avatar :size="48" :src="item.avatar" class="avatar" />
            <div>
              <p class="stu-card__name">{{ item.name }}</p>
              <p class="stu-card__id">{{ item.id }} · {{ item.className }}</p>
            </div>
          </div>

          <div class="stu-card__tags">
            <el-tag size="small" effect="plain">{{ item.direction }}</el-tag>
            <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
              {{ STATUS_MAP[item.status].text }}
            </el-tag>
          </div>

          <p class="stu-card__score">成绩 {{ item.score }}</p>
          <el-progress
              :percentage="item.score"
              :color="scoreColor(item.score)"
              :stroke-width="8"
              :show-text="false"
          />

          <template #footer>
            <el-button link type="primary" @click="showDetail(item)"
            >查看详情</el-button
            >
          </template>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第三块：名单模式，一行一人，人多了用这个（v-else 兜底，不写条件） -->
    <ul v-else class="name-list">
      <li v-for="item in students" :key="item.id" class="name-list__item">
        <el-avatar :size="32" :src="item.avatar" class="avatar" />
        <span class="name-list__name">{{ item.name }}</span>
        <span class="name-list__meta"
        >{{ item.id }} · {{ item.className }} · {{ item.direction }}</span
        >
        <span class="score" :style="{ color: scoreColor(item.score) }">{{
            item.score
          }}</span>
        <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
          {{ STATUS_MAP[item.status].text }}
        </el-tag>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* ===== 页面整体 ===== */
.page {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100%;
  border-radius: 8px;
}

/* 头部：标题在左，视图切换在右 */
.page__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.page__title {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.page__desc {
  margin: 0;
  font-size: 13px;
  color: #909399;
}

/* ===== 成绩数字（表格 + 名单共用，颜色由行内 style 控制）===== */
.score {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* ===== 卡片模式 ===== */
.card-col {
  margin-bottom: 16px;
}

.stu-card {
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.stu-card:hover {
  transform: translateY(-2px);
}

/* 卡片头部：头像 + 姓名信息 */
.stu-card__top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  /* 图片加载失败时的兜底底色 */
  background: #dcdfe6;
  flex-shrink: 0;
}

.stu-card__name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.stu-card__id {
  margin: 2px 0 0;
  font-size: 12px;
  color: #909399;
}

/* 标签行：方向 + 状态 */
.stu-card__tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.stu-card__score {
  margin: 0 0 8px;
  font-size: 13px;
  color: #606266;
}

/* ===== 名单模式（v-else 的 ul）===== */
.name-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

/* 相邻行之间加分隔线（第一个不加） */
.name-list__item + .name-list__item {
  border-top: 1px solid #ebeef5;
}

.name-list__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  transition: background 0.15s ease;
}

.name-list__item:hover {
  background: #f5f7fa;
}

.name-list__name {
  font-weight: 600;
  color: #303133;
  min-width: 72px;
}

/* 中间的学号/班级/方向信息，占满剩余空间并靠左 */
.name-list__meta {
  flex: 1;
  font-size: 13px;
  color: #909399;
  /* 窄屏时允许省略，避免挤压右边的成绩和状态 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Element Plus 组件内部样式需要 :deep() 穿透 ===== */

/* 表格：表头底色 + 行悬停 */
.page :deep(.el-table th.el-table__cell) {
  background: #f5f7fa;
  color: #606266;
  font-weight: 600;
}

/* 卡片底部（#footer 插槽）按钮右对齐 */
.stu-card :deep(.el-card__footer) {
  text-align: right;
  padding-top: 8px;
}
</style>