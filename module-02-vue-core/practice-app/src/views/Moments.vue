<script setup>
import { ref } from "vue";
const posts = ref([
  {
    id: 1,
    name: "张非凡",
    avatar: "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/1.jpg",
    text: "周末爬山九连拍，山顶的风真的很舒服。",
    time: "10 分钟前",
    likes: 26,
    comments: 8,
    images: [
      "https://picsum.photos/seed/moment-11/400/400",
      "https://picsum.photos/seed/moment-12/400/400",
      "https://picsum.photos/seed/moment-13/400/400",
      "https://picsum.photos/seed/moment-14/400/400",
      "https://picsum.photos/seed/moment-15/400/400",
      "https://picsum.photos/seed/moment-16/400/400",
      "https://picsum.photos/seed/moment-17/400/400",
      "https://picsum.photos/seed/moment-18/400/400",
      "https://picsum.photos/seed/moment-19/400/400",
      "https://picsum.photos/seed/moment-110/400/400",
      "https://picsum.photos/seed/moment-111/400/400",
      "https://picsum.photos/seed/moment-112/400/400",
      "https://picsum.photos/seed/moment-113/400/400",
      "https://picsum.photos/seed/moment-114/400/400",
    ],
  },
  {
    id: 2,
    name: "黄盖",
    avatar: "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/2.jpg",
    text: "实训室今天的下午茶，四个人分刚好。",
    time: "1 小时前",
    likes: 41,
    comments: 5,
    images: [
      "https://picsum.photos/seed/moment-21/400/400",
      "https://picsum.photos/seed/moment-22/400/400",
      "https://picsum.photos/seed/moment-23/400/400",
      "https://picsum.photos/seed/moment-24/400/400",
    ],
  },
  {
    id: 3,
    name: "阿斯塔",
    avatar: "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/3.jpg",
    text: "只发一张，晚霞。这张图是横着的，看看单图会怎么显示。",
    time: "3 小时前",
    likes: 63,
    comments: 12,
    images: ["https://picsum.photos/seed/moment-31/720/480"],
  },
  {
    id: 4,
    name: "加缪",
    avatar: "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/5.jpg",
    text: "两图对比：改造前 / 改造后。",
    time: "昨天 21:40",
    likes: 18,
    comments: 3,
    images: [
      "https://picsum.photos/seed/moment-41/400/400",
      "https://picsum.photos/seed/moment-42/400/400",
    ],
  },
  {
    id: 5,
    name: "艾伦",
    avatar: "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/6.jpg",
    text: "三张图走完一整天，早中晚各一张。",
    time: "昨天 18:05",
    likes: 30,
    comments: 6,
    images: [
      "https://picsum.photos/seed/moment-51/400/400",
      "https://picsum.photos/seed/moment-52/400/400",
      "https://picsum.photos/seed/moment-53/400/400",
    ],
  },
]);
function gridClass(count) {
  // 超过 9 张时只显示前 9 张，布局按 9 张（三列）处理
  return "pic-grid pic-grid--" + Math.min(count, 9);
}

function like(index) {
  posts.value[index].likes = posts.value[index].likes + 1;
}
</script>

<template>
  <div class="page">
    <header class="page__head">
      <h2 class="page__title">朋友圈动态</h2>
      <p class="page__desc">
        图片数量决定布局：1 张按原比例显示，2 张和 4 张两列，3 张及以上三列。
      </p>
    </header>

    <ul class="feed">
      <li v-for="(post, index) in posts" :key="post.id" class="feed__item">
        <img class="feed__avatar" :src="post.avatar" :alt="post.name" />

        <div class="feed__body">
          <p class="feed__name">{{ post.name }}</p>
          <p class="feed__text">{{ post.text }}</p>

          <!-- 图片区域：一套结构，靠类名切换布局；超过 9 张只显示前 9 张 -->
          <div :class="gridClass(post.images.length)">
            <template v-for="(img, i) in post.images" :key="i">
              <!-- 第 9 张：外面套一层相对定位容器，右下角盖"+N"遮罩 -->
              <div
                  v-if="i === 8 && post.images.length > 9"
                  class="pic-more"
              >
                <el-image
                    class="pic"
                    :src="img"
                    :preview-src-list="post.images"
                    :initial-index="i"
                    fit="cover"
                />
                <span class="pic-more__mask">
                  +{{ post.images.length - 9 }}
                </span>
              </div>

              <!-- 其余：只渲染前 9 张 -->
              <el-image
                  v-else-if="i < 9"
                  class="pic"
                  :src="img"
                  :preview-src-list="post.images"
                  :initial-index="i"
                  fit="cover"
              />
            </template>
          </div>

          <div class="feed__foot">
            <span class="feed__time">{{ post.time }}</span>
            <button class="feed__action" @click="like(index)">
              赞 {{ post.likes }}
            </button>
            <span class="feed__action">评论 {{ post.comments }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* ===== 页面整体 ===== */
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  background: #f5f6f7;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* ===== 页头 ===== */
.page__head {
  padding: 16px 4px 20px;
}

.page__title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
}

.page__desc {
  margin: 0;
  font-size: 13px;
  color: #8a8a8a;
  line-height: 1.6;
}

/* ===== 动态列表 ===== */
.feed {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #e5e6e7; /* 分割线效果 */
}

.feed__item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fff;
}

/* 头像 */
.feed__avatar {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

/* 主体内容 */
.feed__body {
  flex: 1;
  min-width: 0;
}

.feed__name {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  color: #576b95; /* 微信朋友圈昵称蓝 */
}

.feed__text {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.6;
  color: #1a1a1a;
  word-break: break-word;
}

/* ===== 图片九宫格 ===== */
.pic-grid {
  display: grid;
  gap: 4px;
  margin-bottom: 10px;
}

/* 单图：原比例显示，限制最大尺寸 */
.pic-grid--1 {
  grid-template-columns: minmax(0, min(320px, 100%));
}

.pic-grid--1 .pic {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 4px;
}

/* 2 张和 4 张：两列；宽度跟随屏幕收缩 */
.pic-grid--2,
.pic-grid--4 {
  grid-template-columns: repeat(2, 1fr);
  max-width: min(320px, 100%);
}

/* 3 张及以上（除 4 张）：三列；宽度跟随屏幕收缩 */
.pic-grid--3,
.pic-grid--5,
.pic-grid--6,
.pic-grid--7,
.pic-grid--8,
.pic-grid--9 {
  grid-template-columns: repeat(3, 1fr);
  max-width: min(320px, 100%);
}

.pic-grid .pic {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

/* 长图取中间一段显示（object-fit: cover 默认即居中裁切，这里显式声明）。
   想对比差别：把 el-image 的 fit 换成 "contain"（等价于 object-fit: contain），
   就能看到整张长图被缩进格子的效果 */
.pic :deep(img) {
  object-position: center;
}

/* 第 9 张的"+N"遮罩：相对定位容器 + 绝对定位计数层 */
.pic-more {
  position: relative;
}

.pic-more__mask {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 4px 0 2px 0;
  pointer-events: none; /* 不挡住下面图片的点击预览 */
}

/* ===== 底部（时间 + 操作） ===== */
.feed__foot {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #8a8a8a;
}

.feed__time {
  margin-right: auto;
}

.feed__action {
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.feed__action:hover {
  color: #576b95;
}

button.feed__action {
  border: none;
  background: none;
  padding: 0;
  font-size: 12px;
  color: #8a8a8a;
  font-family: inherit;
}
</style>